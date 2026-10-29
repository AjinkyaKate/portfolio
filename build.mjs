// Static site builder: node build.mjs  ->  writes dist/
import { mkdirSync, writeFileSync, cpSync, rmSync, existsSync } from "node:fs";
import { site, bio, projects, projectsInitialCount, posts } from "./content/data.mjs";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const attrJson = (o) => esc(JSON.stringify(o));

const icons = {
  sun: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
  moon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>`,
  volOn: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/></svg>`,
  volOff: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>`,
  list: `<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="0" y="2" width="16" height="1.5" rx="0.75" fill="currentColor"/><rect x="0" y="7.25" width="16" height="1.5" rx="0.75" fill="currentColor"/><rect x="0" y="12.5" width="16" height="1.5" rx="0.75" fill="currentColor"/></svg>`,
  grid: `<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="0" y="0" width="7" height="7" rx="1.5" fill="currentColor"/><rect x="9" y="0" width="7" height="7" rx="1.5" fill="currentColor"/><rect x="0" y="9" width="7" height="7" rx="1.5" fill="currentColor"/><rect x="9" y="9" width="7" height="7" rx="1.5" fill="currentColor"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.4 7.86 10.92.57.1.78-.25.78-.56v-1.96c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.2.67.79.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
};

const themeScript = `<script>(function(){try{var t=localStorage.getItem("theme")||"light";if(t==="dark")document.documentElement.classList.add("dark");document.documentElement.style.colorScheme=t;}catch(e){}})();</script>`;

const controls = () => `
<div class="controls">
  <button class="icon-btn" data-sound-toggle aria-label="Disable sound"><span class="icon-swap"><span class="ic-on">${icons.volOn}</span><span class="ic-off hide">${icons.volOff}</span></span></button>
  <button class="icon-btn" data-theme-toggle aria-label="Toggle theme"><span class="icon-swap"><span class="ic-moon">${icons.moon}</span><span class="ic-sun hide">${icons.sun}</span></span></button>
</div>`;

const head = (title, description, path = "") => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}" />
<meta name="author" content="${esc(site.name)}" />
<link rel="icon" href="/icon.svg" type="image/svg+xml" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400&display=swap" />
<link rel="stylesheet" href="/styles.css" />
${themeScript}
</head>`;

const collection = ({ id, label, items, initial, view, toggle = true }) => `
<div class="reveal">
  <div id="${id}" class="section" data-collection data-view="${view}" data-initial="${initial}" data-items="${attrJson(items)}">
    <div class="section-head">
      <h1>${esc(label)}</h1>
      ${toggle ? `<div class="view-toggle">
        <button data-view-btn="list" aria-label="List view" aria-pressed="${view === "list"}">${icons.list}</button>
        <button data-view-btn="grid" aria-label="Grid view" aria-pressed="${view === "grid"}">${icons.grid}</button>
      </div>` : ""}
    </div>
    <div data-body></div>
    ${items.length > initial ? `<div class="see-more" data-see-more><button class="btn">See more</button></div>` : ""}
  </div>
</div>`;

/* ---------- Home ---------- */
const projectItems = projects.map((p) => ({ title: p.title, description: p.description, href: `/projects/${p.slug}/`, src: p.media.src, bg: !!p.media.bg }));
const fmtDate = (d) => new Date(d + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
// posts still holding [[fill]] placeholders stay unpublished
const sortedPosts = posts.filter((p) => !JSON.stringify(p).includes("[[fill]]")).sort((a, b) => b.date.localeCompare(a.date));
const postItems = sortedPosts.map((p) => ({ title: p.title, description: fmtDate(p.date), href: `/blog/${p.slug}/` }));

const home = `${head(site.name, site.description)}
<body>
<div class="page">
  <div class="container">
    <div class="site-header reveal">
      <div class="row"><h1>${esc(site.name)}</h1>${controls()}</div>
      <p class="role">${esc(site.title)}</p>
    </div>
    <div class="bio reveal">
      ${bio.map((p) => `<p>${p}</p>`).join("\n      ")}
    </div>
    ${collection({ id: "projects", label: "Projects", items: projectItems, initial: projectsInitialCount, view: "grid" })}
    ${postItems.length ? collection({ id: "blog", label: "Blog", items: postItems, initial: postItems.length, view: "list", toggle: false }) : ""}
    <div class="elsewhere reveal">
      <p class="label">Elsewhere</p>
      <p class="lead">Where to find me online</p>
      <div class="links">
        ${site.links.map((l, i) => `<span><a href="${esc(l.href)}" target="_blank" rel="noreferrer">${esc(l.label)}</a>${i < site.links.length - 1 ? `<span class="dot">·</span>` : ""}</span>`).join("\n        ")}
      </div>
    </div>
    <div class="reveal">
      <footer class="site-footer">
        <span>Last updated · ${esc(site.lastUpdated)}</span>
        <span>© ${esc(site.year)} ${esc(site.name)}</span>
      </footer>
    </div>
  </div>
