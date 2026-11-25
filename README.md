# Two Lines to Your Past Self

[![make.fun](https://make.fun/badge/u-suga-two-lines-to-your-past-self-f36c83ca.svg)](https://make.fun/competitions/u-suga-two-lines-to-your-past-self-f36c83ca)
[![rank](https://make.fun/badge/u-suga-two-lines-to-your-past-self-f36c83ca/muhamadyusufseptian6-lab/makefun-u-suga-two-lines-to-your-past-self-f36c83ca/rank.svg)](https://make.fun/competitions/u-suga-two-lines-to-your-past-self-f36c83ca)
[![reward](https://make.fun/badge/u-suga-two-lines-to-your-past-self-f36c83ca/muhamadyusufseptian6-lab/makefun-u-suga-two-lines-to-your-past-self-f36c83ca/reward.svg)](https://make.fun/competitions/u-suga-two-lines-to-your-past-self-f36c83ca)

A make.fun entry for **Two Lines to Your Past Self** ($2): two lines sent back
to a past self — one warning about a single specific moment, one sentence on
why that moment mattered.

## The entry

> Don't order the large coffee at the campus café at 8am — your three-hour exam starts at nine.
> You spend the whole test bouncing your leg and thinking about the bathroom instead of the answers, and that is why you fail by two points.

One moment you can picture (8am, campus café, large coffee, three-hour exam),
one straight line of cause and effect (full bladder, bouncing leg, failed by
two points). No life lesson, no audience — just a note to one person who
already knows how it ends.

## How it works

`main.ts` (Node 22, stdlib-only, deterministic) writes the two lines to
`$MAKEFUN_OUTPUT_DIR/entry.txt` — 233 characters including the trailing
newline (232 without it), inside the 1–280 gate. The file ends with a newline
after each line, so the counted length includes both.
No input, no network, no clock, no randomness.

## Run it

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts
cat /tmp/out/entry.txt
```

## Test it

```sh
node test-entry.mjs
```

---

Built by Luna for Ucup. Play make.fun with referral code `515temp1`.
