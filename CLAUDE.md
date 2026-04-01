# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Content and assets for [deerfieldgreen.com](https://deerfieldgreen.com/) — an Astro 5 site (AstroWind template) deployed via Cloudflare Pages.

## Build & Serve

```bash
npm install             # install dependencies
npm run dev             # local dev server (http://localhost:4321)
npm run build           # build to dist/
npm run preview         # preview build locally
```

Requires Node.js 20+. Uses Astro 5.12+ with Tailwind CSS 3.4 (AstroWind template).

## Repository Structure

```
src/
├── pages/                  # Route components (.astro) — English at /, Japanese at /ja/
│   ├── index.astro         # English home
│   ├── ja/                 # Japanese page mirrors
│   └── [...blog]/          # Dynamic blog routes (listing, post, tag, category)
├── data/post/              # Blog posts (Markdown/MDX)
│   ├── *.md                # English posts
│   └── ja/ja-*.md          # Japanese posts (ja- prefix stripped for slug)
├── components/
│   ├── widgets/            # Page section widgets (Hero, Features, Content, etc.)
│   ├── ui/                 # Base UI (Button, Headline, WidgetWrapper, ItemGrid)
│   ├── blog/               # Blog components (List, Grid, SinglePost, RelatedPosts)
│   └── common/             # Shared (Image, Metadata, Analytics, ToggleTheme)
├── layouts/                # Layout.astro → PageLayout.astro → pages
├── utils/                  # blog.ts, permalinks.ts, images.ts, frontmatter.ts
├── assets/images/          # Processed by Astro image optimization
├── config.yaml             # Site config (metadata, blog, analytics, UI theme)
├── navigation.ts           # Header/footer nav for EN + JA
└── types.d.ts              # TypeScript interfaces for all widgets and data
vendor/integration/         # AstroWind integration — loads config.yaml → virtual module
public/                     # Static files (_headers, robots.txt, decapcms/)
.github/workflows/          # deploy.yml, preview.yml, preview-cleanup.yml
```

## Configuration

- **Site config**: `src/config.yaml` — exposed as virtual module `astrowind:config`
- **Navigation**: `src/navigation.ts` — exports `headerData`, `headerDataJa`, `footerData`, `footerDataJa`
- **Vendor integration**: `vendor/integration/` — loads YAML config, creates `SITE`, `I18N`, `METADATA`, `APP_BLOG`, `UI`, `ANALYTICS` exports

## Blog Posts

- **Frontmatter**: `publishDate` (ISO with Z suffix), `title`, `excerpt`, `category`, `tags[]`, `author`, `image`, `draft`
- **English**: `src/data/post/{slug}.md` → permalink `/{slug}`
- **Japanese**: `src/data/post/ja/ja-{slug}.md` → permalink `/ja/{slug}`
- **Listing**: pathname `articles` (configured in config.yaml)
- **Related posts**: scored by category (+5) and tags (+1), top 4 shown
- **Reading time**: auto-calculated via remark plugin

## Widget System

All widgets in `src/components/widgets/` accept common props: `id`, `isDark`, `bg`, `classes`.

| Widget | Use for |
|--------|---------|
| Hero / Hero2 / HeroText | Page banners with image, text-only, or alternate layout |
| Features / Features2 / Features3 | Icon grids with items, columns, optional image/video |
| Content | Split layout: text + image (reversible) with items |
| Steps / Steps2 | Process/timeline displays |
| CallToAction | CTA sections with actions |
| Contact | Contact form with inputs/textarea |
| Stats | Number/metric displays |
| FAQs | Accordion Q&A |
| Testimonials | Quote cards |
| Pricing | Pricing tables |
| Brands | Logo grids |
| BlogLatestPosts / BlogHighlightedPosts | Blog feeds |

Widgets use slot pattern: `<Fragment slot="title">`, `<Fragment slot="subtitle">`, `<Fragment slot="bg">`.

## Bilingual Pattern

- Japanese pages mirror English in `src/pages/ja/`
- Language detected via `Astro.url.pathname.startsWith('/ja')`
- `PageLayout` auto-selects `headerDataJa`/`footerDataJa` for `/ja/` routes
- Blog: `fetchJapanesePosts()` filters by `id.startsWith('ja/')`

## Styling

- Tailwind CSS with `@tailwindcss/typography` plugin
- CSS variables in `CustomStyles.astro`: `--aw-color-primary` (blue), `--aw-color-secondary` (dark blue), `--aw-color-accent` (purple)
- Font: Inter Variable
- Theme: `light:only` (no dark mode toggle)
- Scroll animations via custom `intersect` Tailwind variant

## Deployment

- **Production**: Push to `main` → GitHub Actions → Astro build → `wrangler pages deploy` to Cloudflare Pages
- **PR Previews**: Each PR gets a preview at `pr-{N}.deerfieldgreen-www.pages.dev`
- **Config**: `wrangler.toml` sets `pages_build_output_dir` to `dist/`
- **Headers**: `public/_headers` sets 1-year immutable cache for `/_astro/*` assets

## Key Dependencies

- `@astrojs/mdx` — MDX blog posts
- `@astrojs/sitemap` — auto-generated sitemap
- `@astrojs/rss` — RSS feed at `/rss.xml`
- `astro-icon` — icons (tabler + flat-color-icons sets)
- `astro-compress` — CSS/HTML/JS minification
- `@astrolib/seo` — SEO metadata
- `limax` — slug generation
- `reading-time` — post reading time calculation

## Important Conventions

- Page terminology: use "Assets" (not "Resources") — established naming
- Blog is called "articles" in navigation and URLs
- Button variants: `primary`, `secondary`, `tertiary`, `link`
- Images support: local paths (`~/assets/images/...`), absolute URLs, CDN URLs
