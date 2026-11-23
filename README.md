# Rodge Trione Estepa: e-portfolio

Seven static HTML pages retain GitHub Pages and Vercel compatibility. Local GSAP 3.15.1 and ScrollTrigger handle finite content motion. One existing isolated React Bits Galaxy mount supplies the optional night background; generated assets are included, so serving the website does not require a build.

The public portfolio is hosted on GitHub Pages.

## Files

- `index.html`, `about.html`, `projects.html`: the three main pages
- `projects/metricast.html`, `projects/jru-library-rag.html`, `projects/faostat.html`, `projects/asean.html`: dedicated static project pages
- `intro-boot.js`, `intro.js`, `intro.css`: first-entry duck introduction and finite Home entrance
- `project-details.css`, `project-gallery.js`, `project-gallery.css`: project-page layout and accessible curved screenshot gallery
- `scripts/generate-project-pages.mjs`: project-page generation and curated project-specific screenshot metadata
- `card-lighting.js`: delegated, event-driven project/certificate spotlight
- `components/galaxy/`, `galaxy-wallpaper.js`, `galaxy-wallpaper.css`, `assets/galaxy/`: existing isolated React Bits Galaxy source, controller, generated assets, and license notices
- `styles.css`: shared styling (colors and fonts are variables at the top)
- `modern.css`: content typography, card polish, native project disclosures, and responsive light/dark refinements
- `projects.js`: project data for the existing project categories
- `certificates.js`: **certificate and training records; edit this file to add learning records**
- `certificate-gallery.js`, `certificate-gallery.css`: certificate cards, filters, and the accessible image viewer
- `main.js`: navigation, tabs, expandable overviews
- `effects.js`: progressive content reveals, reading progress, and the existing sticky-header feedback
- `assets/vendor/gsap/`: pinned GSAP 3.15.1 and ScrollTrigger scripts, with upstream source and license notes
- `project-technologies.css`: responsive project technology chips, details, reference images, and light/dark styling
- `duck.js`, `duck.css`: mascot audio and the QUACK! interaction
- `contact-solar.css`: responsive social-logo orbits around the contact message
- `sky.js`, `sky.css`: daytime/nighttime scenery and the one-minute rocket schedule
- `theme-schedule.js`: shared Philippine-time theme selection before CSS loads on all seven pages
- `profile-themes.css`: shared clean circular portrait geometry on Home and About, without decorative frames

## Publishing

GitHub Pages serves the static site from `main`. Review and test changes locally before publishing. Keep generated Galaxy assets with their source and license notices.

## Add a new project

1. Open `projects.js` and copy one of the objects in `window.PROJECTS`.
2. Give it a unique `id`, a `category` (`new-projects`, `certifications`, `internships`, `case-studies` or `competitions`), `kind`, `title`, and `summary`. Certificate and training records use the separate instructions below.
3. Add `tools` objects with `{name, icon, role, tone}`. `name` is the visible label, `icon` selects a supported local mark or generic symbol, `role` explains how the tool was used, and `tone` selects `blue`, `red`, `yellow`, `green`, or neutral styling. Existing string tool lists remain supported.
4. Keep `methods` and `dataSources` separate from software. Methods use `{name, role}`; data sources use `{name, role, link}` with an optional genuine public reference URL. A hosting service belongs under Tools & Platforms with a deployment role; a forecasting approach belongs under Methods & Techniques; FAOSTAT belongs under Data Sources.
5. Use `details:{built, why, how, learned}` for the expanded What I built, Why I built it, How it works, and What I learned sections. The shared renderer inserts Tools & Technologies Used between the purpose and workflow, with separate native disclosures for its three groups. Older `overview` paragraph arrays remain supported.
6. Put a real preview in `assets/projects/` and set `image` and descriptive `imageAlt`. All real project images fill the shared preview area with a top-aligned crop; clicking a reference opens the complete image at full size. Project images have no visible captions. Keep asset provenance in `assets/projects/README.md`.
7. Add `link` and an optional `linkLabel` only for a real project destination. `contactLink` provides the separate Learn more on LinkedIn action. `featured:true` also shows the card on Home. Do not invent unavailable demos, implementation tools, outcomes, or proficiency claims.
8. Set `detailsUrl` to an existing static project page, such as `projects/metricast.html`. Maintain its per-project screenshot selection in `scripts/generate-project-pages.mjs`, run `node scripts/generate-project-pages.mjs`, then check the generated page directly and after refresh. Do not add unverified personal responsibilities, results, or GitHub links.

