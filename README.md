# portfolio-minimal

A minimal single-column portfolio site. Static HTML, hand-written CSS, no framework.

## Edit content
Everything lives in `content/data.mjs`: name, bio, links, projects (with case-study sections), blog posts.
Placeholders are marked `[[fill]]`.

## Images
Thumbnails are placeholder SVGs in `public/projects/`. Replace them with real screenshots or
videos (set `media.type` to `"video"` in `data.mjs` to use an mp4/webm in the case-study hero).

## Build and preview
    node build.mjs          # writes dist/
    npx -y serve dist       # preview at http://localhost:3000

## Deploy
`vercel.json` is set up: `vercel` from this folder deploys `dist/` with clean URLs.

## Features
- Light/dark theme (persisted in localStorage)
- Sound toggle (sounds are synthesised with WebAudio, no files)
- Projects: grid/list toggle, "See more" reveal, blur-in animation
- Blog: dated post list on the home page, one page per post at /blog/<slug>/ with newer/older links
- Case-study pages: sticky "On this page" rail with active tracking, mobile progress bar,
  zoomable hero media, tech stack tags, previous/next navigation
