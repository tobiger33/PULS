# PULS — Financial Health (Hackathon Prototype)

A **static, interactive concept prototype** of a PULS Financial Health widget embedded in a Deutsche Bank-style banking overview. **Not an official Deutsche Bank application.**

## Deploy with Vercel

1. Import the GitHub repository `tobiger33/PULS` into Vercel.
2. Set **Framework Preset** to **Other** (static HTML).
3. Set **Root Directory** to `./`.
4. Leave **Build Command** empty; use `.` as the Output Directory if Vercel asks for one.
5. Deploy. The repository's `index.html` is the landing page.

No API keys, database, package installation or build process are required to view the demo.

## Routes

- `/` — PULS V18 interactive UI, four visible financial-health dimensions.
- `/score-lab/` — separate interactive scoring research lab.
- `/research/` — documents, deterministic engine, synthetic personas, report generator and unit tests (source files).

## What's implemented

- Centered PULS score with **Foundation, Behavior, Future Readiness and Knowledge** fragments.
- **Future Readiness includes life-event planning**; life plans do not automatically improve the current score.
- Minimal subscore views with personalised demo questions and recommendations.
- Guided financial learning path and persistent AI-style input (rule-based demo, **not a live AI model**).
- Simulated bank-data source connections and plan confirmations.

## Important limitations

- **All amounts, accounts and user profiles are synthetic.**
- The UI's displayed subscores are **demo values**. Its four-domain weighted display is **not directly wired to the separate `research/score_engine.js` model**.
- The scoring engine is a preliminary research prototype, **not a validated financial-wellbeing scale**. Reference documents, weights and interpretation caveats: [Scoring methodology](research/SCORING_METHODOLOGY.md).
- There is **no real account aggregation, financial transaction execution, live AI integration or production-grade security**.
- This is not personalized investment or insurance advice.

## Reproducibility

With Node.js 20+:

```bash
node --test research/score_engine.test.js
node research/generate_report.js
```

The deterministic engine and its five synthetic profiles can be explored separately in `/score-lab/`.

## Product intent

A low-friction financial health widget that helps everyday banking users understand their position, consider plans, build financial literacy and take a next relevant step. The learning path is separate from financial-health measurement.
