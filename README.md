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

The page is goal-first: a sponsor picks what they want and sees only the formats
that fit, then proof, audience, and contact.

- `_config.yml` — site config and SEO metadata
- `index.html` — page shell (uses the `default` layout)
- `_layouts/default.html` — `<head>`, Tailwind (Play CDN) config, component styles
- `_includes/goals.html` — hero, goal picker, one panel per goal, and the full list
- `_includes/option-row.html` — one format as a collapsible row
- `_includes/proof.html`, `proof-tile.html` — case study, testimonials, sponsor names
- `_includes/audience.html` — audience headline figures and the full breakdown
- `_data/options.yml` — every sponsorship format, once (price, reach, features, example)
- `_data/goals.yml` — the goals and which formats each one leads to, best fit first
- `_data/case_study.yml` — course case-study figures; an empty `value` renders as a
  marked "Data pending" placeholder. Verified 2025/2026 aggregates have explicit
  denominators and definitions; missing outcomes remain pending. No personal data
  or per-tool usage numbers
- `assets/` — images, JS (mobile menu, lightbox, goal picker), favicons

A goal can be linked directly: `#goal-awareness`, `#goal-trial`, `#goal-demo`,
`#goal-long`, `#goal-promote`, `#goal-everything`.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which downloads the pinned
rustkyll release, builds the site, and publishes it to GitHub Pages.

## Proof verification

See [proof sources and definitions](docs/2026-11-11-proof-sources.md).
The audience enrichment is finished; missing enrollment, module completion, and
future-employment outcomes must not be inferred from homework or profile data.

Run only the focused proof/goal contracts locally:

```bash
uv run --with pyyaml python -m unittest discover -s tests -v
```

This branch is a review prototype. Do not merge or deploy to Pages until Alexey
approves. The review tunnel is temporary and does not replace the published kit.
