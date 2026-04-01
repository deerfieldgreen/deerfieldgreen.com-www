# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Content and assets for [deerfieldgreen.com](https://deerfieldgreen.com/) — an Astro site (AstroWind template) deployed via Cloudflare Pages.

## Build & Serve

```bash
npm install             # install dependencies
npm run dev             # local dev server (http://localhost:4321)
npm run build           # build to dist/
npm run preview         # preview build locally
```

Requires Node.js 20+. Uses Astro with Tailwind CSS (AstroWind template).

## Repository Structure

- **src/pages/** — Astro page components (.astro files)
- **src/data/post/** — Blog posts in Markdown/MDX
- **src/components/** — Reusable Astro components and widgets
- **src/layouts/** — Page layouts (Layout, PageLayout, MarkdownLayout)
- **src/assets/images/** — Site images (processed by Astro image optimization)
- **src/config.yaml** — Site configuration (metadata, blog settings, analytics)
- **src/navigation.ts** — Header and footer navigation structure
- **public/** — Static files served as-is
- **_jekyll_backup/** — Archived Jekyll content (migration reference)

## Deployment

- **Production**: Push to `main` triggers GitHub Actions → Astro build → `wrangler pages deploy` to Cloudflare Pages
- **PR Previews**: Each PR gets a preview at `pr-{N}.deerfieldgreen-www.pages.dev`
- **Config**: `wrangler.toml` sets `pages_build_output_dir` to `dist/`

## Key Details

- Bilingual site: English at `/` and Japanese at `/ja/`
- Blog posts use `publishDate` frontmatter field (ISO format with Z suffix)
- Blog is configured as "articles" in config.yaml (pathname: 'articles')
- Permalink structure for posts: `/%slug%`
- Uses AstroWind widgets: Hero, Content, Features, CallToAction, Contact, etc.
- Tailwind CSS for styling with custom configuration in tailwind.config.js
