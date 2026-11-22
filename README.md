# Rodge Trione Estepa: e-portfolio

Plain HTML, CSS and JavaScript. No build step, so it works on GitHub Pages as is.

## Files
- `index.html`, `about.html`, `projects.html`: the three pages
- `styles.css`: all styling (colors and fonts are variables at the top)
- `projects.js`: project data for the existing project categories
- `certificates.js`: **certificate and training records; edit this file to add learning records**
- `certificate-gallery.js`, `certificate-gallery.css`: certificate cards, filters, and the accessible image viewer
- `main.js`: navigation, tabs, expandable overviews
- `project-technologies.css`: responsive project technology chips, details, reference images, and light/dark styling
- `duck.js`, `duck.css`: mascot audio and the QUACK! interaction
- `contact-solar.css`: responsive social-logo orbits around the contact message
- `sky.js`, `sky.css`: daytime/nighttime scenery and the one-minute rocket schedule
- `theme-schedule.js`: shared Philippine-time theme selection before CSS loads on all three pages
- `profile-themes.css`: reusable farmer/astronaut styling for Home and About photos

## Publish
1. Copy these files into the root of your GitHub Pages repository (replacing the old ones) and commit.
2. In the repository, open Settings > Pages and confirm it deploys from your main branch.

## Add a new project
1. Open `projects.js` and copy one of the objects in `window.PROJECTS`.
2. Give it a unique `id`, a `category` (`new-projects`, `certifications`, `internships`, `case-studies` or `competitions`), `kind`, `title`, and `summary`. Certificate and training records use the separate instructions below.
3. Add `tools` objects with `{name, icon, role, tone}`. `name` is the visible label, `icon` selects a supported local mark or generic symbol, `role` explains how the tool was used, and `tone` selects `blue`, `red`, `yellow`, `green`, or neutral styling. Existing string tool lists remain supported.
4. Keep `methods` and `dataSources` separate from software. Methods use `{name, role}`; data sources use `{name, role, link}` with an optional genuine public reference URL. A hosting service belongs under Tools & Platforms with a deployment role; a forecasting approach belongs under Methods & Techniques; FAOSTAT belongs under Data Sources.
5. Use `details:{built, why, how, learned}` for the expanded What I built, Why I built it, How it works, and What I learned sections. The shared renderer inserts Tools & Technologies Used between the purpose and workflow. Older `overview` paragraph arrays remain supported.
6. Put a real preview in `assets/projects/` and set `image` and descriptive `imageAlt`. Optional `imageFit:'cover'` fills the shared preview area with a top-aligned crop; FAOSTAT and ASEAN use this setting. Other images remain contained. Clicking a reference opens the complete image at full size. Project images have no visible captions. Keep asset provenance in `assets/projects/README.md`.
7. Add `link` and an optional `linkLabel` only for a real project destination. `contactLink` provides the separate Learn more on LinkedIn action. `featured:true` also shows the card on Home. Do not invent unavailable demos, implementation tools, outcomes, or proficiency claims.

Main cards show up to four prominent tools in their data order and a `+N More` indicator when additional tools exist. Expanded details display every listed tool and its role, followed by separate Methods & Techniques and Data Sources groups. Chips share consistent spacing, local icons, restrained hover feedback, light/dark colors, and reduced-motion support. Project links and expansion buttons retain visible keyboard focus.

The portfolio contains four academic projects, all featured on Home. METRICAST, JRU Library Assist, and FAOSTAT Dashboard are in New projects; ASEAN Data Science Explorers 2026 is in Competitions. The earlier Restaurant Sales Dashboard and Inventory Management System concept cards have been removed, including their no-script entries. The METRICAST archive supplied screenshots rather than implementation source, so its frontend framework, database product, libraries, and Vercel deployment are not asserted. Python is user-provided information; the CSV/POS workflow is visible in the references.

Collapsed project grids use equal card heights and consistent preview geometry. Opening project details lets cards size naturally so one expanded card does not stretch every other card. Both layouts retain responsive wrapping and light/dark styling.

Project content and previews are curated references. Source archives, full source PDFs, private FAQ workbooks, business records, and environment files are not published as portfolio assets.

Deep links work: `projects.html#jru-library-assist` opens that project's details; `projects.html#internships` opens that tab.

## Certifications & Trainings

Open **Projects > Certificates** or `projects.html#certificates`. The gallery contains four supplied records: Business Analytics with Excel, Data Science & Analytics, ASEAN DSE Enablement Session 2026, and ASEAN DSE Competition 2026. Original images are unchanged in `assets/certificates/`; each has a proportional 640px-wide WebP thumbnail. The asset README records original hashes and thumbnail sizes.