Main cards show up to four prominent tools in their data order and a `+N More` indicator when additional tools exist. **View Details** opens the dedicated static page, and a genuine application/dashboard link appears when supplied. Projects also retain a secondary **Quick overview** with the existing inline content. Those overviews contain counted Tools & Platforms, Methods & Techniques, and Data Sources disclosures. These start closed; opening a group displays every listed item and its role. Native `details`/`summary` controls keep keyboard activation and expanded state available without another interaction library. Chips share consistent spacing, local icons, restrained hover feedback, light/dark colors, and reduced-motion support. Project links and expansion controls retain visible keyboard focus.

The portfolio contains four academic projects, all featured on Home. METRICAST, JRU Library Assist, and FAOSTAT Dashboard are in New projects; ASEAN Data Science Explorers 2026 is in Competitions. The earlier Restaurant Sales Dashboard and Inventory Management System concept cards have been removed, including their no-script entries. The METRICAST archive supplied screenshots rather than implementation source, so its frontend framework, database product, libraries, and Vercel deployment are not asserted. Python is user-provided information; the CSV/POS workflow is visible in the references.

Collapsed project grids use equal card heights and consistent preview geometry. Opening a Quick overview lets cards size naturally so one expansion does not stretch every other card. Action rows wrap on small screens; all links and secondary overview controls retain at least 44px targets. Native spotlight and shadow feedback are separate from GSAP card transforms.

Project content and previews are curated references. Source archives, full source PDFs, private FAQ workbooks, business records, and environment files are not published as portfolio assets.

Existing deep links remain: `projects.html#jru-library-assist` opens that project's Quick overview; `projects.html#internships` opens that tab. Dedicated routes load directly and after refresh without a client router.

## Project screenshot galleries

Each detail page contains only its own references: METRICAST has three screenshots, JRU Library Assist has three, FAOSTAT has one, and ASEAN has one. Multiple screenshots use a gentle curved desktop arrangement and horizontal scrolling with Previous/Next, Arrow keys, Home/End, mouse drag, and native touch scrolling. Single-image galleries omit unnecessary navigation. Mobile and reduced-motion layouts remove the decorative curve. No gallery advances automatically.

This is a lightweight accessible CSS/JavaScript equivalent, not the React Bits Circular Gallery component. Original aspect ratios and important interface content stay visible with contained images. Selecting a screenshot opens a full-size native dialog with Close/Escape/backdrop dismissal and focus restoration. Direct original-file links remain available when the dialog cannot be used. Large images are lazy-loaded and no heavy gallery runtime is loaded on the main Projects page.

## Certifications & Trainings

Open **Projects > Certificates** or `projects.html#certificates`. The gallery contains four supplied records: Business Analytics with Excel, Data Science & Analytics, ASEAN DSE Enablement Session 2026, and ASEAN DSE Competition 2026. Original images are unchanged in `assets/certificates/`; each has a proportional 640px-wide WebP thumbnail. The asset README records original hashes and thumbnail sizes.

To add a record, copy an object in `window.CERTIFICATES` in `certificates.js`, not `projects.js`. Use a unique `id`, `title`, `issuer`, `date`, `dateLabel`, `category`, `typeLabel`, `description`, `image`, `thumbnail`, `imageAlt`, and the original image's `width` and `height`. Categories are `course-completions`, `trainings`, or `competitions`. Leave `verificationUrl` empty unless a genuine HTTPS verification link exists; use `note` when clarification is needed. Put the original and a readable, uncropped thumbnail in `assets/certificates/`.

Dates sort newest first. Keep the supplied precision: `2026-11-01` for a known day, `2026-07` or `2026-11` for a known month. Do not invent missing days. Use accurate course completion and participation labels; participation records do not imply an award or professional certification.

Filters, totals, and cards update from the data automatically. Native card-local spotlight, restrained border/shadow elevation, and visible keyboard focus improve presentation without replacing the certificate viewer. Clicking a card or its keyboard-accessible **View Certificate** button opens the original in a modal with Fit, zoom, scrolling, and **Download original**. Close, Escape, or a backdrop click dismisses it and restores focus. Visible focus, descriptive image text, reduced-motion support, light/dark styling, and direct original-file fallbacks are included. The layout uses three, two, or one card per row across desktop, tablet, and mobile.

## Change contact details

