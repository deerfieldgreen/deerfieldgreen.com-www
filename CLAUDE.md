# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Content and assets for [deerfieldgreen.com](https://deerfieldgreen.com/) — a Jekyll site deployed via GitHub Pages.

## Build & Serve

```bash
bundle install          # install dependencies
bundle exec jekyll serve  # local dev server (http://localhost:4000)
bundle exec jekyll build  # build to _site/
```

Requires Ruby and Bundler. Uses the `github-pages` gem with the `minima` theme.

## Repository Structure

- **_config.yml** — Jekyll configuration (title, URL, permalink structure, plugins)
- **_posts/** — Blog posts (Jekyll naming convention: `YYYY-MM-DD-title.md`)
- **_pages/** — Static pages
- **assets/images/** — Site images
- **_site/** — Generated output (do not edit directly)
- **v2.0/** — Previous version of site content (markdown, pre-Jekyll)
- **v3.0/** — Current content drafts with assets — source material being migrated into Jekyll structure
- **research/** — Research notes (incubators, private equity) used as source material

## Key Details

- `_config.yml` has `future: true` enabled, so future-dated posts are published
- Permalink structure is `/:title/` (no date in URLs)
- The `.gitignore` is Python-oriented (from initial repo setup) — not Jekyll-specific
- WordPress XML exports in the root are for backup/migration (converting old site content to markdown)
- Content in v2.0/v3.0 directories is reference material from the pre-Jekyll site; new content should go into `_posts/` and `_pages/`
