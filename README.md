# Subtitle Bridge website

The public download site for Subtitle Bridge. This is a separate project from the Electron player and reporting service.

## Run locally

Requires Node.js 20 or newer; no dependency installation or build is needed.

```sh
node scripts/serve.mjs
```

Open the printed local address. Set `PORT` to change the default port 4317.

## Change the direct download link

Edit `dist/site-config.js`:

- `installerUrl`: the public HTTPS download link for the Windows installer.
- `version` and `installerSize`: the version and approximate installer size displayed on the page.
- `portableUrl` and `releaseUrl`: the optional ZIP and release notes links.

Only public values belong here. No keys, credentials, private stream URLs or user information.
Also update the fallback URLs and version/size text in `dist/index.html` so downloads and release details remain correct when JavaScript is disabled. Normal browser rendering uses the config.

```sh
node scripts/check.mjs
```

Commit and push the changes, then republish through Sites. A GitHub push alone does not automatically deploy this version. To host on another static host, serve `dist` as the public output directory; there is no build command or server-side dependency.

## Content and privacy

- Installer and ZIP links use the official public v1.0.7 GitHub Release.
- The three interactive example meanings come from the shipped dictionary and are stored locally in `dist/app.js`.
- The example is a browser demonstration, not actual video playback or arbitrary word translation.
- No analytics, accounts, cookies, forms, reporting API calls or external font requests are used by this page.
- Dictionary counts and supported formats reflect v1.0.7. Update them with future releases.
- SVG branding is copied from the approved app artwork. The included outlined wordmark derives from Inter; its OFL license is in `licenses/Inter-OFL.txt`.

Source on GitHub: https://github.com/PyaeSoneHtun-98/subtitle-bridge-website

## Hosting

`.openai/hosting.json` identifies the Site and serves the tracked `dist` directory. Keep the Site ID when editing this site; never commit a hosting token. Sites keeps a separate hosting source mirror; GitHub is the owner’s repository for this website.
