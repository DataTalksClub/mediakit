# DataTalks.Club Media Kit

The DataTalks.Club sponsorship media kit — a static Jekyll site, built with
[rustkyll](https://github.com/alexeygrigorev/rustkyll) and deployed to GitHub Pages.

## Local development

```bash
uvx rustkyll serve
```

Then open http://localhost:4000. Live reload is on by default.

## Build

```bash
uvx rustkyll build
```

Output goes to `_site/`.

## Structure

- `_config.yml` — site config and SEO metadata
- `index.html` — page shell (uses the `default` layout)
- `_layouts/default.html` — `<head>`, Tailwind (Play CDN) config, ported component styles
- `_includes/` — section partials (hero, audience, packages, sponsors, contact, footer, …)
- `_data/` — all content (stats, charts, packages, courses, sponsors, testimonials, nav, footer)
- `assets/` — images, JS (mobile menu, lightbox, charts), favicons

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which downloads the pinned
rustkyll release, builds the site, and publishes it to GitHub Pages.
