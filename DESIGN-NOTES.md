# Colorful portfolio redesign

## Scope
The existing static HTML/CSS/JavaScript portfolio remains on GitHub Pages and Vercel. Its profile photographs, all project data, six project categories, expandable overviews, project deep links, keyboard tab controls, mobile menu, Gmail compose link, and LinkedIn/GitHub destinations are retained. The contact area now uses logo links in place of account cards and the copy-email control.

## Design
The new light theme uses Google-inspired blue (#4285F4), red (#EA4335), yellow (#FBBC05), and green (#34A853), with #F8FAFC backgrounds, #202124 text, #5F6368 supporting text, and white surfaces. These colors are inspiration, not Google branding. Darker text variants support contrast. Rounded controls, soft shadows, dotted and grid textures, decorative circles, and gradient/wave layers carry the visual system across all three pages.

## Mascot
assets/duck-mascot.png is the transparent master for this website. assets/duck-mascot.webp is the optimized navigation/footer asset. assets/duck-favicon.png and assets/duck-touch-icon.png are browser icons.

The background was removed with built-in ImageGen, followed by mechanical resizing and compression. The original supplied photograph and generated output were retained. This is an AI-assisted extraction and should not be treated as a pixel-identical mask. The exact edit prompt is saved in assets/duck-logo-prompt.txt.

## Motion
effects.js progressively adds Intersection Observer reveals: short fades, 18px upward movement, and stagger delays capped at 180ms. A single passive scroll listener schedules one animation frame for navigation shadow, a thin four-color reading-progress indicator, and desktop-only decorative parallax capped at 24px. Content remains available if the observer API is unavailable, during keyboard focus and hash navigation, and with reduced motion enabled.

## Editing
Use projects.js to maintain project content; main.js manages existing interactions, effects.js manages optional motion, and styles.css defines the shared theme. No runtime dependencies, package installation, backend, database, or API changes were introduced.

## Verification
JavaScript syntax, local link/image references, generated image alpha, browser interactions, and desktop/mobile layouts are checked during implementation. This buildless repository has no build command, package manifest, lint configuration, or automated test suite.

## Appearance update
Tool explanations now use circular popups, and the old hover-instruction sentence has been removed. Shared navigation includes a light/dark switch across all pages. Continuously drifting four-color gradient layers, floating shapes, and a gentle wave form a live wallpaper; parent layers retain existing scroll parallax while inner layers animate independently. Mouse depth uses coalesced event-driven frames, not a continuous JavaScript loop. A footer pause control, visibility suspension, reduced-motion styles, mobile simplification, and a static no-script fallback limit unnecessary motion and work.

## Mascot and contact interaction
Duck buttons in the header and footer use the supplied first MP3 for pointer hover and the second for click or native keyboard activation. A brief QUACK! label fades in and out. The wordmark retains the Home link. Browser autoplay policies may prevent hover playback before the first visitor gesture; rejected playback does not break navigation.

Three branded social logos orbit the centered contact copy. Decorative rings ignore pointer input, links retain accessible names and focus indicators, and each logo pauses independently on hover or keyboard focus. Its track and counterrotation share the paused state, preserving position and orientation. Background pause still stops all orbits. The mobile arrangement protects the text area. WhatsApp is omitted at the user's request; no phone number is configured.

## Day/night scenery
The theme control uses only the action icon: moon for dark mode and sun for light mode. Saved preferences and accessible labels remain in appearance.js. The QUACK! callout retains its font and fade, with #FFD700 lettering on navy for contrast in both themes.

sky.js and sky.css provide two decorative scenes under the existing page-decor layer. A sparse star field and planets form the night scene; soft clouds, occasional planes, and small bird groups form the day scene. Opacity transitions blend the environments. CSS controls motion, and one cancellable timeout schedules a reusable eight-second rocket flight approximately every active minute in dark mode. Inactive themes, reduced motion, background suspension, and hidden pages avoid unnecessary animation work. No backend, database, content, or project-data changes are involved.
