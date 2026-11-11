# PULS 0.2 – synthetic test results

Generated under method **PULS-RESEARCH-0.2.0**. All amounts and personas are invented. A high score is **not** a validated diagnosis.

| Persona | PULS | Foundation | Behavior | Future | Life Event diagnostic (unscored) | Knowledge | Evidence | Primary recommendation | Range sensitivity |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Student — small budget, family support | 72.5 | 76 | 72.5 | N/A | 50 | 60 | 100% | cash_reserve | 11.9 pt |
| First salary — regular saver | 75.9 | 90.2 | 90.8 | 45.3 | 85.7 | 80 | 100% | cash_reserve | 9 pt |
| Freelancer — volatile income | 71 | 84.6 | 76.7 | 47.5 | 52.8 | 80 | 100% | cash_reserve | 8.9 pt |
| Family — expensive consumer debt | 69.1 | 69.6 | 90.8 | 53.5 | 49.6 | 60 | 100% | high_cost_debt | 8.5 pt |
| High net worth — illiquid assets | 69 | 68.3 | 100 | 93 | 34.6 | 100 | 100% | cash_reserve | 0 pt |

## What these tests demonstrate

- The student can make disciplined decisions despite low wealth.
- The first-job profile shows the effect of fairly stable income and measured saving patterns, but still has future-protection gaps.
- The freelancer needs income-sensitive recommendations rather than a rigid savings streak.
- High-cost consumer debt is prioritized for the family ahead of additional investing.
- High net worth is not the same as immediate liquidity: property and investments are not counted as accessible cash; this research model also applies an explicit, unvalidated risk cap below one month of cash reserves.

## Caution

The numbers above are primarily **engineering acceptance tests**. They establish determinism, missing-data behavior, and scenario plausibility; they cannot demonstrate psychometric validity, predictive validity or intervention effectiveness.

## Per-person detailed explanations

### Student — small budget, family support
- PULS: **72.5** (ASSESSABLE, evidence 100%).
- Money: 1.250 € verified accessible cash; 0 € non-liquid assets; 1.79 months buffer.
- Recommendation: **Build accessible reserves** — Uses accessible cash, not shares, houses or illiquid investments. Target is adjustable to personal situation.
- Weight/target sensitivity range: 66.5–78.4 (11.9 points).

### First salary — regular saver
- PULS: **75.9** (ASSESSABLE, evidence 100%).
- Money: 3.200 € verified accessible cash; 6.200 € non-liquid assets; 2.37 months buffer.
- Recommendation: **Build accessible reserves** — Uses accessible cash, not shares, houses or illiquid investments. Target is adjustable to personal situation.
- Weight/target sensitivity range: 70.3–79.3 (9 points).

### Freelancer — volatile income
- PULS: **71** (ASSESSABLE, evidence 100%).
- Money: 3.500 € verified accessible cash; 0 € non-liquid assets; 2.19 months buffer.
- Recommendation: **Build accessible reserves** — Uses accessible cash, not shares, houses or illiquid investments. Target is adjustable to personal situation.
- Weight/target sensitivity range: 65.9–74.8 (8.9 points).

### Family — expensive consumer debt
- PULS: **69.1** (ASSESSABLE, evidence 100%).
- Money: 5.600 € verified accessible cash; 15.500 € non-liquid assets; 2.33 months buffer.
- Recommendation: **Review expensive borrowing** — High interest may outweigh the expected benefit of increasing investment contributions.
- Weight/target sensitivity range: 63.7–72.2 (8.5 points).

### High net worth — illiquid assets
- PULS: **69** (ASSESSABLE, evidence 100%).
- Money: 3.200 € verified accessible cash; 1.550.000 € non-liquid assets; 0.86 months buffer.
- Recommendation: **Build accessible reserves** — Uses accessible cash, not shares, houses or illiquid investments. Target is adjustable to personal situation.
- Weight/target sensitivity range: 69–69 (0 points).

## Concrete data-reconciliation check
- First-job score before connecting an existing €7,000 account: 75.9.
- Recomputed score with formerly unseen cash: 78.8.
- Difference: 2.9 points; classification **DATA_RESTATEMENT**.
- Displayed *performance gain*: **none** (data reconciliation, not financial improvement).

## Reproducibility

`node --test score_engine.test.js` and `node generate_report.js`