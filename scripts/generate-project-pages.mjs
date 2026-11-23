import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sandbox = { window:{} };
vm.runInNewContext(await fs.readFile(path.join(root,'projects.js'),'utf8'),sandbox);
const projects = sandbox.window.PROJECTS;
const shell = await fs.readFile(path.join(root,'projects.html'),'utf8');
const esc = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safe = value => { try { const url=new URL(value); return url.protocol==='https:' ? url.href : ''; } catch { return ''; } };
const local = value => '../'+value;
const image = (src,caption,width,height,alt=caption) => ({src,caption,width,height,alt});
const metadata = {
  metricast:{route:'metricast.html',label:'METRICAST',context:'Academic project',cover:[1280,630],gallery:[
    image('assets/projects/metricast-reference.webp','Data-management reference showing the three related POS import files.',1280,630),
    image('assets/projects/metricast/sales-trends.webp','Sales trends, sales channels, and an actual-versus-predicted chart in the supplied interface.',1919,942),
    image('assets/projects/metricast/sales-forecast.webp','Forecast controls, a selected horizon, and an uncertainty band in the supplied interface.',1918,942)
  ],features:[['Related POS imports','Transaction, product-sales, and payment records are brought into the same workspace.'],['Performance views','Sales, product, customer, and operational views organize the reference information.'],['Forecast review','Forecast charts and error measures support a more careful interpretation of predictions.']]},
  'jru-library-assist':{route:'jru-library-rag.html',label:'JRU Library Assist',context:'Academic project',cover:[1280,720],gallery:[
    image('assets/projects/jru-library-assist.webp','The desktop application answers a library-hours question and shows its sources.',1280,720),
    image('library-assist-live-citations.jpg','An OPAC answer with an expanded source passage in the desktop interface.',1280,720),
    image('library-assist-live-mobile.jpg','The same source-supported OPAC answer in the mobile interface.',390,844)
  ],features:[['Natural-language questions','A conversational interface covers hours, borrowing, renewals, resources, and library policies.'],['Visible supporting sources','Retrieved passages and citations connect an answer to its supporting library information.'],['Source-support fallback','Requests without enough source support receive a fallback response.']]},
  'faostat-dashboard':{route:'faostat.html',label:'FAOSTAT Dashboard',context:'Academic project',cover:[900,1600],gallery:[
    image('assets/projects/faostat-dashboard.webp','Asian Agricultural Production Overview, showing charts, comparisons, indicators, and a country map.',900,1600)
  ],features:[['Country and regional comparisons','Charts, maps, and filters make agricultural indicators easier to compare.'],['Historical context','Production, yield, harvested area, and livestock views organize the historical series.'],['Forecast views','Rice projections appear alongside historical observations and holdout error measures.']]},
  'asean-dse-2026':{route:'asean.html',label:'ASEAN Data Science Explorers 2026',context:'Academic team project',cover:[660,723],gallery:[
    image('assets/projects/asean-dse-2026.webp','Philippine Youth & Education Dashboard, from the supplied Heavy Bummers team presentation.',660,723)
  ],features:[['Complementary indicators','Employment, unemployment, labor-force participation, and NEET indicators support the story.'],['Selected-year trends','The dashboard places youth labor-market changes in a historical context.'],['Gender comparisons','Comparisons across indicators support the descriptive education-to-employment narrative.']]}
};
const icons = new Set(['python','excel','powerbi','sql','looker','jupyter','flask','docker','canva','sap','vercel']);
const icon = name => icons.has(name) ? `<img src="../assets/tools/${esc(name)}.svg" width="24" height="24" alt="" loading="lazy">` : '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 6h16v14H4zM8 3v6M16 3v6M8 13h8M8 17h5"/></svg>';
const group = (title,items) => !items?.length ? '' : `<div class="detail-technology-group"><h3>${title}</h3><ul class="detail-tech-list">${items.map(item=>`<li><span class="detail-tech-icon" aria-hidden="true">${icon(item.icon)}</span><div class="detail-tech-copy"><strong>${safe(item.link)?`<a href="${esc(safe(item.link))}" target="_blank" rel="noopener noreferrer">${esc(item.name)}</a>`:esc(item.name)}</strong>${item.role?`<p>${esc(item.role)}</p>`:''}</div></li>`).join('')}</ul></div>`;
const headerRaw = shell.match(/<header class="top">[\s\S]*?<\/header>/)[0];
const footerRaw = shell.match(/<footer>[\s\S]*?<\/footer>/)[0];
const decor = shell.match(/<div class="page-decor"[\s\S]*?<a class="skip"[^>]*>Skip to content<\/a>/)[0];
const prefixLinks = html => html.replace(/(src|href)="(?!https?:|#)([^"]+)"/g,'$1="../$2"');
await fs.mkdir(path.join(root,'projects'),{recursive:true});
for (const p of projects) {
  const meta=metadata[p.id];
  if (!meta) continue;
  const header=prefixLinks(headerRaw).replace('<a href="../projects.html">Projects</a>','<a href="../projects.html" aria-current="page">Projects</a>');
  const footer=prefixLinks(footerRaw);
  const links=`${safe(p.link)?`<a class="btn" href="${esc(safe(p.link))}" target="_blank" rel="noopener noreferrer">${esc(p.linkLabel||'View project')}</a>`:''}${safe(p.contactLink)?`<a class="btn ghost" href="${esc(safe(p.contactLink))}" target="_blank" rel="noopener noreferrer">Discuss this project on LinkedIn</a>`:''}`;
  const methods=(p.methods||[]).map(m=>`<li>${esc(m.name)}</li>`).join('');
  const gallery=`<section class="detail-section screenshot-gallery" id="screenshots" data-project-gallery data-gallery-title="${esc(p.title)} screenshots" aria-labelledby="screenshots-title"><div class="gallery-heading"><div><p class="section-eyebrow">A closer look</p><h2 id="screenshots-title">Project screenshots</h2><p id="gallery-help">${meta.gallery.length>1?'Browse with Previous and Next, the arrow keys, or a drag. Select an image to view it at full size.':'Select the reference image to view it at full size.'}</p></div><div class="gallery-controls" hidden><button type="button" data-gallery-prev aria-label="Previous screenshot" aria-controls="screenshot-track">Previous</button><span class="gallery-count" data-gallery-count aria-live="polite" aria-atomic="true">1 / ${meta.gallery.length}</span><button type="button" data-gallery-next aria-label="Next screenshot" aria-controls="screenshot-track">Next</button></div></div><ul id="screenshot-track" class="gallery-track" tabindex="0" aria-label="${esc(p.title)} screenshot gallery" aria-describedby="gallery-help"${meta.gallery.length===1?' data-single':''}>${meta.gallery.map((g,i)=>`<li><figure class="gallery-figure"><a class="gallery-image-link" data-gallery-image href="${esc(local(g.src))}" target="_blank" rel="noopener" aria-label="Open screenshot ${i+1}: ${esc(g.caption)}"><img src="${esc(local(g.src))}" width="${g.width}" height="${g.height}" alt="${esc(g.alt)}" loading="lazy" decoding="async" draggable="false"></a><figcaption>${esc(g.caption)}</figcaption></figure></li>`).join('')}</ul>${meta.gallery.length===1?'<p class="gallery-note">One supplied project reference is available.</p>':''}</section>`;
  const html=`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)} | Rodge Trione Estepa</title>
<meta name="description" content="${esc(p.summary)}">
<meta name="theme-color" content="#F8FAFC">
<link rel="icon" href="../assets/duck-favicon.png" type="image/png"><link rel="apple-touch-icon" href="../assets/duck-touch-icon.png">
<link rel="canonical" href="https://rodgetrioneestepa-analytics.github.io/rodgetrionemestepa.github.io/projects/${meta.route}">
<script src="../theme-schedule.js?v=pht-schedule-20261122"></script>
<script src="../intro-boot.js?v=professional-20261123"></script>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../styles.css?v=logo-photos-20261121">
<link rel="stylesheet" href="../appearance.css?v=celestial-hover-20261121">
<link rel="stylesheet" href="../duck.css?v=yellow-quack-20261121">
<link rel="stylesheet" href="../sky.css?v=day-night-20261121">
<link rel="stylesheet" href="../modern.css?v=professional-20261123">
<link rel="stylesheet" href="../assets/galaxy/galaxy.css?v=galaxy-20261122">
<link rel="stylesheet" href="../galaxy-wallpaper.css?v=galaxy-20261122">
<link rel="stylesheet" href="../intro.css?v=professional-20261123">
<link rel="stylesheet" href="../project-details.css?v=professional-20261123">
<link rel="stylesheet" href="../project-gallery.css?v=professional-20261123">
</head>
<body class="page-project-detail" data-project-id="${esc(p.id)}">
${decor}
${header}
<main id="main">
<div class="wrap">
<section class="detail-hero" aria-labelledby="project-title">
<nav class="detail-breadcrumb" aria-label="Breadcrumb"><a href="../projects.html">Projects</a><span aria-hidden="true">/</span><span aria-current="page">${esc(meta.label)}</span></nav>
<div class="detail-hero-grid"><div class="detail-hero-copy"><p class="section-eyebrow">${esc(p.kind)}</p><h1 id="project-title">${esc(p.title)}</h1><p class="lead">${esc(p.summary)}</p><div class="detail-meta"><span>${esc(meta.context)}</span><span>Business Analytics portfolio</span></div><div class="row">${links}</div></div>
<figure class="detail-hero-image"><a href="${esc(local(p.image))}" target="_blank" rel="noopener" aria-label="Open the complete ${esc(p.title)} reference image"><img src="${esc(local(p.image))}" width="${meta.cover[0]}" height="${meta.cover[1]}" alt="${esc(p.imageAlt)}" decoding="async" fetchpriority="high"></a></figure></div>
</section>
<nav class="detail-section-nav" aria-label="On this project page"><a href="#overview">Overview</a><a href="#features">Features</a><a href="#technology">Tools &amp; technologies</a><a href="#methodology">Methodology</a><a href="#screenshots">Screenshots</a><a href="#project-links">Project links</a></nav>
<section class="detail-section" id="overview" aria-labelledby="overview-title"><p class="section-eyebrow">The context</p><h2 id="overview-title">Project overview</h2><div class="detail-context-grid"><article class="detail-panel"><h3>What I built</h3><p class="muted">${esc(p.details.built)}</p></article><article class="detail-panel"><h3>Why I built it</h3><p class="muted">${esc(p.details.why)}</p></article></div></section>
<section class="detail-section" id="features" aria-labelledby="features-title"><p class="section-eyebrow">The experience</p><h2 id="features-title">Key features</h2><div class="detail-feature-grid">${meta.features.map(([title,text])=>`<article class="detail-feature"><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join('')}</div></section>
<section class="detail-section" id="technology" aria-labelledby="technology-title"><p class="section-eyebrow">The toolkit</p><h2 id="technology-title">Tools &amp; technologies</h2>${group('Tools &amp; Platforms',p.tools)}${group('Methods &amp; Techniques',p.methods)}${group('Data Sources',p.dataSources)}</section>
<section class="detail-section" id="methodology" aria-labelledby="methodology-title"><p class="section-eyebrow">The approach</p><h2 id="methodology-title">How it works</h2><ul class="detail-method-list" aria-label="Methods">${methods}</ul><div class="detail-prose"><p>${esc(p.details.how)}</p></div><h3 style="margin-top:30px">What I learned</h3><p class="detail-learning">${esc(p.details.learned)}</p></section>
${gallery}
<section class="detail-section" id="project-links" aria-labelledby="links-title"><p class="section-eyebrow">Explore further</p><h2 id="links-title">Project links</h2><div class="row">${links}</div></section>
<div class="detail-bottom"><a href="../projects.html">Back to all projects</a><a class="btn ghost" href="../index.html#contact">Let&rsquo;s connect</a></div>
</div>
</main>
${footer}
<script src="../main.js?v=professional-20261123"></script>
<script src="../assets/vendor/gsap/gsap.min.js"></script>
<script src="../assets/vendor/gsap/ScrollTrigger.min.js"></script>
<script src="../intro.js?v=professional-20261123"></script>
<script src="../effects.js?v=professional-20261123"></script>
<script src="../project-gallery.js?v=professional-20261123"></script>
<script src="../appearance.js?v=pht-schedule-20261122"></script>
<script src="../duck.js?v=duck-sounds-20261121"></script>
<script src="../sky.js?v=day-night-20261121"></script>
<script type="module" src="../galaxy-wallpaper.js?v=galaxy-20261122"></script>
</body>
</html>
`;
  // The protected duck script uses document-relative audio paths. A base at the
  // portfolio root keeps its unchanged assets/audio/... URLs correct, including
  // GitHub Pages project subpaths. Fragment links explicitly name this page.
  const output = html
    .replace(/(src|href)="\.\.\//g, '$1="')
    .replace(/href="#([^"]+)"/g, `href="projects/${meta.route}#$1"`)
    .replace('<meta charset="utf-8">', '<meta charset="utf-8">\n<base href="../">');
  await fs.writeFile(path.join(root,'projects',meta.route),output);
  console.log('Generated projects/'+meta.route+' with '+meta.gallery.length+' project screenshots.');
}
