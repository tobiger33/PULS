# PULS Financial Health — Four-domain scoring methodology v0.2

**Status:** Experimental hackathon prototype only, neither validated nor regulated personalized financial advice. This file is the operative v0.2 specification; cf. the archived v0.1 package for the earlier five-domain hypothesis.

## 1. What changed

The user-facing score has four domains (two chips on each side of the center circle):

| Scored domain | Weight | Data |
|---|---:|---|
| Financial Foundation | 35% | Liquidity, cash flow, debt and borrowing costs |
| Financial Behavior | 25% | Saving frequency, punctuality, unplanned overdrafts |
| Future Readiness | 30% | Long-term income protection, pension planning, investment concentration proxy; life plans integrated as a **separate internal planning diagnostic** |
| Financial Knowledge | 10% | Independently assessed financial questions (not lesson completions) |

Weights were selected as initial engineering assumptions, not published empirical weights. The previous 20% Future + 10% Life domain contributions have been merged into one 30% Future category; **however**, the numerical life-event score is *not averaged into the composite* at v0.2. Why: a well-funded holiday should not compensate for missing income protection or retirement preparation; an unplanned or hypothetical holiday should not degrade financial health. Confirmed future commitments alter score only when their actual cash-flow/debt effects are observed in the relevant indicators. Life plans remain active in the Future Readiness detail and recommendation engine.

## 2. Composite score

When sufficiently evidenced and with all four domains assessable:

`PULS = 0.35 × Foundation + 0.25 × Behavior + 0.30 × Future + 0.10 × Knowledge`

If a domain is genuinely not applicable after an explicit applicability review, its weight is redistributed proportionally over applicable measured domains. Unknown values are not zero. Missing domain data may yield an incomplete score or no numerical score (requires Foundation and Behavior, ≥3 months of history, ≥70% weighted indicator coverage). Domain indicators require ≥65% internal evidence. An `ASSESSABLE` state is a **technical research state**, not proof of calibration or validity. `PROVISIONAL` means important sources or context could be missing.

The v0.1 research model's explicit *non-compensability* safeguards remain: score cap 69 when accessible cash covers fewer than one month of essential expenses, and cap 60 when there is negative average cash flow plus a late bill. These are hypotheses requiring user, expert, and sensitivity testing.

## 3. Future Readiness and personal plans

**Scored long-term core** (`domains.future.score`): 45% self-reported income protection review, 45% self-reported retirement readiness review, 10% invested-portfolio concentration proxy (not applicable if not invested). These are preliminary review proxies; a provider review or policy adequacy is not established.

**Life-event diagnostic** (`domains.future.components.lifeEvents`): observed/confirmed upcoming plans with target month, approximate cost, reserved funds and planned monthly allocations. A projected coverage ratio is reported as a *planning scenario*, **not a health-score contribution**. No future plans confirmed → N/A diagnostic; no details yet → unknown, not zero. A confirmed financial goal with a clear funding gap can produce an optional scenario recommendation without changing the score automatically. Changing a plan date or adding a vacation cannot raise or lower today's Financial Health Score by itself.

This is an intentionally conservative merger: **one visible Future Readiness category, two internal analyses, one score driven by the long-term core**. Later research may test limited, non-compensating life-event signals, but only after evidence supports the construct.

## 4. Remaining domain transformations

Foundation: liquid reserve months / adjustable target (default 3); cash-flow margin `clamp(25+375*margin, 0,100)`; debt-service ratio `clamp(100-250*DSR,0,100)`; costly debt APR tiers. Weights within Foundation: 40/25/20/15.

Behavior: share of months with positive **new** net savings (55%), punctual bills (30%), no unplanned overdraft (15%). Transfers between own accounts must not be mistaken for net savings.

Knowledge: independent knowledge assessment of ≥3 items; lessons/streaks/level completion do not directly increase either Knowledge or overall PULS.

## 5. Time-series and data integrity

Every score snapshot must store method/version, date, source IDs, data coverage and intermediate domains. Do not compare v0.1 and v0.2 scores as though the change were financial improvement. Backfill prior history under v0.2 before showing a trend; connecting previously unseen existing savings is **data restatement**, not an earned score boost. No invented weekly trend. Missing external accounts, claims or debt are unknown, not zero. Unverified liquid assets do not count as verified liquidity; property and long-term investments are not emergency cash. Any transfer or financial execution is excluded from this prototype.

## 6. Recommendations and safety

Deterministic recommendation priority: complete incomplete financial picture; late bills; negative cash flow; expensive debt; insufficient accessible cash; missing protection/pension details; a *confirmed* underfunded life plan; variable saving; missing knowledge baseline. Financial context and the user's ability to act are considered. Plans are drafts only, not payments or product purchase recommendations.

## 7. Validation required

Research framework references: OECD/INFE 2026 toolkit, CFPB financial well-being scale, Financial Health Network indicators, CGAP 2026, and Roland Berger/HOFT 2025. Their validation does **not** validate the PULS weighting or the composite. Future work: calibrate against consented data; expert-review the domains and noncompensability; test missing-data fairness and age/income groups; compare with the validated CFPB subjective outcome separately; and prospectively test the recommendations.

## 8. Reproduce

`node --test score_engine.test.js` and `node generate_report.js`, then `python build_score_lab.py`.