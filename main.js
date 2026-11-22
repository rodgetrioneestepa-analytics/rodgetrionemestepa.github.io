(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const EMAIL='rodgetrionemestepa@gmail.com';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* Navigation */
const menu=$('.menu'),nav=$('#nav'),norm=s=>(s||'index').replace('.html','')||'index';
const here=norm(location.pathname.split('/').pop());
$$('#nav a:not(.btn)').forEach(a=>{if(norm(a.getAttribute('href'))===here)a.setAttribute('aria-current','page')});
const setMenu=o=>{nav.classList.toggle('open',o);menu.setAttribute('aria-expanded',o);menu.textContent=o?'Close':'Menu'};
menu.addEventListener('click',()=>setMenu(!nav.classList.contains('open')));
nav.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){setMenu(false);menu.focus()}});
document.addEventListener('click',e=>{if(!e.target.closest('.top'))setMenu(false)});
window.matchMedia('(min-width: 721px)').addEventListener('change',()=>setMenu(false));

/* Copy email */
const cp=$('[data-copy]'),st=$('#copy-status');
let copyReset;
if(cp)cp.addEventListener('click',async()=>{
  clearTimeout(copyReset);
  try{
    if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(EMAIL);
    st.textContent='Email address copied.';cp.textContent='Copied';
    copyReset=setTimeout(()=>{cp.textContent='Copy email';st.textContent=''},2500);
  }catch(e){st.textContent='Copy this address: '+EMAIL;cp.textContent='Copy email'}
});