Edit the logo links in the Contact section of `index.html`. The Gmail logo opens a compose window; LinkedIn and GitHub open the existing profiles. Account details are not printed in the contact section. WhatsApp is intentionally omitted for privacy.

## Test before publishing

Open the site locally (for example `python3 -m http.server`) and check:
- [ ] All seven static pages load; active navigation, direct detail URLs, and refresh work
- [ ] Initial entry shows the independent duck introduction once per session; Skip and timeout expose content, and internal navigation does not replay it
- [ ] Use `index.html?intro=preview` to review the introduction again without clearing storage
- [ ] Home heading lines, supporting copy, buttons, and portrait enter once; focus/scroll cancels pending entrance work safely
- [ ] At 360px wide: Menu button opens and closes the nav (also with Esc)
- [ ] Projects tabs: click, then Left/Right/Home/End keys; each category opens
- [ ] Empty categories show the empty message; View Details opens its static page and Quick overview preserves inline expansion
- [ ] Academic project details separate tools/platforms, methods/techniques, and data sources into counted disclosures; mouse, Enter, and Space open each group; JRU shows four prominent tools plus `+7 More`, then all eleven tools in Tools & Platforms
- [ ] Project reference images load without captions; FAOSTAT and ASEAN fill the preview area and still open their complete images
- [ ] Collapsed cards have equal heights; opening details does not stretch the other cards; long chips and details fit at 360px in both themes
- [ ] Genuine application/dashboard links open, and only the four academic projects appear in both scripted and no-script content
- [ ] Each project gallery keeps its own images, supports keyboard and drag/touch navigation, preserves aspect ratio, opens full-size previews, and never autoplays
- [ ] Both original photographs remain clean circles at identical viewport widths; no hat, helmet, metallic rim, thick border, or portrait overlay appears in either theme
- [ ] Certificates: All/Course Completions/Trainings/Competitions show 4/2/1/1 records in date order
- [ ] Each certificate opens uncropped; Fit, zoom, scrolling, original download, and Close/Escape/backdrop dismissal work
- [ ] Certificate keyboard focus returns to its View button; test both themes and three/two/one-column layouts
- [ ] Gmail logo opens compose with the address filled in
- [ ] LinkedIn and GitHub links open the right profiles
- [ ] Tab through every page with the keyboard; focus is always visible
- [ ] With "reduce motion" enabled in your OS, decorative motion stops and content is immediately readable; changing the preference while the page is open also works
- [ ] Initial viewport content remains readable; offscreen cards and section headings reveal subtly without moving the duck, photographs, or orbit tracks
- [ ] Project tabs and certificate filters register new visible content without duplicate reveals; focus and hash navigation reveal their destinations immediately
- [ ] Content stays accessible with GSAP blocked (observer fallback), or with both GSAP and Intersection Observer unavailable (static fallback)
- [ ] Hiding the page suspends its reveal work; Back/Forward navigation restores it without duplicate observers or animations
- [ ] Duck hover uses the first recording; click, Enter, or Space uses the second and shows QUACK!
- [ ] Each contact logo pauses in place on its own hover or keyboard focus; the other logos keep moving
- [ ] Automatic appearance follows Philippine time (UTC+8): light 06:00–16:59 and dark 17:00–05:59, regardless of device time zone
- [ ] The moon/sun override carries across all pages, expires at the next 06:00 or 17:00 Philippine-time boundary, and resumes the schedule after returning to a hidden page
- [ ] Dark mode has stars and planets; a rocket crosses after roughly one active minute
- [ ] Light mode has soft clouds, occasional planes, and bird silhouettes
- [ ] Reduced motion, hidden pages, and theme changes stop unnecessary scenery work

There is no root package manifest or lint pipeline. The existing Galaxy component has its own package and build command; its ready-built assets are included. The latest plan installs no new dependencies. Local validation uses JavaScript syntax checks, focused motion/lifecycle checks, protected-asset comparisons, and the built-in Codex browser preview; serve the static files directly. Desktop applications and external browser windows are outside this testing workflow.

## Profile photo

Home uses `assets/rodge-home.jpg`; About uses `assets/rodge-about.jpg`. The original image files are unchanged. Both pages use a circular CSS crop with `aspect-ratio: 1 / 1`, `border-radius: 50%`, and `object-fit: cover`. The shared `--profile-size:min(360px,calc(100vw - 64px))` produces 360px circles at desktop/tablet widths and 326px circles at a 390px viewport on both pages. The photo does not move, resize, or zoom when themes change. Replace the relevant image to update that page. The previous photograph remains in the repository.

