# PULS — Financial Health (Hackathon Prototype)

**Version V19: four evidence-driven subscores.** An interactive financial health widget in a Deutsche Bank-style banking app. **Independent concept study, not an official Deutsche Bank product.**

## Live demo and deployment

Production: https://puls-rose.vercel.app

The root `index.html` is the complete standalone static app. Vercel imports the GitHub repository `tobiger33/PULS`, uses the default `main` branch, framework preset **Other**, no build command and root `./`. GitHub updates are normally built automatically by Vercel.

- `/` — PULS V19 interface and all four subscore interactions.
- `/score-lab/` — separate research scoring sandbox.
- `/research/` — scoring engine v0.2, five synthetic profiles, unit tests and methodology.

## Four scored dimensions

- **Foundation (35%)**: accessible emergency savings, free cash flow, debt service and expensive borrowing.
- **Behavior (25%)**: observed six-month saving frequency, on-time bills and unplanned overdrafts.
- **Future Readiness (30%)**: income protection, retirement preparation and investment concentration. **Life Plans are inside Future**, but guide scenario planning rather than giving or removing score points.
- **Knowledge (10%)**: short independent question assessment. Completed Wealth Guide lessons do not earn Financial Health points.

Each detail uses a consistent, no-scroll shell: diagnosis → evidence → a useful question → relevant draft/action → calculation method. The score is recomputed through a bundled, deterministic copy of `research/score_engine.js`.

## Cautions

All figures are **synthetic**; this is an **unvalidated research model** (prototype score at baseline: 72/100). Data connections are simulated; an external account can restate the baseline but is not proof of improvement. Answers and saved drafts do not execute financial actions or add points. This is not regulated investment, credit or insurance advice. The prototype does not include banking APIs, live AI, authentication, security or verified consent storage.

Read [Subscore V19 specification](docs/SUBSCORES_V19.md) and [research methodology](research/SCORING_METHODOLOGY.md).

## Local testing

```bash
node --test research/score_engine.test.js
```

All 28 research-engine unit tests passed during this version's QA. Browser checks were conducted at 1440×900, 390×844, 375×812, 320×700 and 320×568. Production readiness and scientific validation are separate work.

