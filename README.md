# MAXIMUS Toolkit Website

Static production-style landing page for MAXIMUS Toolkit.

## Files
- `index.html` — main landing/download page
- `css/style.css` — complete responsive design system
- `js/main.js` — GitHub metadata, download links, reveal animations, sticky header behavior
- `privacy.html` — starter privacy page
- `terms.html` — starter terms page
- `assets/` — logo/icon/screenshots

## Configure GitHub download
Edit `js/main.js`:

```js
const CONFIG = {
  apkUrl: "https://github.com/YOUR_USERNAME/YOUR_REPO/releases/latest/download/MAXIMUS.apk",
  githubReleaseUrl: "https://github.com/YOUR_USERNAME/YOUR_REPO/releases/latest",
  githubReleaseApi: "https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/releases/latest"
};
```

If the GitHub API is configured correctly, the website will automatically display the latest release tag, date, and APK size when available. Downloading still works if the metadata request fails.

## Screenshot note
Some screenshot slots currently reuse available project screenshots as placeholders. Replace the files inside `assets/screenshots/` with final captures using the same filenames.

## Deployment
Works on GitHub Pages, Netlify, Vercel static hosting, or ordinary web hosting.


## Flat GitHub mobile version
All website files are intentionally kept in the repository root so they can be uploaded easily from GitHub mobile without creating folders.
