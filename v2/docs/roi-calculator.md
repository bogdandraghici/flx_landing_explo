# Agent ROI Calculator — algorithm & honest review

**Page:** `/roi-calculator` · **Code:** `v2/components/RoiCalculator.jsx`, data in `v2/lib/roiData.js`
**Status:** GTM review draft. Ported from the `flowx.ai/business-agents-roi-calculator` embed, re-skinned to the v2 design system, with the model tightened for honesty (see [Changes](#changes-made-in-this-iteration)).

This doc is for GTM/marketing to sanity-check the claims before the page ships. It has three parts: **(1) the algorithm as it runs today**, **(2) an honest review of the model**, and **(3) open decisions**.

---

## 1. The algorithm (as shipped)

### Inputs

| Input | Source | Notes |
|---|---|---|
| Industry + use case | Step 1 dropdowns | Selects which agents are available |
| Selected agents | Step 3 checkboxes | Each carries `t` = minutes saved per process run |
| Monthly volume | Step 2 number | How many times/month the process runs |
| Cost per FTE | Step 2 slider | Fully-loaded annual cost; bounds scale per currency |
| Automation rate | Step 2 slider | 40–95%, default **75%** — share of manual time actually removed |
| Platform cost | Step 2 number (optional) | Annual platform + rollout cost, to compute net + ROI |

Constants: **1,800** working hours/FTE/year. Static FX rates per 1 EUR: `USD 1.08, GBP 0.85, JPY 170`.

### Formulas

```
hourlyCost        = costPerFTE / 1800
manualMin/run     = Σ agent.t            (over selected agents)
savedMin/run      = manualMin/run × automationRate
valuePerRun       = (savedMin/run / 60) × hourlyCost
annualRuns        = monthlyVolume × 12

grossSavings      = annualRuns × valuePerRun
timeSavedHours/yr = annualRuns × savedMin/run / 60
FTE equivalent    = timeSavedHours/yr / 1800

netSavings        = grossSavings − platformCost      (if platformCost > 0)
ROI multiple      = grossSavings / platformCost       (first-year, gross)
```

Per-agent breakdown row: `annual = annualRuns × (agent.t × automationRate / 60) × hourlyCost`.

Time-per-process chart: `Before = manualMin/run`, `With AI = manualMin/run × (1 − automationRate)`. The chart and the savings now use the **same** automation rate, so they agree.

### Worked example

Banking → AML KYC (4 agents = 78 min/run), 5,000/mo, €50,000 FTE, **75%** automation:

```
hourlyCost   = 50000 / 1800            = €27.78
savedMin/run = 78 × 0.75               = 58.5 min
annualRuns   = 5000 × 12               = 60,000
timeSaved    = 60000 × 58.5 / 60       = 58,500 hrs
FTE equiv    = 58,500 / 1800           = 32.5 FTE
grossSavings = 58,500 × 27.78          ≈ €1,625,000
```

(At the old 100%-implied rate this was €2,166,667 / 43.33 FTE — the 75% default now reads more realistically.)

---

## 2. Honest review

### What's sound
- **Standard method.** Labor-cost-avoidance (`time saved × loaded rate × volume`) is the accepted, defensible way to frame automation benefit.
- **Correct & live.** Arithmetic checks out; everything re-prices from `t` + FTE cost. The dataset's legacy `v` field is intentionally unused.
- **Transparent.** The on-page "How this number is calculated" section walks a visitor through every step and states the caveats.

### Weaknesses (all tend to *inflate* the headline)
1. **It's benefit, not true ROI.** Unless a platform cost is entered, nothing is netted out. We now expose an optional cost input + ROI multiple, but it defaults off.
2. **"Saved" ≠ "cashed".** Freed capacity only becomes money if headcount is reduced or redeployed to equally valuable work. This is the #1 external criticism of calculators like this. Addressed in copy, not in math.
3. **Automation rate is a blunt lever.** One global % across all agents; reality varies by task. Default 75% is a defensible midpoint but still a guess.
4. **Additive with no ceiling.** Selecting every agent sums their minutes with no check that total saved time can't exceed the real manual handling time of the process. Power users can produce inflated totals.
5. **FX is indicative.** Static hardcoded rates, not live — fine for framing, wrong for quoting. JPY especially drifts.

### The bug that was fixed
The original embed **credited 100% of the manual minutes to savings but drew the "with AI" bar at 5%** of manual — so the headline was ~5% higher than the calculator's own chart implied. Now a single `automationRate` drives both, so they can't disagree.

### Bottom line
Good **top-of-funnel, book-a-demo** tool; the numbers are directionally fine under aggressive-but-defensible assumptions. **Not** a CFO-ready figure — realistic net savings are a fraction of the gross once cost, partial automation and unconverted capacity are accounted for. The page now says as much.

---

## 3. Changes made in this iteration

- Renamed headline to **"Estimated annual savings."**
- Added an **automation-rate slider** (40–95%, default 75%) and wired it into both savings and the chart — **fixes the 95%/100% mismatch.**
- Added an optional **platform-cost input** → shows **net savings** and a **first-year ROI multiple.**
- **Real FX conversion** on currency switch, with per-currency slider bounds (no more €→¥ symbol swap).
- Added an on-page **"How this number is calculated"** methodology section + a "How is this calculated?" link under the headline.
- Print/PDF report updated to show automation rate, gross, and net.

## Open decisions for GTM
- [ ] Default automation rate: keep **75%**, or lower to ~65% to be conservative?
- [ ] Should the **headline** be gross or net when a platform cost is present?
- [ ] Do we want **real/live FX**, or is "indicative" acceptable with the disclaimer?
- [ ] Add a **per-process manual-time cap** to stop "select all" from overstating?
- [ ] Legal/brand sign-off on the wording ("estimate", "capacity freed", ROI multiple).
- [ ] Confirm the Google Form lead endpoint + field IDs are still the ones we want.
