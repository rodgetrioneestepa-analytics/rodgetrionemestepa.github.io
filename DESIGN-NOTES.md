# Colorful portfolio redesign

## Scope

The static HTML/CSS/JavaScript portfolio supports GitHub Pages and Vercel. It has seven pages: Home, About, Projects, and four directly loadable project detail pages.

Original photographs, four academic projects, six project categories, inline Quick overviews, existing project/category fragments, keyboard tab controls, mobile menu, Gmail compose link, and LinkedIn/GitHub destinations remain. New View Details links open static pages. The two earlier concept cards remain removed at the user’s request. Portrait hats, helmets, frames, overlays, and their animations are explicitly removed under the latest brief; their original artwork files are preserved as inactive assets.

## Design

The visual system retains Google-inspired blue (#4285F4), red (#EA4335), yellow (#FBBC05), and green (#34A853), with #F8FAFC light backgrounds, #202124 text, #5F6368 supporting text, and white surfaces. These colors are inspiration, not Google branding. Theme tokens, rounded controls, neutral shadows, and consistent spacing extend across all seven pages. QUACK! remains #FFD700.

modern.css balances headings, clarifies project action rows, styles native technology disclosures, and adds restrained card borders/shadows. card-lighting.js supplies a passive, main-only delegated spotlight with one on-demand frame, precise card-local coordinates, and no continuous rendering loop. Its pointer-transparent pseudo-layer sits below card text; certificate thumbnail surfaces keep the original documents unobscured. Card hover elevation uses shadows instead of competing CSS transforms while GSAP owns reveal transforms. Keyboard focus has static illumination; reduced motion disables pointer lighting.

Project covers fill a consistent preview area with a top-aligned crop and retain complete-image links. Detail-page screenshots instead use contained images so important interface information and original aspect ratios are visible. Circular portraits use the same undecorated geometry in either theme.

## Mascot

assets/duck-mascot.png is the transparent master for this website. assets/duck-mascot.webp is the optimized navigation/footer asset. assets/duck-favicon.png and assets/duck-touch-icon.png are browser icons.

The background was removed with built-in ImageGen, followed by mechanical resizing and compression. The original supplied photograph and generated output were retained. This is an AI-assisted extraction and should not be treated as a pixel-identical mask. The exact edit prompt is saved in assets/duck-logo-prompt.txt.

## First-entry duck introduction

intro-boot.js prepares the first-entry overlay and records a session flag so ordinary internal navigation does not replay it. A blocked session-storage API skips the introduction instead of replaying it repeatedly. The ?intro=preview query is a deliberate review override. Neither document visibility nor normal scrolling is locked by the overlay.

The loading duck is an independent 148px display instance of the existing artwork, without duck-trigger sound behavior. A GSAP timeline rotates about center bottom through approximately -8, +8, and 0 degrees. Golden #FFD700 QUACK! has a small entrance and glow. DOM readiness requests a natural end to the current cycle, one final gentle movement, and a fade, without waiting for lazy images or adding a fixed display delay. Skip, focus, hidden/pagehide, reduced-motion, and missing-animation paths release the overlay. JavaScript has a 4.5-second maximum fallback; CSS independently removes the safety cover after five seconds.

## Motion

Locally vendored GSAP 3.15.1 and matching ScrollTrigger are reused on all seven pages; no additional GSAP plugin is installed. Upstream source/copyright/license references remain in assets/vendor/gsap/README.md.

intro.js owns the finite Home entrance after overlay completion: existing h1 line spans reveal with a short stagger, supporting copy and action links fade upward, and the portrait fades without dimensional or positional changes. Heading content remains accessible and unchanged. Focus, scrolling, pointer interaction, hidden pages, and reduced-motion preferences expose pending content and release owned entrance work. This lightweight split-text treatment avoids importing another React runtime or rewriting the heading for a React Bits component.

effects.js owns other selected offscreen main-content reveals, using opacity and 16px upward movement on desktop, 12px on mobile, with bounded per-parent staggering. Initial viewport content stays readable. Completed reveals restore owned inline styles. Home copy and portrait are excluded from this controller to avoid competing ownership; navigation/footer, duck triggers and their ancestors, portrait wrappers, and contact orbit tracks are protected. Newly visible panels and filtered certificate cards register through coalesced updates; nested targets are filtered.

Intersection Observer is the progressive fallback if GSAP/ScrollTrigger cannot initialize; missing optional APIs leave content static. Preference changes, hidden-page suspension, pagehide cleanup, and Back/Forward cache restoration are scoped to each feature’s own tweens, observers, listeners, and queued frames. No feature kills the global GSAP ticker or another owner’s animations.

Native browser scrolling is retained after evaluating Lenis: a second scrolling engine adds complexity without a demonstrated benefit for current touch, keyboard, anchor, and dialog flows. React Bits Split Text, Blur Text, Magic Bento, Spotlight Card, and Circular Gallery were evaluated; existing spans, finite GSAP fades/slides, native CSS cards, a delegated spotlight, and an accessible curved CSS gallery provide the requested feedback without importing those components. The previously requested Galaxy remains an isolated React effect; the site is not converted into a React application.

## Editing

projects.js maintains verified project content and detailsUrl destinations; certificates.js maintains separate learning records. main.js renders View Details/live links, existing category navigation, and inline Quick overviews with grouped tools/methods/sources. scripts/generate-project-pages.mjs produces the four static detail pages and holds their curated screenshot selections; run node scripts/generate-project-pages.mjs after relevant content changes, then check direct URLs, page fragments, shared assets/audio, and refresh.

intro-boot.js/intro.js/intro.css own the loading introduction and Home entrance. effects.js handles other optional content motion; styles.css defines shared tokens; modern.css and card-lighting.js refine content/cards; profile-themes.css owns clean shared portrait geometry. project-details.css and project-gallery.js/project-gallery.css own detail-page presentation and screenshot interactions.

The existing components/galaxy package resolves React and React DOM 19.3.1 and esbuild 0.27.7. Its native-WebGL2 Galaxy JS-CSS source was downloaded from the requested React Bits registry in the prior task, and its source and license notices are retained. Generated assets/galaxy scripts/styles/notices let the website remain statically served. Rebuild the component only after JSX/source changes: pnpm install --frozen-lockfile and pnpm run build from components/galaxy. The latest plan adds no dependencies and makes no backend, database, or API changes.

## Academic project technologies

Four supplied academic projects feature on Home. View Details opens projects/metricast.html, projects/jru-library-rag.html, projects/faostat.html, or projects/asean.html; these are physical static files that work directly and after refresh under project-subpath hosting. Existing inline Quick overviews retain What I built, Why I built it, Tools & Technologies Used, How it works, and What I learned. METRICAST, JRU Library Assist, and FAOSTAT Dashboard use New projects; the Heavy Bummers ASEAN Data Science Explorers 2026 team project uses Competitions. The earlier Restaurant Sales Dashboard and Inventory Management System concept cards have been removed from the data and no-script content, superseding their earlier preservation.

projects.js maintains tool objects, analytical methods, data sources, contextual descriptions, and genuine destination links. main.js shows up to four prominent tool chips with a counted More indicator. Inside inline Quick overviews, counted native details/summary groups for Tools & Platforms, Methods & Techniques, and Data Sources start closed, reducing the amount of information shown at once. Opening a group exposes all its items and roles, with native keyboard activation and expanded-state semantics. project-technologies.css and modern.css retain wrapping chips, small local icons or honest generic symbols, subtle hover feedback, focus indicators, responsive reference images, reduced-motion rules, and both themes.

Technology claims distinguish evidence from assumptions. METRICAST's supplied archive contains reference screenshots rather than source code; Python comes from the user's supplied description, CSV/POS preparation and forecast views are visible in the references, and no frontend framework, database product, Python library, deployment service, or independently validated accuracy is invented. JRU's source confirms Python/Flask, plain HTML/CSS/JavaScript, the Groq/ChromaDB/Sentence Transformers retrieval pipeline, LangChain text splitters, workbook ingestion, and deployment packaging; Jupyter/Colab describe the research environment and Vercel describes hosting. FAOSTAT is a data source, with Looker Studio as the dashboard tool; forecast displays and holdout measures do not establish an unprovided modeling implementation. The ASEAN presentation confirms Canva metadata, a SAP Analytics Cloud story/dashboard reference, ILOSTAT indicators, and PSA contextual references; descriptive comparisons do not imply causal effects, competition awards, or advanced proficiency.

Project previews come from supplied METRICAST references, the public JRU interface, the supplied FAOSTAT dashboard overview, and an unchanged dashboard image extracted from the ASEAN presentation. modern.css applies top-aligned cover previews to all real project images; links still open each complete original reference. The four visible image captions have been removed. Collapsed grids align equal-height cards and consistent previews; grids with expanded Quick overviews let cards size naturally so one expansion does not stretch every card. View Details and genuine application/dashboard links wrap cleanly; a restrained 44px Quick overview control remains secondary. Only optimized previews are included as portfolio assets. The full source PDFs, ZIP archive, private FAQ workbook, business records, and environment files remain outside the portfolio assets. See assets/projects/README.md and assets/tools/README.md for image provenance and icon notices.

## Curved project screenshot gallery

Each project detail page has its own selection: METRICAST 3, JRU Library Assist 3, FAOSTAT 1, ASEAN 1. References are not mixed across projects. One-image galleries omit unnecessary controls. The multiple-image desktop layout uses gentle CSS curvature with horizontal interaction; mobile and reduced-motion layouts simplify it. Native touch scrolling, mouse drag, Previous/Next, Arrow keys, and Home/End provide navigation. Images never advance automatically.

This is an accessible native equivalent, not an installation of React Bits Circular Gallery. Original screenshot aspect ratios are preserved with contain. Full-size native dialogs retain descriptive captions, Close/Escape/backdrop dismissal, focus restoration, and direct-file fallbacks. Loading is lazy where appropriate, and no heavy gallery is initialized on the Projects grid. Verified content does not establish an unprovided individual role, responsibility, award, quantified result, or implementation; those claims are not fabricated.

## Certifications & Trainings gallery

Projects > Certificates now presents four supplied learning records through the centralized `window.CERTIFICATES` array in certificates.js. The other project categories retain their existing data and behavior. Four unchanged originals and four uncropped 640px-wide WebP thumbnails live in assets/certificates/; its README records hashes and sizes. Month-only participation dates remain month-only. Records use accurate course completion and participation labels; competition participation is not presented as an award.

certificate-gallery.js and certificate-gallery.css provide date sorting, counted category filters, consistent cards, and three/two/one-column responsive layouts. Native card spotlight, border/shadow feedback, and visible focus enhance the presentation without rotating or rearranging records. A reusable native dialog displays each full-aspect original with Fit, zoom, scrollable panning, and an original-file download. Close, Escape, and backdrop dismissal restore focus to the initiating View button. Keyboard controls, visible focus, descriptive image text, live result counts, loading/error states, direct-file fallbacks, reduced motion, and both themes are supported. New records and filter counts follow the data automatically; no fictional verification links are supplied. Existing theme-toggle, duck, sky, and contact interactions remain; portraits follow the new clean presentation.

## Verification

This workspace has no root package manifest or lint pipeline; its existing isolated Galaxy package has a build command, and generated assets are included. Relevant verification includes component build, JavaScript syntax, focused VM lifecycle/fallback checks, static routing/content checks, original-photo hashes, protected duck/audio comparisons, and code review. Prior protected tests remain retained; a new manifest excludes only profile-themes.css because the latest brief explicitly authorizes removing its decorations. Test totals are reported separately in the implementation report.

Visual QA uses only the built-in Codex browser preview, with no external browser or desktop interaction. The latest review covers 1920 × 1080, 1366 × 768, 768 × 1024, and 390 × 844; clean Home/About portraits across both themes; all four direct detail URLs and refresh; project/card consistency; keyboard Home/End and mouse-drag gallery navigation; full-size dialogs with Escape/focus restoration; certificate filtering and 125% zoom; and independent contact-icon pause behavior. Review also observed the loading duck wobble and golden QUACK!. Runtime checks and measurements were recorded in the accompanying implementation report.

OS-level reduced-motion settings, audible speaker output, and a physical phone’s touch behavior are not reported as manually tested. Automated checks cover preference changes, suspension, fallbacks, and cleanup. Browser-size emulation is distinguished from physical-device validation. No perfect performance score or deployment is implied.

## Appearance update

Tool explanations now use circular popups, and the old hover-instruction sentence has been removed. Shared navigation includes a light/dark switch across all pages. Continuously drifting four-color gradient layers, floating shapes, and a gentle wave form a live wallpaper; parent layers retain existing scroll parallax while inner layers animate independently. Mouse depth uses coalesced event-driven frames, not a continuous JavaScript loop. Visibility suspension, reduced-motion styles, mobile simplification, and a static no-script fallback limit unnecessary motion and work.

Appearance automatically follows Philippine time (UTC+8): light 06:00–16:59 and dark 17:00–05:59. Shared theme-schedule.js runs before CSS on all seven pages. The existing moon/sun control applies a temporary override that persists across pages until the next 06:00 or 17:00 Philippine-time boundary; the old unlimited portfolio-theme preference no longer wins. appearance.js uses one next-boundary timeout, suspends it while hidden, and rechecks on focus, pageshow, and visibility changes so returning pages catch up without polling.

## Mascot and contact interaction

Duck buttons in the header and footer use the supplied first MP3 for pointer hover and the second for click or native keyboard activation. A brief QUACK! label fades in and out. The wordmark retains the Home link. Browser autoplay policies may prevent hover playback before the first visitor gesture; rejected playback does not break navigation.

The modernization preserves duck.js, duck.css, all mascot and audio assets, current size and alignment, animation triggers, hover/click sound conditions, volume settings, and overlap prevention. Content reveal guards exclude the duck and its ancestors. The existing duck owner remains responsible for stopping audio and callouts when hidden; no new animation system takes over those interactions.

Three branded social logos orbit the centered contact copy. Decorative rings ignore pointer input, links retain accessible names and focus indicators, and each logo pauses independently on hover or keyboard focus. Its track and counterrotation share the paused state, preserving position and orientation. Reduced motion stops all orbits. The mobile arrangement protects the text area. WhatsApp is omitted at the user's request; no phone number is configured.

Existing ownership remains separate: sky.js/sky.css control scenery and rocket scheduling; theme-schedule.js and appearance.js/appearance.css control Philippine-time appearance and toggle feedback; profile-themes.css controls clean portrait geometry; contact-solar.css controls orbit motion. The content layer does not take over their transforms. The separate loading-duck timeline has no audio and never targets the navigation/footer mascot.

## Day/night scenery

The theme control uses only the action icon: moon for dark mode and sun for light mode. Temporary overrides and accessible labels remain in appearance.js, using the shared Philippine-time schedule. The QUACK! callout retains its font and fade, with #FFD700 lettering on navy for contrast in both themes.

sky.js and sky.css provide two decorative scenes under the existing page-decor layer. A sparse star field and planets form the night scene; soft clouds, occasional planes, and small bird groups form the day scene. Opacity transitions blend the environments. CSS controls motion, and one cancellable timeout schedules a reusable eight-second rocket flight approximately every active minute in dark mode. Inactive themes, reduced motion, background suspension, and hidden pages avoid unnecessary animation work. The existing sky owner still schedules the rocket; the Galaxy background does not duplicate that timer. Backend and database logic remain unchanged.

## Clean professional portraits

The Home and About photographs remain separate unchanged originals. Their .themed-profile components use one shared --profile-size:min(360px,calc(100vw - 64px)), a square circle, border-radius:50%, and object-fit:cover with centered positioning. The same 360px diameter applies at desktop/laptop/tablet widths; at a 390px viewport both are 326px. Captions, alignment, and original asset quality are preserved.

Farmer hats, astronaut helmets, metallic rims, thick decorative borders, visor effects, unnecessary overlays, and frame-specific animation have been removed from both active HTML and profile styling. Original decorative artwork files remain preserved but are not loaded by these portraits. A very subtle neutral shadow supports the photo without a visible decorative frame.

Theme changes do not alter photo dimensions, crop, position, scale, or container geometry. The only initial portrait motion is a finite opacity reveal on Home, owned by intro.js; the portrait does not float, rotate, or glow continuously.

## Existing isolated Galaxy background

Galaxy.jsx and Galaxy.css retain the downloaded React Bits JS-CSS source. That registry revision uses native WebGL2 and declares no additional component dependency. React/React DOM supply the isolated mount; no duplicate React runtime or additional visual library is introduced by this redesign. React Bits license text and compiled React notices remain alongside the generated assets.

galaxy-wallpaper.js and its controller mount one empty host inside the existing night layer, below content, planets, and the rocket. Original stars are hidden only after initialization succeeds. Lazy loading and eligibility checks avoid rendering in light mode, reduced motion, hidden/suspended pages, or after cleanup; failures restore the CSS fallback. The wallpaper never captures input or changes duck size, alignment, sound triggers, or audio files.

## Celestial toggle feedback

The fixed-size theme button crossfades from a crescent to a softly glowing full moon on light-mode hover or keyboard focus. Dark mode shows a #FFD700 sun with a brighter hover halo and animated rays. Feedback reverses over about 400ms without changing navigation geometry. Reduced motion removes pulsing, rotation, and transitions while retaining static focus feedback. The obsolete manual background pause control and its saved pause preference have been removed; automatic motion safeguards remain.