To add a record, copy an object in `window.CERTIFICATES` in `certificates.js`, not `projects.js`. Use a unique `id`, `title`, `issuer`, `date`, `dateLabel`, `category`, `typeLabel`, `description`, `image`, `thumbnail`, `imageAlt`, and the original image's `width` and `height`. Categories are `course-completions`, `trainings`, or `competitions`. Leave `verificationUrl` empty unless a genuine HTTPS verification link exists; use `note` when clarification is needed. Put the original and a readable, uncropped thumbnail in `assets/certificates/`.

Dates sort newest first. Keep the supplied precision: `2026-11-01` for a known day, `2026-07` or `2026-11` for a known month. Do not invent missing days. Use accurate course completion and participation labels; participation records do not imply an award or professional certification.

Filters, totals, and cards update from the data automatically. Clicking a card or its keyboard-accessible **View Certificate** button opens the original in a modal with Fit, zoom, scrolling, and **Download original**. Close, Escape, or a backdrop click dismisses it and restores focus. Visible focus, descriptive image text, reduced-motion support, light/dark styling, and direct original-file fallbacks are included. The layout uses three, two, or one card per row across desktop, tablet, and mobile.

## Change contact details
Edit the logo links in the Contact section of `index.html`. The Gmail logo opens a compose window; LinkedIn and GitHub open the existing profiles. Account details are not printed in the contact section. WhatsApp is intentionally omitted for privacy.

## Test before publishing
Open the site locally (for example `python3 -m http.server`) and check:
- [ ] Home, About, Projects all load; the active nav link is highlighted
- [ ] At 360px wide: Menu button opens and closes the nav (also with Esc)
- [ ] Projects tabs: click, then Left/Right/Home/End keys; each category opens
- [ ] Empty categories show the empty message; "Show project details" expands each card
- [ ] Academic project details separate tools/platforms, methods/techniques, and data sources; JRU shows four prominent tools plus `+7 More`, then all eleven tools inside its details
- [ ] Project reference images load without captions; FAOSTAT and ASEAN fill the preview area and still open their complete images
- [ ] Collapsed cards have equal heights; opening details does not stretch the other cards; long chips and details fit at 360px in both themes
- [ ] Genuine application/dashboard links open, and only the four academic projects appear in both scripted and no-script content
- [ ] Certificates: All/Course Completions/Trainings/Competitions show 4/2/1/1 records in date order
- [ ] Each certificate opens uncropped; Fit, zoom, scrolling, original download, and Close/Escape/backdrop dismissal work
- [ ] Certificate keyboard focus returns to its View button; test both themes and three/two/one-column layouts
- [ ] Gmail logo opens compose with the address filled in
- [ ] LinkedIn and GitHub links open the right profiles
- [ ] Tab through every page with the keyboard; focus is always visible
- [ ] With "reduce motion" enabled in your OS, the hero graphic does not animate
- [ ] Duck hover uses the first recording; click, Enter, or Space uses the second and shows QUACK!
- [ ] Each contact logo pauses in place on its own hover or keyboard focus; the other logos keep moving
- [ ] Automatic appearance follows Philippine time (UTC+8): light 06:00–16:59 and dark 17:00–05:59, regardless of device time zone
- [ ] The moon/sun override carries across all pages, expires at the next 06:00 or 17:00 Philippine-time boundary, and resumes the schedule after returning to a hidden page
- [ ] Dark mode has stars and planets; a rocket crosses after roughly one active minute
- [ ] Light mode has soft clouds, occasional planes, and bird silhouettes
- [ ] Reduced motion, hidden pages, and theme changes stop unnecessary scenery work

## Profile photo
Home uses `assets/rodge-home.jpg`; About uses `assets/rodge-about.jpg`. The original image files are unchanged. Both pages use a circular CSS crop with `aspect-ratio: 1 / 1`, `border-radius: 50%`, and `object-fit: cover`. The photo does not move, resize, or zoom when themes change. Replace the relevant image to update that page. The previous photograph remains in the repository.

Project deep links use the four current academic project IDs. Basic project descriptions remain visible when JavaScript is disabled.

## Light theme and duck mascot
The Material-inspired four-color theme is in styles.css. effects.js provides optional observer reveals, restrained desktop parallax, sticky navigation effects, and reading progress; it respects reduced motion and keyboard focus.

