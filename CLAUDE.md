# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Content and assets for [deerfieldgreen.com](https://deerfieldgreen.com/) — an Astro 6 site (AstroWind template) deployed via Cloudflare Pages.

## Build & Serve

```bash
npm install             # install dependencies
npm run dev             # local dev server (http://localhost:4321)
npm run build           # build to dist/
npm run preview         # preview build locally
```

Requires Node.js 22+. Uses Astro 6.1+ with Tailwind CSS 3.4 (AstroWind template).

## Linting & Formatting

```bash
npm run check           # run all checks (astro + eslint + prettier)
npm run check:astro     # type-check Astro/TS files
npm run check:eslint    # lint with ESLint
npm run check:prettier  # check formatting with Prettier
npm run fix             # auto-fix eslint + prettier issues
```

Pre-commit hooks: `.pre-commit-config.yaml` runs `black` (Python formatter — for any Python scripts in the repo).

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

## Pages

| English Route | Japanese Route | Page |
|---------------|---------------|------|
| `/` | `/ja/` | Home |
| `/about/` | `/ja/about/` | About Deerfield Green |
| `/services/` | `/ja/services/` | Services (AI Product Strategy + SaaS Growth) |
| `/investment/` | `/ja/investment/` | Investment (Quant Hedge Fund) |
| `/incubator/` | `/ja/incubator/` | Incubator (Healthcare VC) |
| `/private-equity/` | `/ja/private-equity/` | Private Equity (Japan Healthcare) |
| `/philanthropy/` | `/ja/philanthropy/` | Philanthropy |
| `/insights/` | `/ja/insights/` | Insights (hub linking to subdomains) |
| `/team/` | `/ja/team/` | Team |
| `/life/` | `/ja/life/` | Life @DFG |
| `/contact/` | `/ja/contact/` | Contact |
| `/articles/` | `/ja/articles/` | Blog listing |

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
| Hero / HeroText | Page banners with image or text-only |
| Features / Features2 | Icon grids with items, columns, optional image/video |
| Content | Split layout: text + image (reversible) with items |
| Steps2 | Process/timeline displays |
| CallToAction | CTA sections with actions |
| Contact | Contact form with inputs/textarea |
| Stats | Number/metric displays |
| BlogLatestPosts / BlogHighlightedPosts | Blog feeds |

Widgets use slot pattern: `<Fragment slot="title">`, `<Fragment slot="subtitle">`, `<Fragment slot="bg">`.

## Bilingual Pattern

- Japanese pages mirror English in `src/pages/ja/`
- Language detected via `Astro.url.pathname.startsWith('/ja')`
- `PageLayout` auto-selects `headerDataJa`/`footerDataJa` for `/ja/` routes
- Blog: `fetchJapanesePosts()` filters by `id.startsWith('ja/')`
- All Japanese text should use です/ます (polite form) consistently

## Image Attribution

- Unsplash images require proper attribution below each image
- Format: `Photo by [Name](profile_url) on [Unsplash](unsplash_url)` with UTM params (`?utm_source=deerfieldgreen&utm_medium=referral`)
- Use small gray text: `class="mt-1 text-xs text-gray-400 text-right"`
- Use the `<Fragment slot="image">` pattern with `Image` component + attribution `<p>` tag
- Unsplash API key is in Doppler: project `deerfieldgreen-www`, config `prd`, key `UNSPLASH_ACCESS_KEY`
- Always trigger download tracking via the API's `download_location` endpoint

## Styling

- Tailwind CSS with `@tailwindcss/typography` plugin
- CSS variables in `CustomStyles.astro`: `--aw-color-primary` (warm gold `rgb(196 168 130)`), `--aw-color-secondary` (dark warm `rgb(61 56 50)`), `--aw-color-accent` (same warm gold)
- Fonts: DM Sans Variable (body), Fraunces Variable (headings/serif)
- Theme: `light:only` (no dark mode toggle)
- Scroll animations via custom `intersect` Tailwind variant

## Deployment

- **Production**: Push to `main` → GitHub Actions → Astro build → `wrangler pages deploy` to Cloudflare Pages
- **PR Previews**: Each PR gets a preview at `pr-{N}.deerfieldgreen-www.pages.dev`
- **Config**: `wrangler.toml` sets `pages_build_output_dir` to `dist/`
- **Headers**: `public/_headers` sets 1-year immutable cache for `/_astro/*` assets
- **CI**: Node.js 22, `.npmrc` has `legacy-peer-deps=true` for Astro 6 compatibility with `@astrolib/analytics`

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

- Page terminology: use "Insights" (not "Assets" or "Resources") for the content hub page
- Blog is called "articles" in navigation and URLs
- Services page covers both "AI Product Strategy" and "SaaS Growth"
- Button variants: `primary`, `secondary`, `tertiary`, `link`
- Images support: local paths (`~/assets/images/...`), absolute URLs, CDN URLs
- Every content page should end with a `CallToAction` widget linking to `/contact/`
