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

The page is one question: what does the sponsor want to achieve? Picking an
answer replaces the question with at most three matching formats. All other
detail is closed until asked for. See
[the audit and plan](docs/2026-11-11-rethink-audit.md).

- `_config.yml`: site config and SEO metadata
- `index.html`: page shell (uses the `default` layout)
- `_layouts/default.html`: `<head>`, Tailwind (Play CDN) config, component styles
- `_includes/goals.html`: the question, one panel per goal, and the full list
- `_includes/option-row.html`: one format as a collapsible row
- `_includes/more-detail.html`: optional audience detail, closed by default
- `_data/goals.yml`: the goals and the formats each leads to, best fit first
- `_data/options.yml`: every sponsorship format, once (price, reach, features, example)
- `_data/course_audience.yml`: verified course aggregates, and the outcomes
  not measured yet, which never get a number. No personal data
- `assets/`: images, JS (goal picker), favicons

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
