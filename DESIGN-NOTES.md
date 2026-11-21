# Colorful portfolio redesign

## Scope
The existing static HTML/CSS/JavaScript portfolio remains on GitHub Pages. Its profile photographs, all project data, six project categories, expandable overviews, project deep links, keyboard tab controls, mobile menu, Gmail compose link, LinkedIn/GitHub links, and copy-email workflow are retained.

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
