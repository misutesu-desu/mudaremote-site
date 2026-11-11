# mudaremote.misutesu.com

Static site for [MudaRemote](https://github.com/misutesu-desu/MudaRemote). Plain HTML, CSS and a small script. No build step, no dependencies.

## Pages

| Path | Page |
|---|---|
| `index.html` | Home |
| `pricing.html` | Plans, comparison, refunds summary |
| `free.html` | Free version and download steps |
| `terms.html`, `refund.html`, `privacy.html` | Legal |
| `tr/index.html`, `tr/pricing.html` | Turkish versions |
| `404.html` | Not found page, uses root paths so it works at any depth |

Shared styles live in `assets/style.css` and the theme toggle plus the latest release date live in `assets/site.js`. The header and footer are repeated in every page, so a change there has to be made in each file.

## Run it locally

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Updating the numbers

The release count, 197, is written into the pages by hand. Search for it when it changes:

```bash
grep -rn "197" --include=*.html .
```

The last release date has a static fallback, `2026-11-10`, and the script replaces it with the date from the GitHub API on load.

## Hosting

GitHub Pages serves the `main` branch from the repository root. `CNAME` sets the custom domain and `.nojekyll` turns off Jekyll processing.

### DNS

The domain needs one record at the DNS provider of `misutesu.com`:

| Type | Name | Value |
|---|---|---|
| CNAME | `mudaremote` | `misutesu-desu.github.io` |

If the provider proxies traffic, as Cloudflare does with the orange cloud, set the record to DNS only until GitHub has issued the certificate. After the record resolves, tick **Enforce HTTPS** under Settings, Pages.

To check the record:

```bash
nslookup mudaremote.misutesu.com
```

It should point to `misutesu-desu.github.io`.
