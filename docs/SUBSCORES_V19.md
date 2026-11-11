# PULS V19 — Completed prototype subscore flows

Date: 2026-11-11. These are hackathon-ready **prototype flows**, not a production-ready bank assessment.

## Shared interaction contract

- Four and only four visible subscore fragments: Foundation, Behavior, Future and Knowledge.
- Tapping the central score reveals four fragments; detail pages show one **static** score circle, a fixed composer, and **no vertically scrolling detail panel**.
- Every subscore communicates what was observed, at least one auditable indicator, one optional context question, and one next step. A separate 'How calculated?' mode exposes model weights and underlying indicators.
- Questions, user-provided notes, self-reported insurance and draft savings intentions do **not** change the score.
- External source addition/removal is a **data restatement**, not a trend improvement. A scored knowledge reassessment is a new measurement, not evidence that PULS improved financial circumstances.
- Only sample records are used; users must confirm plans before they are saved as drafts.
- The fixed Wealth Guide learning journey remains **outside** all scored domains.

## Foundation (overall weight 35%)

Internal weighted indicators from `research/score_engine.js`:
- liquid buffer 40% (accessible cash / essential monthly costs)
- free cash flow 25% (average income minus essentials, other spending and debt payments)
- debt service 20%
- costly debt 15%

Shows months of accessible liquidity, known cash and required costs, approximate surplus and obligations. Asks if other accessible cash is missing. If yes or unknown, the next action is to check sources. Otherwise offers an adjustable **draft**, not a standing order. Three months is an illustrative reference, not universal advice.

## Behavior (overall weight 25%)

- net saving frequency 55%
- on-time bills 30%
- avoiding unplanned overdrafts 15%

Shows number of saving months and payment behavior. Distinguishes variable income, exceptional costs and intentional spending. An optional percent-of-surplus or fixed draft is conditional on ability to afford it; no gamified streak reward.

## Future Readiness (overall weight 30%)

- income protection 45%
- retirement readiness 45%
- concentration proxy 10%

Life Plans are a contextual part **within Future**, not an additive component of the scored health index. A saved draft with date and cost is shown; funding readiness remains unknown if earmarked savings and recurring obligations were not specified. Questions about insurance are explicitly self-reports and do not confirm adequate coverage. An illustrative move scenario routes into the same inline planning composer.

## Knowledge (overall weight 10%)

- independent, custom 5-question demo assessment (inflation, diversification, total borrowing costs, cash liquidity and compound interest)
- response feedback after completion, then explicit update to the measurement.
- does **not** claim OECD/CFPB certification or scientific validity.
- Wealth Guide lesson completion alone grants no points.

## Synthetic baseline v19

Static demo model (Lena, 2026-11-11): €4,850 accessible current-account cash, €8,200 investment assets, €1,800 monthly essential expenses, €2,700 income, six transaction months. Example values rounded: Foundation 84, Behavior 82, Future 45, Knowledge 80, overall 72. All are preliminary, have no norm-reference interpretation and are **not comparable with v18's hardcoded mock values**. External financial picture is not fully reviewed, therefore the assessment is **PROVISIONAL**.

## QA results

- Research scoring engine: 28/28 Node unit tests passed.
- Browser functional QA: initial score, transitions to each detail, optional choices and saved drafts, breakdown/methodology, independent quiz before/after score update, plan-save appearance in Future, missing external cash and debt sources, duplicate source removal, and variable/moving context.
- Five viewport checks: 1440×900; 390×844; 375×812; 320×700; 320×568. No content overflow greater than 4px across reviewed subscore stages after compact treatment.
- No JavaScript page exceptions in test paths.

## Not yet complete for production

Consent/identity, read-only bank integrations, reconciled account liabilities, full data confidence and provenance, real longitudinal baselines, evidence-backed cutoffs, representative model calibration, ongoing score stability analyses, regulated advice boundaries, external accessibility/auditing review, security and backend state retention. Real-world improvement or causal impact is **not** established by this prototype.
