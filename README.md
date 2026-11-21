# Rodge Trione Estepa — Business Analytics Portfolio

A responsive, static e-portfolio built with HTML, CSS, and JavaScript. Hosted on GitHub Pages.

## Pages

- `index.html`: introduction, selected projects, about preview, and contact links.
- `about.html`: background, toolkit, and approach.
- `projects.html`: six portfolio categories and expandable project overviews.
- `style.css`: shared responsive theme.
- `script.js`: mobile navigation, accessible category tabs, project deep links, and email copying.
- `assets/`: original SVG illustrations and favicon. Project previews are concept illustrations, not screenshots of the actual projects.

## Preview locally

Serve this directory with any static web server, for example `python -m http.server 8000`, and visit `http://localhost:8000`.

## Add a project

1. Put screenshots or downloadable files in `assets/projects/`. Avoid publishing confidential data.
2. In `projects.html`, copy an existing `article.project-card` inside the appropriate category's panel.
3. Give the card a unique ID. Update its title, description, tools, image and alt text, and project overview.
4. Add a real repository, report, or demo link when available. Replace a concept illustration with an actual screenshot and update its caption.
5. Update the New projects count when adding to that category. Update the selected cards on `index.html` if desired.
6. Commit to `main`. GitHub Pages deploys automatically.

Tabs support Left/Right, Home/End, Enter, and Space. Native project disclosures work without JavaScript; category panels are all shown when scripting is disabled.
