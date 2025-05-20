# SFSocialMediaComponent

**SFSocialMediaComponent** is a customizable Lightning Web Component (LWC) for Salesforce that allows you to display a set of social media icons linking to your organization's profiles. It's ideal for Experience Cloud sites or internal Lightning pages where branding and connectivity to your online presence are essential.

---

## ✨ Features

- Displays social media icons for major platforms
- Supports dynamic URL assignment via component properties
- Opens links in a new tab (configurable)
- Simple SLDS-based responsive layout
- Optionally includes custom social links and icons

---

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Harrymato/SFSocialMediaComponent.git
   ```

2. Navigate into the project directory and push the component to your Salesforce org:
   ```bash
   sfdx force:source:deploy -p force-app
   ```

3. Add the `c-s-f-social-media-component` to a Lightning page using the Lightning App Builder.

---

## 🔧 Component Properties

| Property        | Type    | Description                                         |
|----------------|---------|-----------------------------------------------------|
| `linkedinField`  | String  | URL to your LinkedIn page                           |
| `twitterField`   | String  | URL to your Twitter profile                         |
| `facebookField`  | String  | URL to your Facebook page                           |
| `instagramField` | String  | URL to your Instagram profile                       |
| `githubField`   | String  | URL to your GitHub                                   |
| `redditField`  | String   | URL to your Reddit Account                           |
| `openInNewTab` | Boolean | Whether to open links in a new tab (default: true)    |

---

## 🚀 Usage

Embed the component on a Lighting Record Page (Account, Contact or Lead) and provide the field API names for the corresponding text fields.

---

## 🛠 Code Structure

```
force-app/main/default/lwc/sFSocialMediaComponent/
├── sFSocialMediaComponent.html
├── sFSocialMediaComponent.js
├── sFSocialMediaComponent.js-meta.xml
└── sFSocialMediaComponent.css (optional)
```

---

## 📄 License

MIT License  
© 2025 [Harrison Thomas](https://github.com/Harrymato)

---

## 🙌 Contributing

Pull requests are welcome! Please create an issue first for major changes, including new platform icons or behavior requests.

---

## 📬 Contact

For questions, contact [@Harrymato](https://github.com/Harrymato) on GitHub.