Project deep links use the four current academic project IDs. Basic project descriptions remain visible when JavaScript is disabled.

## Light theme and duck mascot

The Material-inspired four-color theme is in styles.css. modern.css adds content-only polish while preserving the navigation and mascot geometry. effects.js provides optional GSAP/ScrollTrigger content reveals, an observer fallback, sticky navigation feedback, and reading progress; it respects reduced motion and keyboard focus.

Duck assets: assets/duck-mascot.png (transparent 512px master), assets/duck-mascot.webp (optimized 320px navigation/footer image), assets/duck-favicon.png, and assets/duck-touch-icon.png. Home and About use separate supplied photographs. The duck asset is transparent and its navigation wrapper has no background or border. See DESIGN-NOTES.md and assets/duck-logo-prompt.txt for implementation and asset details.

The modernization leaves duck.js, duck.css, mascot/audio assets, sound triggers, volumes, size, position, and existing interactions unchanged. Scroll-reveal targets explicitly exclude the mascot, its ancestors, navigation/footer, profile components, and contact orbit tracks. The independent introduction image has no sound triggers and does not reuse the header/footer animation instance.

## Motion architecture

Local GSAP 3.15.1 and ScrollTrigger load before intro.js and effects.js. intro.js is the sole entrance owner for Home: the existing heading line spans reveal with a short stagger, then supporting copy/buttons enter and the portrait fades gently. It does not rewrite the accessible heading or continuously animate text. effects.js excludes this Home copy and portrait to avoid competing owners. Other selected offscreen main-content targets receive short opacity/12–16px slide-up reveals with a bounded stagger. Completed reveals restore owned inline styles; newly visible project panels and filtered certificate cards register through coalesced updates.

Reduced motion reveals pending content immediately. Hidden pages suspend owned reveal work; pagehide cleans up owned triggers, tweens, observers, listeners, and animation frames, and a cached pageshow restores one instance. Focus and hash navigation expose pending destinations. If GSAP cannot initialize, Intersection Observer provides the fallback; if neither is available, content remains static and visible.

Scrolling stays native. Lenis was evaluated and omitted because the existing anchor, keyboard, touch, and dialog behavior works without a second scrolling engine. Split Text, Blur Text, Magic Bento, Spotlight Card, and Circular Gallery were evaluated; this update uses existing heading spans, GSAP, CSS, and a small delegated card-lighting listener rather than adding those React components or extra runtimes. The previously installed Galaxy remains the only isolated React effect. Sky scenery, theme scheduling/icons, existing duck interactions, and contact orbits keep their owners; portrait decorations have been removed.

## Interactive Home toolkit

Home now lists Excel, Power BI, Python, SQL, Google Colab, and Looker. Edit the tool descriptions and tags in the toolkit section of index.html. toolkit.css provides circular popup styling and reduced-motion rules; toolkit.js opens circular explanations on mouse hover, keyboard focus, or tap, and closes them with Escape or an outside click. Product SVG marks and attribution notices are in assets/tools/. SQL uses a generic database symbol. About-page skills are maintained separately.

## Light/dark appearance and live wallpaper

Appearance follows Philippine time (UTC+8): light from 06:00 through 16:59, and dark from 17:00 through 05:59. `theme-schedule.js` selects the theme before CSS on all seven pages. The moon/sun button creates a temporary override that carries across pages until the next 06:00 or 17:00 Philippine-time boundary. The old unlimited `portfolio-theme` preference no longer controls appearance.

The navigation crescent moon selects dark mode and crossfades to a glowing full moon on hover or keyboard focus. In dark mode, the golden sun returns to light mode; hover or keyboard focus adds a soft halo and moving rays. The 400ms feedback keeps the icon and navigation dimensions fixed. Reduced motion uses static feedback. Accessible labels describe the action without visible theme text.

The manual background pause control has been removed. Its obsolete saved preference is discarded so returning visitors are not left with paused scenery. Background motion still respects reduced motion and hidden-page suspension.

appearance.css provides full dark surfaces, the controls, and four-color CSS wallpaper. appearance.js maintains one timeout for the next scheduled boundary, pauses it while the page is hidden, and rechecks time on focus, pageshow, and visibility changes. It also manages subtle desktop-only mouse depth. effects.js owns content reveals and skips obsolete decorative parallax writes when the sky is active. Drift and waves loop through CSS transform/opacity animations; hidden pages pause, reduced-motion users receive a static background, and phones skip mouse tracking and use fewer effects. The new GSAP content reveals do not take over the wallpaper or theme controls. No backend changes are introduced.

