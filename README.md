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

Commit and push changes to `main`, then publish with `vercel deploy --prod`. Vercel serves `dist` directly, without installing dependencies or running a build. The release links are public configuration; no environment variables or secrets are required. Automatic GitHub deployments require a separately authorized repository connection.

## Content and privacy

- Installer and ZIP links use the official public v1.0.7 GitHub Release.
- The three interactive example meanings come from the shipped dictionary and are stored locally in `dist/app.js`.
- The example is a browser demonstration, not actual video playback or arbitrary word translation.
- No analytics, accounts, cookies, forms, reporting API calls or external font requests are used by this page.
- Dictionary counts and supported formats reflect v1.0.7. Update them with future releases.
- SVG branding is copied from the approved app artwork. The included outlined wordmark derives from Inter; its OFL license is in `licenses/Inter-OFL.txt`.

Source on GitHub: https://github.com/PyaeSoneHtun-98/subtitle-bridge-website

## Hosting

Vercel is the primary host. `vercel.json` sets the public output directory to `dist`, with no install or build command. GitHub repository `PyaeSoneHtun-98/subtitle-bridge-website` contains the source on `main`. Vercel is linked to the local project; automatic GitHub deployment is not configured. `.vercel/` contains local project-link metadata and is ignored. Never commit hosting tokens. The existing `.openai/hosting.json` preserves the previous Sites deployment identity; it is excluded from Vercel uploads.