Duck assets: assets/duck-mascot.png (transparent 512px master), assets/duck-mascot.webp (optimized 320px navigation/footer image), assets/duck-favicon.png, and assets/duck-touch-icon.png. Home and About use separate supplied photographs. The duck asset is transparent and its navigation wrapper has no background or border. See DESIGN-NOTES.md and assets/duck-logo-prompt.txt for implementation and asset details.

## Interactive Home toolkit
Home now lists Excel, Power BI, Python, SQL, Google Colab, and Looker. Edit the tool descriptions and tags in the toolkit section of index.html. toolkit.css provides circular popup styling and reduced-motion rules; toolkit.js opens circular explanations on mouse hover, keyboard focus, or tap, and closes them with Escape or an outside click. Product SVG marks and attribution notices are in assets/tools/. SQL uses a generic database symbol. About-page skills are maintained separately.

## Light/dark appearance and live wallpaper
Appearance follows Philippine time (UTC+8): light from 06:00 through 16:59, and dark from 17:00 through 05:59. `theme-schedule.js` selects the theme before CSS on Home, About, and Projects. The moon/sun button creates a temporary override that carries across pages until the next 06:00 or 17:00 Philippine-time boundary. The old unlimited `portfolio-theme` preference no longer controls appearance.

The navigation crescent moon selects dark mode and crossfades to a glowing full moon on hover or keyboard focus. In dark mode, the golden sun returns to light mode; hover or keyboard focus adds a soft halo and moving rays. The 400ms feedback keeps the icon and navigation dimensions fixed. Reduced motion uses static feedback. Accessible labels describe the action without visible theme text.

The manual background pause control has been removed. Its obsolete saved preference is discarded so returning visitors are not left with paused scenery. Background motion still respects reduced motion and hidden-page suspension.

appearance.css provides full dark surfaces, the controls, and four-color CSS wallpaper. appearance.js maintains one timeout for the next scheduled boundary, pauses it while the page is hidden, and rechecks time on focus, pageshow, and visibility changes. It also manages subtle desktop-only mouse depth. The existing effects.js still manages scroll reveals and parallax. Drift and waves loop through transform/opacity animations; hidden pages pause, reduced-motion users receive a static background, and phones skip mouse tracking and use fewer effects. No animation libraries or backend changes are needed.

## Duck sounds and contact orbits
Header and footer mascots are buttons; the adjacent wordmark still links Home. The supplied recordings are stored in assets/audio/duck-hover.mp3 and assets/audio/duck-click.mp3. Hover audio can be blocked by browser autoplay rules until a visitor first interacts with the page. Clicking the duck initiates its sound directly and shows a brief QUACK! fade. Audio never loops, does not overlap, and stops when the page is hidden.

The home contact message is centered inside decorative orbital rings with Gmail, LinkedIn, and GitHub logo links. Only the hovered or keyboard-focused logo pauses; its orbit resumes from the same point afterward. Reduced motion still stops all orbits. No phone number or WhatsApp destination is configured.

## Day and night sky
`sky.js` adds one decorative scene behind the existing content. Daytime uses soft sunlight, drifting CSS clouds, occasional small airplanes, and groups of birds. Nighttime uses a sparse, reproducible star field, softly lit planets, and a single reusable rocket. Its eight-second flight begins after about sixty seconds of active dark mode and repeats approximately once a minute. Light mode, reduced motion, and hidden pages do not keep a rocket timer running.

`sky.css` fades the two scenes between themes and simplifies the scenery on phones. Motion uses transforms and opacity without animation libraries. The previous static decoration remains the fallback if the sky script cannot initialize. The yellow QUACK! callout and duck recordings remain available in both themes.

## Farmer and astronaut profile frames
Home and About share the `.themed-profile` component in `profile-themes.css`. One `--profile-size` value, `min(360px, calc(100vw - 64px))`, sizes the photograph, circular container, and overlay wrappers identically on both pages. The layouts stack at tablet widths so the same circle fits without a page-specific size cap. Captions and original photo files are retained.

Light mode displays the existing woven-straw hat and warm rim. Dark mode crossfades to the aligned metallic helmet, reflections, and blue/purple visor glow. Only decoration opacity, colors, shadows, and effects change. The image has no theme-specific transform, padding, scaling, or movement. The square helmet asset and circular photo share the same center and dimensions. Both decorations remain separate SVG assets and ignore pointer input. The 400ms decorative transitions respect reduced motion and hidden-page suspension.
