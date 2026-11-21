# Rodge Trione Estepa: e-portfolio

Plain HTML, CSS and JavaScript. No build step, so it works on GitHub Pages as is.

## Files
- `index.html`, `about.html`, `projects.html`: the three pages
- `styles.css`: all styling (colors and fonts are variables at the top)
- `projects.js`: **all project and category data. This is the file you edit.**
- `main.js`: navigation, tabs, expandable overviews
- `duck.js`, `duck.css`: mascot audio and the QUACK! interaction
- `contact-solar.css`: responsive social-logo orbits around the contact message
- `sky.js`, `sky.css`: daytime/nighttime scenery and the one-minute rocket schedule
- `profile-themes.css`: reusable farmer/astronaut styling for Home and About photos

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
Edit the logo links in the Contact section of `index.html`. The Gmail logo opens a compose window; LinkedIn and GitHub open the existing profiles. Account details are not printed in the contact section. WhatsApp is intentionally omitted for privacy.

## Test before publishing
Open the site locally (for example `python3 -m http.server`) and check:
- [ ] Home, About, Projects all load; the active nav link is highlighted
- [ ] At 360px wide: Menu button opens and closes the nav (also with Esc)
- [ ] Projects tabs: click, then Left/Right/Home/End keys; each category opens
- [ ] Empty categories show the empty message; "Show overview" expands each card
- [ ] Gmail logo opens compose with the address filled in
- [ ] LinkedIn and GitHub links open the right profiles
- [ ] Tab through every page with the keyboard; focus is always visible
- [ ] With "reduce motion" enabled in your OS, the hero graphic does not animate
- [ ] Duck hover uses the first recording; click, Enter, or Space uses the second and shows QUACK!
- [ ] Each contact logo pauses in place on its own hover or keyboard focus; the other logos keep moving
- [ ] The icon-only moon/sun button switches themes and restores the saved selection on all pages
- [ ] Dark mode has stars and planets; a rocket crosses after roughly one active minute
- [ ] Light mode has soft clouds, occasional planes, and bird silhouettes
- [ ] Reduced motion, hidden pages, and theme changes stop unnecessary scenery work

## Profile photo
Home uses `assets/rodge-home.jpg`; About uses `assets/rodge-about.jpg`. The image files are unchanged. The themed frames use `object-fit: contain` to show the full photographs without distortion or cropping. Replace the relevant image to update that page. The previous photograph remains in the repository.

Project deep links preserve their original IDs. Basic project descriptions remain visible when JavaScript is disabled.

## Light theme and duck mascot
The Material-inspired four-color theme is in styles.css. effects.js provides optional observer reveals, restrained desktop parallax, sticky navigation effects, and reading progress; it respects reduced motion and keyboard focus.

Duck assets: assets/duck-mascot.png (transparent 512px master), assets/duck-mascot.webp (optimized 320px navigation/footer image), assets/duck-favicon.png, and assets/duck-touch-icon.png. Home and About use separate supplied photographs. The duck asset is transparent and its navigation wrapper has no background or border. See DESIGN-NOTES.md and assets/duck-logo-prompt.txt for implementation and asset details.

## Interactive Home toolkit
Home now lists Excel, Power BI, Python, SQL, Google Colab, and Looker. Edit the tool descriptions and tags in the toolkit section of index.html. toolkit.css provides circular popup styling and reduced-motion rules; toolkit.js opens circular explanations on mouse hover, keyboard focus, or tap, and closes them with Escape or an outside click. Product SVG marks and attribution notices are in assets/tools/. SQL uses a generic database symbol. About-page skills are maintained separately.

## Light/dark appearance and live wallpaper
The navigation crescent moon selects dark mode and crossfades to a glowing full moon on hover or keyboard focus. In dark mode, the golden sun returns to light mode; hover or keyboard focus adds a soft halo and moving rays. The 400ms feedback keeps the icon and navigation dimensions fixed. Reduced motion uses static feedback. Accessible labels describe the action without visible theme text. A saved theme is restored before the page renders; first visits follow the device color scheme.

The manual background pause control has been removed. Its obsolete saved preference is discarded so returning visitors are not left with paused scenery. Background motion still respects reduced motion and hidden-page suspension.

appearance.css provides full dark surfaces, the controls, and four-color CSS wallpaper. appearance.js manages preferences and subtle desktop-only mouse depth. The existing effects.js still manages scroll reveals and parallax. Drift and waves loop through transform/opacity animations; hidden pages pause, reduced-motion users receive a static background, and phones skip mouse tracking and use fewer effects. No animation libraries or backend changes are needed.

## Duck sounds and contact orbits
Header and footer mascots are buttons; the adjacent wordmark still links Home. The supplied recordings are stored in assets/audio/duck-hover.mp3 and assets/audio/duck-click.mp3. Hover audio can be blocked by browser autoplay rules until a visitor first interacts with the page. Clicking the duck initiates its sound directly and shows a brief QUACK! fade. Audio never loops, does not overlap, and stops when the page is hidden.

The home contact message is centered inside decorative orbital rings with Gmail, LinkedIn, and GitHub logo links. Only the hovered or keyboard-focused logo pauses; its orbit resumes from the same point afterward. Reduced motion still stops all orbits. No phone number or WhatsApp destination is configured.

## Day and night sky
`sky.js` adds one decorative scene behind the existing content. Daytime uses soft sunlight, drifting CSS clouds, occasional small airplanes, and groups of birds. Nighttime uses a sparse, reproducible star field, softly lit planets, and a single reusable rocket. Its eight-second flight begins after about sixty seconds of active dark mode and repeats approximately once a minute. Light mode, reduced motion, and hidden pages do not keep a rocket timer running.

`sky.css` fades the two scenes between themes and simplifies the scenery on phones. Motion uses transforms and opacity without animation libraries. The previous static decoration remains the fallback if the sky script cannot initialize. The yellow QUACK! callout and duck recordings remain available in both themes.

## Farmer and astronaut profile frames
Home and About share the `.themed-profile` component in `profile-themes.css`. The existing card dimensions, image-frame aspect ratios, captions, and original photo files are retained. Light mode adds a separate woven-straw hat along the upper frame edge and warm countryside accents. Dark mode crossfades to a metallic helmet with a transparent circular visor, subtle reflections, and a blue/purple rim glow.

The full photo fits inside the visor with extra inset in dark mode rather than a circular crop. Both SVG decorations are separate assets: `assets/profile-straw-hat.svg` and `assets/profile-space-helmet.svg`. Their wrappers are hidden from assistive technology and ignore pointer input. The 450ms theme transitions and gentle decorative motion respect reduced motion and hidden-page suspension.