/* Concept illustrations (replace with a screenshot using the "image" field) */
const ART={
sales:'<svg viewBox="0 0 320 180" aria-hidden="true">'+[40,70,55,95,80,120,105].map((h,i)=>`<rect class="a" opacity=".35" x="${28+i*38}" y="${150-h}" width="22" height="${h}" rx="2"/>`).join('')+'<path class="l" d="M20 150H300"/><polyline class="ln" points="39,98 77,68 115,83 153,43 191,57 229,26 267,38"/><circle class="a" cx="267" cy="38" r="5"/></svg>',
inventory:'<svg viewBox="0 0 320 180" aria-hidden="true">'+[[.8,0],[.55,0],[.18,1],[.7,0]].map(([v,low],i)=>`<rect class="g" x="28" y="${28+i*34}" width="264" height="14" rx="3"/><rect class="${low?'w':'a'}" x="28" y="${28+i*34}" width="${264*v}" height="14" rx="3"/>`).join('')+'<path class="d" d="M107 18V160"/></svg>'
};
const iconFiles={python:'python',excel:'excel',powerbi:'powerbi',sql:'sql',looker:'looker',jupyter:'jupyter',flask:'flask',docker:'docker',canva:'canva',sap:'sap',vercel:'vercel'};
const namedIcons={'Excel':'excel','Power BI':'powerbi','Python':'python','SQL':'sql'};
const iconPaths={
  data:'<path d="M5 3h10l4 4v14H5zM15 3v5h4M8 12h8M8 16h8M11 10v9"/>',
  database:'<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/>',
  code:'<path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18"/>',
  chain:'<path d="m9 15 6-6M7 14l-2 2a4 4 0 0 0 6 6l4-4a4 4 0 0 0 0-6M17 10l2-2a4 4 0 0 0-6-6L9 6a4 4 0 0 0 0 6"/>',
  embeddings:'<circle cx="5" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="m7 7 3.5 3.5m3-3L17 7M7 17l3.5-3.5m3 0L17 17"/>',
  method:'<path d="M3 3v18h18M6 16l5-6 4 3 6-8"/>'
};
const externalUrl=value=>{try{const u=new URL(value);return ['https:','http:'].includes(u.protocol)?u.href:''}catch{return ''}};
const toolsFor=p=>(p.tools||[]).map(t=>typeof t==='string'?{name:t,icon:namedIcons[t]||'code',tone:'blue'}:t);
const toolIcon=icon=>`<span class="tech-icon" aria-hidden="true">${iconFiles[icon]?`<img src="assets/tools/${iconFiles[icon]}.svg" width="20" height="20" alt="" loading="lazy">`:icon==='groq'?'<b>g</b>':`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${iconPaths[icon]||iconPaths.method}</svg>`}</span>`;
const chip=(item,icon)=>`<li class="tech-chip" data-tool-tone="${esc(item.tone||'neutral')}">${toolIcon(item.icon||icon)}<span>${esc(item.name)}</span></li>`;
const techGroup=(heading,items,className,icon)=>!items?.length?'':`<div class="project-tech-group"><h5>${heading}</h5><ul class="${className}">${items.map(item=>chip(item,icon)).join('')}</ul>${items.some(item=>item.role)?`<ul class="project-tool-notes">${items.filter(item=>item.role).map(item=>`<li><strong>${externalUrl(item.link)?`<a href="${esc(externalUrl(item.link))}" target="_blank" rel="noopener noreferrer">${esc(item.name)}</a>`:esc(item.name)}</strong><span>${esc(item.role)}</span></li>`).join('')}</ul>`:''}</div>`;
const technologyDetails=p=>`<div class="project-detail-section project-technologies"><h4>Tools &amp; Technologies Used</h4>${techGroup('Tools &amp; Platforms',toolsFor(p),'project-tool-chips project-tool-chips-full','code')}${techGroup('Methods &amp; Techniques',p.methods,'project-method-chips','method')}${techGroup('Data Sources',p.dataSources,'project-source-chips','database')}</div>`;
const projectDetails=p=>{
  const section=(title,text)=>text?`<div class="project-detail-section"><h4>${title}</h4><p>${esc(text)}</p></div>`:'';
  const details=p.details?`${section('What I built',p.details.built)}${section('Why I built it',p.details.why)}${technologyDetails(p)}${section('How it works',p.details.how)}${section('What I learned',p.details.learned)}`:`${(p.overview||[]).map(t=>`<p>${esc(t)}</p>`).join('')}${technologyDetails(p)}`;
  const link=externalUrl(p.link),contact=externalUrl(p.contactLink);
  return `<div class="project-detail-flow">${details}${link||contact?`<div class="project-actions">${link?`<a class="btn small" href="${esc(link)}" target="_blank" rel="noopener noreferrer">${esc(p.linkLabel||'View project')}</a>`:''}${contact?`<a class="project-contact-link" href="${esc(contact)}" target="_blank" rel="noopener noreferrer" aria-label="Learn more about ${esc(p.title)} on LinkedIn">Learn more on LinkedIn</a>`:''}</div>`:''}</div>`;
};
const card=(p,full)=>{
  const tools=toolsFor(p),title=p.details?'Show project details':'Show overview',close=p.details?'Hide project details':'Hide overview';
  return `<article class="card project-card${p.imageFit==='cover'?' project-preview-fill':''}" id="${esc(p.id)}">
${p.image?`<figure class="prev project-real-preview"><a href="${esc(p.image)}" target="_blank" rel="noopener" aria-label="Open reference image for ${esc(p.title)}"><img src="${esc(p.image)}" alt="${esc(p.imageAlt||p.title)}" loading="lazy" decoding="async"></a></figure>`:p.preview?`<figure class="prev">${ART[p.preview]||''}${p.concept?'<span class="badge">Concept illustration</span>':''}</figure>`:''}
<div class="body"><p class="kind">${esc(p.kind)}</p><h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p>
<p class="project-tools-label">Tools &amp; Technologies Used</p><ul class="project-tool-chips" aria-label="Prominent tools and platforms">${tools.slice(0,4).map(t=>chip(t,'code')).join('')}${tools.length>4?`<li class="tech-chip tech-more" aria-label="${tools.length-4} more tools in project details">+${tools.length-4} More</li>`:''}</ul>
${full?`<button class="more" type="button" aria-expanded="false" aria-controls="ov-${esc(p.id)}" data-open-label="${title}" data-close-label="${close}">${title}</button><div class="ov" id="ov-${esc(p.id)}" hidden>${projectDetails(p)}</div>`:`<a class="more" href="projects.html#${esc(p.id)}">Explore the project</a>`}
</div></article>`;
};

