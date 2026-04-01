# deerfieldgreen.com-www

Source code and content for [deerfieldgreen.com](https://deerfieldgreen.com/) -- a bilingual (English/Japanese) website built with Astro 5 and the AstroWind template, styled with Tailwind CSS.

## Quick Start

Requires Node.js 20+.

```bash
npm install        # install dependencies
npm run dev        # start dev server at http://localhost:4321
npm run build      # production build to dist/
npm run preview    # preview the production build locally
```

## Project Structure

- `src/pages/` -- Astro page components (English at `/`, Japanese at `/ja/`)
- `src/data/post/` -- Blog posts in Markdown/MDX
- `src/components/` -- Reusable components and widgets
- `src/config.yaml` -- Site configuration
- `src/navigation.ts` -- Header and footer navigation

## Deployment

Production deploys automatically when pushing to `main` via GitHub Actions and Cloudflare Pages. Pull requests get preview deployments at `pr-{N}.deerfieldgreen-www.pages.dev`.
