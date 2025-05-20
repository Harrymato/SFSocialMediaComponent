import { LightningElement, api, track, wire } from 'lwc';
import { getRecord, updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class SocialMediaBadges extends LightningElement {
    @api recordId;
    @api objectApiName;
    @api facebookField;
    @api twitterField;
    @api linkedinField;
    @api instagramField;
    @api githubField;
    @api redditField;
    @track platforms = [];
    @track fieldsList = [];
    @track isSaving = false;

    linkOptions = [
        { label: 'New Tab (_blank)', value: '_blank' },
        { label: 'Same Tab (_self)', value: '_self' }
    ];
    @track linkBehaviour = '_blank';

    isUrlModalOpen = false;
    isSettingsModalOpen = false;
    modalPlatform;
    modalUrl;

    connectedCallback() {
        this.loadLinkBehaviour();
        this.initPlatforms();
        this.fieldsList = this.platforms.map(p => `${this.objectApiName}.${p.field}`);
    }

    initPlatforms() {
        this.platforms = [
            { name: 'Facebook', field: this.facebookField, url: '', isFacebook: true, cssClass: 'badge facebook inactive' },
            { name: 'X', field: this.twitterField, url: '', isX: true, cssClass: 'badge x inactive' },
            { name: 'LinkedIn', field: this.linkedinField, url: '', isLinkedIn: true, cssClass: 'badge linkedin inactive' },
            { name: 'Instagram', field: this.instagramField, url: '', isInstagram: true, cssClass: 'badge instagram inactive' },
            { name: 'GitHub', field: this.githubField, url: '', isGitHub: true, cssClass: 'badge github inactive' },
            { name: 'Reddit', field: this.redditField, url: '', isReddit: true, cssClass: 'badge reddit inactive' }
        ].filter(p => p.field);
    }

    @wire(getRecord, { recordId: '$recordId', fields: '$fieldsList' })
    wiredRecord({ error, data }) {
        if (data) {
            this.platforms = this.platforms.map(p => {
                const url = data.fields[p.field]?.value || '';
                const state = url ? 'active' : 'inactive';
                return { ...p, url, hasUrl: !!url, cssClass: `badge ${p.name.toLowerCase()} ${state}` };
            });
        } else if (error) {
            this.dispatchEvent(new ShowToastEvent({ title: 'Error loading URLs', message: error.body?.message, variant: 'error' }));
        }
    }

    handleBadgeClick(event) {
        const rawUrl = event.currentTarget.dataset.url;
        const name = event.currentTarget.dataset.name;
        if (!rawUrl) {
            this.modalPlatform = name;
            this.modalUrl = '';
            this.isUrlModalOpen = true;
            return;
        }
        const prefixes = {
            LinkedIn: 'https://www.linkedin.com/in/',
            Facebook: 'https://www.facebook.com/',
            X: 'https://twitter.com/',
            Instagram: 'https://www.instagram.com/',
            GitHub: 'https://github.com/',
            Reddit: 'https://www.reddit.com/user/'
        };
        const fullUrl = /^https?:\/\//.test(rawUrl) ? rawUrl : (prefixes[name] ? prefixes[name] + rawUrl : rawUrl);
        window.open(fullUrl, this.linkBehaviour);
    }

    handleEditClick(event) {
        event.stopPropagation();
        const name = event.currentTarget.dataset.name;
        const platform = this.platforms.find(p => p.name === name);
        this.modalPlatform = name;
        this.modalUrl = platform.url;
        this.isUrlModalOpen = true;
    }

    handleUrlChange(event) {
        this.isSaving = true;
        this.modalUrl = event.target.value;
        const platform = this.platforms.find(p => p.name === this.modalPlatform);
        const recordInput = { fields: { Id: this.recordId, [platform.field]: this.modalUrl } };
        updateRecord(recordInput)
            .then(() => { 
                this.isUrlModalOpen = false; 
                this.showToast('Success', `${this.modalPlatform} URL updated`); 
                this.isSaving = false;
            })
            .catch(error => {
                this.isSaving = false;         
                this.showToast(
                  'Error updating URL',
                  error.body?.message || 'Unknown error'
                );
              });
    }

    openSettingsModal() { this.isSettingsModalOpen = true; }
    closeSettingsModal() { this.isSettingsModalOpen = false; }
    closeModal() { this.isUrlModalOpen = false; }

    loadLinkBehaviour() { this.linkBehaviour = localStorage.getItem('sms_link_behaviour') || '_blank'; }
    handleLinkBehaviourChange(event) { this.linkBehaviour = event.detail.value; localStorage.setItem('sms_link_behaviour', this.linkBehaviour); }

    showToast(title, message) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant: message.startsWith('Error') ? 'error' : 'success' }));
    }
}