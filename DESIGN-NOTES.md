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
Use projects.js to maintain project content and certificates.js for the separate certificate/training records. main.js manages existing interactions, effects.js manages optional motion, and styles.css defines the shared theme. No runtime dependencies, package installation, backend, database, or API changes were introduced.

## Certifications & Trainings gallery

Projects > Certificates now presents four supplied learning records through the centralized `window.CERTIFICATES` array in certificates.js. The other project categories retain their existing data and behavior. Four unchanged originals and four uncropped 640px-wide WebP thumbnails live in assets/certificates/; its README records hashes and sizes. Month-only participation dates remain month-only, and the Simplilearn disclaimer distinguishes course completion from an official Microsoft certification. Competition participation is not presented as an award.

certificate-gallery.js and certificate-gallery.css provide date sorting, counted category filters, consistent cards, and three/two/one-column responsive layouts. A reusable native dialog displays each full-aspect original with Fit, zoom, scrollable panning, and an original-file download. Close, Escape, and backdrop dismissal restore focus to the initiating View button. Keyboard controls, visible focus, descriptive image text, live result counts, loading/error states, direct-file fallbacks, reduced motion, and both themes are supported. New records and filter counts follow the data automatically; no fictional verification links are supplied. Existing theme-toggle, profile, duck, sky, and contact interactions are preserved.

## Verification
JavaScript syntax, local link/image references, generated image alpha, browser interactions, and desktop/mobile layouts are checked during implementation. This buildless repository has no build command, package manifest, lint configuration, or automated test suite.

## Appearance update
Tool explanations now use circular popups, and the old hover-instruction sentence has been removed. Shared navigation includes a light/dark switch across all pages. Continuously drifting four-color gradient layers, floating shapes, and a gentle wave form a live wallpaper; parent layers retain existing scroll parallax while inner layers animate independently. Mouse depth uses coalesced event-driven frames, not a continuous JavaScript loop. Visibility suspension, reduced-motion styles, mobile simplification, and a static no-script fallback limit unnecessary motion and work.

## Mascot and contact interaction
Duck buttons in the header and footer use the supplied first MP3 for pointer hover and the second for click or native keyboard activation. A brief QUACK! label fades in and out. The wordmark retains the Home link. Browser autoplay policies may prevent hover playback before the first visitor gesture; rejected playback does not break navigation.

Three branded social logos orbit the centered contact copy. Decorative rings ignore pointer input, links retain accessible names and focus indicators, and each logo pauses independently on hover or keyboard focus. Its track and counterrotation share the paused state, preserving position and orientation. Reduced motion stops all orbits. The mobile arrangement protects the text area. WhatsApp is omitted at the user's request; no phone number is configured.

## Day/night scenery
The theme control uses only the action icon: moon for dark mode and sun for light mode. Saved preferences and accessible labels remain in appearance.js. The QUACK! callout retains its font and fade, with #FFD700 lettering on navy for contrast in both themes.

sky.js and sky.css provide two decorative scenes under the existing page-decor layer. A sparse star field and planets form the night scene; soft clouds, occasional planes, and small bird groups form the day scene. Opacity transitions blend the environments. CSS controls motion, and one cancellable timeout schedules a reusable eight-second rocket flight approximately every active minute in dark mode. Inactive themes, reduced motion, background suspension, and hidden pages avoid unnecessary animation work. No backend, database, content, or project-data changes are involved.

## Theme-aware profile frames
The Home and About photographs remain separate original image files. The reusable `.themed-profile` component now uses a fixed 1:1 circular container, an `object-fit: cover` photo, and absolute overlay wrappers with identical dimensions. A shared viewport-based `--profile-size` gives both pages the same diameter, independent of their surrounding grid columns. The old dark-mode photo scaling and daytime image float are removed.

The straw hat sits along the circle's upper edge. The square astronaut asset places its metallic rim and transparent visor directly over the same circular photograph. The light treatment uses warm countryside accents; dark mode uses silver/navy details and a soft blue-purple glow. Theme changes affect only decorative opacity, colors, shadows, and effects over roughly 400ms. Image width, height, position, scale, shape, and container dimensions remain unchanged. Hat-only motion and visor glow respect hidden-page suspension and reduced motion. No new JavaScript or dependencies are required.

## Celestial toggle feedback
The fixed-size theme button crossfades from a crescent to a softly glowing full moon on light-mode hover or keyboard focus. Dark mode shows a #FFD700 sun with a brighter hover halo and animated rays. Feedback reverses over about 400ms without changing navigation geometry. Reduced motion removes pulsing, rotation, and transitions while retaining static focus feedback. The obsolete manual background pause control and saved preference have been removed; automatic motion safeguards remain.
