# Sponsor media kit review prototype — 11 Nov 2026

Intake: `02bed9f2-f606-4400-90c1-4df725175c00`.
Draft PR: https://github.com/DataTalksClub/mediakit/pull/2 — do not merge.
Current preview: https://tend-palm-basically-barrier.trycloudflare.com/

## Audit (AC1)

The website's `/mediakit/` redirects to
https://datatalksclub.github.io/mediakit/, built from DataTalksClub/mediakit.
The website's redirect tests explicitly prevent a second kit here. The original
kit contains 16 priced formats in eight channel sections with large cards,
images, feature lists and metrics; a 12-entry channel-based menu; five audience
charts and modals, topics, joining reasons and community quotes before pricing;
repeated pricing rules; and six lengthy testimonials near the bottom. Sponsors
must understand the channels before choosing. The page does not connect goals
to formats, and proof is far from the formats it supports.

## Proposed structure (AC2–AC3)

Goal → matching options with prices → course proof and sponsor stories →
audience → contact. Four navigation links: Find your format, Proof, Audience,
Contact. Start with six choices:

- Brand awareness / a mention → newsletter, social, course mention, podcast.
- Hands-on product trial → course workshop/module and hands-on workshops.
- Short demo/workshop → workshop, product video, video/article, in-person workshop.
- Long format → course module/workshop, podcast, guest post.
- Promote existing content → standalone/regular newsletter, social, talk promotion.
- Show me everything → all 16 formats grouped by channel.

Each goal has a direct link. Only its formats appear after selection; format
rows reveal inclusions/examples on demand. A matching sponsor quote sits beside
the choices, with a contact link naming the goal. Existing prices are retained.

## Verified proof and honest gaps (AC4)

Enrichment is finished; this task no longer waits for it. Sources are the final
10 Nov `REST-FINISH.md`, `audience-summary.md`, `audience-stats.json`,
`warehouses-summary.md`, and `FINISH.md` under the private report directory.
Only aggregate figures are reproduced in the prototype.

- HW3 unique submitters: 583 (2025), 873 (2026).
- Final-project unique submitters: 366 (2025), 613 (2026).
- Distinct submitted project repositories across all attempts: 381 / 643.
- 973 unique people across cohorts; six overlap. 631 have usable enriched profiles.
- 501/592 known-seniority authors are mid-level or above (84.6%).
- Known-role denominator 565: DE 198, analytics engineering 27, data analysis 99,
  DS/ML 88, software engineering 116, other 37.
- 395 enriched authors name 374 employers. Aggregate examples: Accenture 4,
  EPAM 4, Google 3, TCS 3. Public self-reports, not verified current employment
  or company endorsement. Employer segments retain unknowns explicitly.
- Freelancers/contractors 71/631 (11.3%), with contract roles distinguished from
  independent work. Current students/job seekers 64/592 (10.8%).

Submission counts are not enrollment, completion, passing, or graduation counts.
Explicit Data pending tiles name verified enrollments, verified module
completions and longitudinal employment within 12 months. No prediction is made
about students being employed next year. No student personal records or
sponsor-sensitive tool-usage figures appear in the kit.

## Preview and git flow (AC5–AC6)

Update the existing draft PR in the repository that owns the kit. The requested
website worktree remains on `feat/media-kit-goal-first`, based on `origin/main`;
no website routing or production content is changed. The earlier separate
mediakit checkout is preserved. The isolated update checkout is under the
requested worktree at `.tmp/mediakit-prototype`, branch
`feat/goal-first-media-kit`, based on the existing draft PR. Both checkouts stay
until Alexey decides. No merge and no push to main.

The current dev preview supersedes the earlier private artifact, whose numbers
were all placeholders. It serves a static-only copy with a preview banner,
noindex headers, robots exclusion, and no source tree, report files or secrets.
It is a temporary Cloudflare quick tunnel, has no uptime guarantee, and lasts
while its user services run. It does not deploy the website or GitHub Pages.

Owner service units: `media-kit-review-76d26e96.service` and
`media-kit-tunnel-76d26e96.service`. Stop only these units after Alexey is done:
`systemctl --user stop media-kit-tunnel-76d26e96 media-kit-review-76d26e96`.
The server source, preview assets and tunnel log are in project-local `.tmp/`.

## Verification

Only targeted unit tests locally: five proof/goal contracts, all passing via
`uv run --with pyyaml python -m unittest discover -s tests -v` in the isolated
mediakit checkout. `uvx rustkyll build` succeeds. No full local suite run.
Independent visual review captures desktop/mobile screenshots under
`.tmp/tester-media-kit/`; acceptance evidence is recorded in the PR and intake.
