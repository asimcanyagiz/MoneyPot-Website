# MoneyPot — Landing Site

Marketing website for **MoneyPot**, a friendly money manager & net worth tracker for iPhone
(App Store: *AI Expense Tracker MoneyPot* / *Money Pot — AI Cost Tracker*).

- **App Store:** https://apps.apple.com/app/id6778097835
- **Hosted at:** https://appskies.github.io/moneypot/

## Stack

Pure vanilla HTML5, CSS3, and JavaScript — no frameworks, no build tools.

- `index.html` — landing page (hero, six fox-guided feature panels, highlights, CTA)
- `contact.html` — Web3Forms contact form (hCaptcha spam protection)
- `privacy.html` / `terms.html` — legal pages (mirror of the app's canonical legal docs)
- `css/style.css` — single stylesheet, "cozy fintech" theme (IBM Plex Sans/Mono)
- `js/main.js` — navigation, scroll reveals, smooth scroll, TikTok in-app browser workaround
- `js/web3forms.js` — shared Web3Forms handler (identical across appskies landing sites)
- `Assets/` — fox mascot illustrations + app icon

## Design

"Cozy fintech" — warm parchment canvas, fox-amber accent, sage green for growth, chunky
rounded shapes, and the MoneyPot fox mascot guiding each feature.

## Notes

- All asset and link paths are **relative** — the site is served from the `/moneypot/` subpath.
- Deployed via GitHub Pages.
