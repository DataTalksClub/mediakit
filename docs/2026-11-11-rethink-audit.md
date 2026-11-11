# Media kit rethink: audit and plan (11 Nov 2026)

Intake `02bed9f2-f606-4400-90c1-4df725175c00`. Draft PR
https://github.com/DataTalksClub/mediakit/pull/2. Review only: do not merge or
publish until Alexey approves.

## Why the kit was overloaded

The published kit asks a sponsor to learn our channels before it answers their
question. It has 16 priced formats in eight channel sections, each a large card
with an image, a feature list, and metrics; a 12-entry menu; five audience
charts; and six long testimonials at the bottom.

The first goal-first prototype (a3373a6) added a goal picker but kept
everything else on the page. A sponsor still saw, before choosing anything, a
four-number stat strip, a four-link menu, and below the picker a proof section
(11 course figures, six testimonials, 25 sponsor names), an audience section
(five tiles plus five charts), and a contact section. After choosing, the first
format opened by itself with its feature list and screenshot, next to a quote
card and a second contact box. It had more blocks than the kit it replaced.

## What the kit is now

One question, then one answer.

1. First screen: a headline, one sentence about the audience, and "What do you
   want to achieve?" with six choices. Nothing else. About 80 words.
2. Choosing a goal replaces the question with that goal: at most three formats,
   best fit first, each one line with its price, and one button to email
   Alexey. About 85 words.
3. Detail is opt-in, and only after a goal is chosen: a format row opens to
   show what is included; three closed rows below hold audience breakdown,
   course audience, and past sponsors.

Goals and their formats:

- Brand awareness: newsletter primary slot, LinkedIn and X post, course mention.
- Hands-on product trial: course workshop, full course module, live workshop.
- Short demo or workshop: live workshop, product video, in-person workshop.
- Long format: full course module, podcast episode, guest post.
- Promote existing content: stand-alone newsletter, primary slot, LinkedIn and X post.
- Show me everything: all 16 formats as a price list by channel.

Each goal is a link (`#goal-trial`), so it can be shared and the back button
returns to the question.

## Removed or hidden

Removed from the page: the menu, the stat strip (now one sentence), the proof
section, the course case study and its 11 tiles, all testimonials and the
per-goal quote card, the audience section and its charts, the contact section,
format screenshots and the lightbox, the "something else in mind" chips, the
course calendar line, and the fourth and fifth format of each goal (still under
"Show me everything").

Hidden until a goal is chosen, and closed by default: format inclusions, reach
figures, pricing notes and example links; the top three values of each audience
breakdown; four verified course figures; past sponsor names.

No case studies are in the kit. The course figures are the verified aggregates
from `docs/2026-11-11-proof-sources.md`. Enrollments, module completions, and
employment within 12 months are named as not measured and carry no number.
Prices and format details are unchanged from the published kit.

## Verification

`uv run --with pyyaml python -m unittest discover -s tests -v` (six focused
contracts) and `uvx rustkyll build`. The preview was driven in a browser at
1280 and 390 px: every goal shows one panel with three closed rows, the full
list shows 16, "Change goal" returns to the question, no script errors, no
horizontal overflow.
