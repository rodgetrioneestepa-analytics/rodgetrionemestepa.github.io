# Rodge Trione Estepa: e-portfolio

Plain HTML, CSS and JavaScript. No build step, so it works on GitHub Pages as is.

## Files
- `index.html`, `about.html`, `projects.html`: the three pages
- `styles.css`: all styling (colors and fonts are variables at the top)
- `projects.js`: **all project and category data. This is the file you edit.**
- `main.js`: navigation, tabs, expandable overviews, copy-email button

## Publish
1. Copy these files into the root of your GitHub Pages repository (replacing the old ones) and commit.
2. In the repository, open Settings > Pages and confirm it deploys from your main branch.

## Add a new project
1. Open `projects.js` and copy one of the objects in `window.PROJECTS`.
2. Give it a unique `id`, a `category` (`new-projects`, `certificates`, `certifications`, `internships`, `case-studies` or `competitions`), a `title`, `summary`, `tools` list, and `overview` paragraphs.
3. Use a real screenshot: put it in an `assets/` folder and add `image:'assets/my-shot.png'` and `imageAlt:'What the screenshot shows'`. Remove `preview` and `concept`.
4. Add `link:'https://...'` only when a real link exists. Set `featured:true` to also show it on Home.
5. Only add what is true. Empty categories show an honest "nothing yet" message automatically.

Deep links work: `projects.html#restaurant-sales` opens that project; `projects.html#internships` opens that tab.

## Change contact details
Edit the links in the Contact section of `index.html` and the `EMAIL` constant in `main.js`.

## Test before publishing
Open the site locally (for example `python3 -m http.server`) and check:
- [ ] Home, About, Projects all load; the active nav link is highlighted
- [ ] At 360px wide: Menu button opens and closes the nav (also with Esc)
- [ ] Projects tabs: click, then Left/Right/Home/End keys; each category opens
- [ ] Empty categories show the empty message; "Show overview" expands each card
- [ ] Email link opens Gmail compose with the address filled in; Copy email shows "Copied"
- [ ] LinkedIn and GitHub links open the right profiles
- [ ] Tab through every page with the keyboard; focus is always visible
- [ ] With "reduce motion" enabled in your OS, the hero graphic does not animate

## Profile photo
Home uses `assets/rodge-home.jpg`; About uses `assets/rodge-about.jpg`. These are the supplied photographs without image edits. CSS controls their display crop. Replace the relevant image to update that page. The previous photograph remains in the repository.

Project deep links preserve their original IDs. Basic project descriptions remain visible when JavaScript is disabled.

## Light theme and duck mascot
The Material-inspired four-color theme is in styles.css. effects.js provides optional observer reveals, restrained desktop parallax, sticky navigation effects, and reading progress; it respects reduced motion and keyboard focus.

Duck assets: assets/duck-mascot.png (transparent 512px master), assets/duck-mascot.webp (optimized 320px navigation/footer image), assets/duck-favicon.png, and assets/duck-touch-icon.png. Home and About use separate supplied photographs. The duck asset is transparent and its navigation wrapper has no background or border. See DESIGN-NOTES.md and assets/duck-logo-prompt.txt for implementation and asset details.

## Interactive Home toolkit
Home now lists Excel, Power BI, Python, SQL, Google Colab, and Looker. Edit the tool descriptions and tags in the toolkit section of index.html. toolkit.css provides circular popup styling and reduced-motion rules; toolkit.js opens circular explanations on mouse hover, keyboard focus, or tap, and closes them with Escape or an outside click. Product SVG marks and attribution notices are in assets/tools/. SQL uses a generic database symbol. About-page skills are maintained separately.

## Light/dark appearance and live wallpaper
The navigation theme button selects light or dark mode. A saved choice is restored before the page renders; first visits follow the device color scheme. The footer has a Pause background / Play background control. Preferences are stored locally in the browser, with graceful handling when storage is blocked.

appearance.css provides full dark surfaces, the controls, and four-color CSS wallpaper. appearance.js manages preferences and subtle desktop-only mouse depth. The existing effects.js still manages scroll reveals and parallax. Drift and waves loop through transform/opacity animations; hidden pages pause, reduced-motion users receive a static background, and phones skip mouse tracking and use fewer effects. No animation libraries or backend changes are needed.