const P=window.PROJECTS||[],C=window.CATEGORIES||[];
const certificates=Array.isArray(window.CERTIFICATES)?window.CERTIFICATES:[];
const feat=$('#featured');
if(feat)feat.innerHTML=P.filter(p=>p.featured).map(p=>card(p)).join('')||'<p class="muted">Featured projects will appear here.</p>';

/* Expandable overviews */
const toggle=(btn,open)=>{const o=open??btn.getAttribute('aria-expanded')!=='true';btn.setAttribute('aria-expanded',o);btn.textContent=o?(btn.dataset.closeLabel||'Hide overview'):(btn.dataset.openLabel||'Show overview');document.getElementById(btn.getAttribute('aria-controls')).hidden=!o};
document.addEventListener('click',e=>{const b=e.target.closest('button.more');if(b)toggle(b)});

/* Projects page: tabs */
const tabs=$('#tabs'),panels=$('#panels');
if(tabs){
  tabs.innerHTML=C.map(([id,n])=>`<button type="button" role="tab" id="t-${id}" aria-controls="p-${id}" aria-selected="false" tabindex="-1">${esc(n)} <span class="n">${id==='certificates'?certificates.length:P.filter(p=>p.category===id).length}</span></button>`).join('');
  panels.innerHTML=C.map(([id,n])=>{
    if(id==='certificates')return `<div role="tabpanel" id="p-certificates" aria-labelledby="t-certificates" tabindex="0" hidden><section class="certificate-gallery" id="certifications-trainings" aria-labelledby="certifications-title"><h2 id="certifications-title">Certifications &amp; Trainings</h2><p>A collection of my learning experiences, completed courses, and professional development activities.</p><ul class="cert-fallback">${certificates.map(c=>`<li><a href="${esc(c.image)}" target="_blank" rel="noopener">${esc(c.title)}</a></li>`).join('')}</ul></section></div>`;
    const l=P.filter(p=>p.category===id);
    return `<div role="tabpanel" id="p-${id}" aria-labelledby="t-${id}" tabindex="0" hidden>${l.length?`<div class="grid">${l.map(p=>card(p,1)).join('')}</div>`:`<div class="empty"><h3>No ${n.toLowerCase()} yet</h3><p>Nothing has been added to this category yet. Take a look at New projects, or check back later.</p></div>`}</div>`}).join('');
  const T=$$('[role=tab]',tabs);
  const pick=(id,focus,updateHash=false)=>{T.forEach(t=>{const on=t.id==='t-'+id;t.setAttribute('aria-selected',on);t.tabIndex=on?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!on;if(on&&focus)t.focus()});if(updateHash)history.replaceState(null,'','#'+id)};
  tabs.addEventListener('click',e=>{const t=e.target.closest('[role=tab]');if(t)pick(t.id.slice(2),false,true)});
  tabs.addEventListener('keydown',e=>{const i=T.indexOf(document.activeElement);if(i<0)return;
    const j={ArrowRight:(i+1)%T.length,ArrowLeft:(i-1+T.length)%T.length,Home:0,End:T.length-1}[e.key];
    if(j!==undefined){e.preventDefault();pick(T[j].id.slice(2),true,true)}});
  const route=()=>{const h=location.hash.slice(1),p=P.find(x=>x.id===h);
    if(C.some(c=>c[0]===h))return pick(h);
    if(p){pick(p.category);const b=$(`[aria-controls="ov-${p.id}"]`);if(b)toggle(b,true);const el=document.getElementById(p.id);el&&el.scrollIntoView()}
    else pick(C[0][0])};
  route();addEventListener('hashchange',route);
}
})();