## Duck sounds and contact orbits

Header and footer mascots are buttons; the adjacent wordmark still links Home. The supplied recordings are stored in assets/audio/duck-hover.mp3 and assets/audio/duck-click.mp3. Hover audio can be blocked by browser autoplay rules until a visitor first interacts with the page. Clicking the duck initiates its sound directly and shows a brief QUACK! fade. Audio never loops, does not overlap, and stops when the page is hidden.

The home contact message is centered inside decorative orbital rings with Gmail, LinkedIn, and GitHub logo links. Only the hovered or keyboard-focused logo pauses; its orbit resumes from the same point afterward. Reduced motion still stops all orbits. No phone number or WhatsApp destination is configured.

## Day and night sky

`sky.js` adds one decorative scene behind the existing content. Daytime uses soft sunlight, drifting CSS clouds, occasional small airplanes, and groups of birds. Nighttime uses a sparse, reproducible star field, softly lit planets, and a single reusable rocket. Its eight-second flight begins after about sixty seconds of active dark mode and repeats approximately once a minute. Light mode, reduced motion, and hidden pages do not keep a rocket timer running.

`sky.css` fades the two scenes between themes and simplifies the scenery on phones. Motion uses transforms and opacity without animation libraries. The previous static decoration remains the fallback if the sky script cannot initialize. The yellow QUACK! callout and duck recordings remain available in both themes.

## Clean professional portraits

Home and About retain their original image files, captions, and shared circular dimensions. profile-themes.css now uses only a neutral, subtle natural shadow. Farmer hats, astronaut helmets, metallic rims, thick decorative borders, visor glows, overlays, and their continuous animations have been removed from the active presentation in both themes. Existing artwork files remain preserved as inactive assets.

## First-entry duck introduction

intro-boot.js prepares a first-entry overlay before the main motion code. Session storage prevents replay on ordinary internal navigation. If session storage is unavailable, the introduction is omitted rather than replaying repeatedly. Add `?intro=preview` to a page URL to review it again.

The independent loading image uses the existing duck asset at its own 148px display box, with a gentle GSAP timeline rotating about its bottom center by approximately ±8 degrees. Golden yellow #FFD700 QUACK! text enters subtly. No audio is played by the loading image. DOM readiness requests the exit without waiting for lazy screenshots; the current wobble finishes, a small final movement settles, and the overlay fades before the Home entrance. Skip, focus, hidden-page, pagehide, reduced-motion, and missing-animation paths release content safely. JavaScript has a 4.5-second maximum fallback, backed by a 5-second CSS safety exit. The document is never hidden or scroll-locked by the introduction.

## Existing Galaxy effect and component build

The prior requested React Bits Galaxy JS-CSS source remains isolated under components/galaxy/. Its registry files and license notices are retained. The downloaded revision uses native WebGL2 and lists no extra component dependencies; React/React DOM 19.3.1 provide its runtime and esbuild 0.27.7 builds it. No additional package is installed for the latest redesign.

The night-background module loads lazily and mounts only when eligible; light mode, reduced motion, hidden pages, pagehide, and initialization failures stop it or use the original star fallback. Generated galaxy.js, galaxy.css, React notices, and the React Bits license under assets/galaxy/ let the site remain statically served. Rebuild only after editing the JSX/component source: from components/galaxy/, run `pnpm install --frozen-lockfile` and `pnpm run build`. Keep generated assets and license notices together. The other pages have not been converted to React.

## Latest verification scope

The latest visual review used only the built-in Codex browser preview. It covered 1920 × 1080, 1366 × 768, 768 × 1024, and 390 × 844 viewports; clean Home/About portraits in both themes; all four directly loaded and refreshed project pages; keyboard/drag gallery navigation and full-size dialogs; and certificate filtering/zoom. Focused automation covers preferences, fallbacks, lifecycle cleanup, routing, and protected duck behavior. OS-level reduced-motion settings, physical-device touch, and audible speaker output are not claimed as manually verified. Test totals and any remaining limits belong in the accompanying implementation report.

For local review, serve this directory, open the root index.html in the Codex preview, and visit the dedicated project URLs above. This documentation does not indicate a deployment or a merge into main.