</div>
<script src="/app.js"></script>
</body>
</html>`;

/* ---------- Project pages ---------- */
const casePage = (p, i, all, base) => {
  const prev = all[i - 1], next = all[i + 1];
  const titled = p.sections.filter((s) => s.title);
  const toc = titled.map((s, j) => `
      <li>
        <button type="button" class="toc-link${j === 0 ? " active" : ""}" data-target="${s.id}"><span class="tick"></span><span class="txt">${esc(s.title)}</span></button>
        ${j < titled.length - 1 ? `<div aria-hidden="true" class="minor"><span></span><span></span></div>` : ""}
      </li>`).join("");
  const sections = p.sections.map((s) => `
    <section id="${s.id}" class="case-section">
      ${s.title ? `<h2>${esc(s.title)}</h2>` : ""}
      ${s.tags ? `<div class="tags">${s.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>` : ""}
      <div class="prose">${(s.paragraphs || []).map((t) => `<p>${esc(t)}</p>`).join("")}</div>
      ${s.figure ? `<div class="case-figure"><button type="button" data-zoom="${esc(s.figure)}" aria-label="Open ${esc(s.title)} media"><img alt="${esc(s.title)} media" src="${esc(s.figure)}" /></button></div>` : ""}
    </section>`).join("");
  const heroKind = p.media && p.media.type === "video" ? "video" : "image";
  const hero = !p.media ? "" : heroKind === "video"
    ? `<video src="${esc(p.media.src)}" autoplay loop muted playsinline></video>`
    : `<img src="${esc(p.media.src)}" alt="${esc(p.title)}"${p.media.fit === "contain" ? ` style="object-fit:contain"` : ""} />`;
  return `${head(`${p.title} · ${site.name}`, p.description)}
<body>
<div class="page">
  <div class="progress-wrap"><div class="progress-track"><div class="progress-bar" data-progress></div></div></div>
  <div class="case-wrap">
    ${titled.length > 1 ? `<div class="toc-wrap">
      <aside class="toc" data-toc>
        <p class="toc-label"><span class="glyph">☰</span><span>On this page</span></p>
        <ul>${toc}
        </ul>
      </aside>
    </div>` : ""}
    <main class="case-main">
      <header class="case-header">
        <div class="case-topbar">
          <a class="back" href="${base === "/blog" ? "/#blog" : "/"}" aria-label="Back to home"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg><span>Back</span></a>
          ${controls()}
        </div>
        <p class="case-kicker">${p.category ? `${esc(p.category)} · ${esc(p.year)}` : `${esc(fmtDate(p.date))}${p.readTime ? ` · ${esc(p.readTime)}` : ""}`}</p>
        <h1 class="case-title">${esc(p.title)}</h1>
        <p class="case-lede">${esc(p.description)}</p>
        ${p.media ? `<div class="case-hero">
          <div class="frame">
            <button type="button" class="zoom" data-zoom="${esc(p.media.src)}" data-zoom-kind="${heroKind}" aria-label="Open case study media"><div class="inner">${hero}</div></button>
          </div>
          ${p.canonical ? `<div class="case-links"><a href="${esc(p.canonical)}" target="_blank" rel="noopener noreferrer">${icons.globe}<span>Originally published on Medium</span></a></div>` : ""}
          ${(p.links || []).length ? `<div class="case-links">${p.links.map((l) => `<a href="${esc(l.href)}" target="_blank" rel="noopener noreferrer">${icons[l.icon] || ""}<span>${esc(l.label)}</span></a>`).join("")}</div>` : ""}
        </div>` : ""}
      </header>
      ${sections}
      <div class="case-nav">
        <div>${prev ? `<a href="${base}/${prev.slug}/"><p class="lbl">Previous</p><p class="ttl">${esc(prev.title)}</p></a>` : ""}</div>
        <div class="next">${next ? `<a href="${base}/${next.slug}/"><p class="lbl">Next</p><p class="ttl">${esc(next.title)}</p></a>` : ""}</div>
      </div>
    </main>
  </div>
</div>
<div class="lightbox" data-lightbox></div>
<script src="/app.js"></script>
</body>
</html>`;
};

/* ---------- Write ---------- */
if (existsSync("dist")) rmSync("dist", { recursive: true });
mkdirSync("dist", { recursive: true });
cpSync("public", "dist", { recursive: true });
writeFileSync("dist/index.html", home);
projects.forEach((p, i) => {
  mkdirSync(`dist/projects/${p.slug}`, { recursive: true });
  writeFileSync(`dist/projects/${p.slug}/index.html`, casePage(p, i, projects, "/projects"));
});
sortedPosts.forEach((p, i) => {
  mkdirSync(`dist/blog/${p.slug}`, { recursive: true });
  writeFileSync(`dist/blog/${p.slug}/index.html`, casePage(p, i, sortedPosts, "/blog"));
});
console.log(`built dist/: index.html + ${projects.length} project pages + ${sortedPosts.length} blog posts`);
