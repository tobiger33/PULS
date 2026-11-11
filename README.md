# PULS — Financial Health

Expo + React + TypeScript application for web, iOS and Android. The UI is migrated from the V19 prototype without redesigning its screens, copy, styles, scoring or interactions.

Independent concept study, not an official Deutsche Bank product. Financial data and connections are synthetic. There is no backend, authentication, live AI or banking integration. Refreshing the application resets its session state.

## Run locally

Use Node.js 24 LTS (`nvm use` reads `.nvmrc`).

```sh
npm ci
npm run web -- --port 8000
```

Open `http://localhost:8000`. To start the Expo native development workflow, use `npm run ios` or `npm run android` with a compatible simulator/emulator or development build.

## Shared implementation

- `App.tsx`: Expo native/web entry and device safe areas.
- `src/components/PulsSurface.tsx`: shared React DOM surface, mounted directly on web and through Expo DOM on native.
- `src/application/`: typed application state, navigation, source/plan flows and React views.
- `src/components/EducationQuiz.tsx`: quiz presentation with three questions per level, large answers and a fixed action footer.
- `src/domain/education.ts`: answer checking, retries, independent level progress and completion guards.
- `src/data/reference-data.ts`: original questions, labels, source fixtures and financial baseline data.
- `src/styles/reference.css`: original CSS retained verbatim, followed only by host adaptations.
- `research/score_engine.js`: unchanged deterministic score engine shared by the app and research tests, with TypeScript declarations.

Native deliberately uses Expo's supported DOM component bridge (an embedded web view), rather than substituting native controls with different metrics. On phones the physical device supplies its own frame, status bar and safe areas; the lab sidebars and simulated phone frame are omitted. No remote website is required by the native bundles.

## Verify

```sh
npm run typecheck
npm test
npm run build:web
npm run build:ios
npm run build:android
```

`tests/migration.test.ts` compares rendered markup, copy, attributes and inline styles against the frozen pre-migration application for home, score details, quizzes, source consent/previews and saved plans. Education tests exercise the actual shared TypeScript controller. Native export validates the bundles; it does not replace testing on a physical iPhone/Android device.

## Reference and hosting

`reference/puls-v19.html` is the immutable pre-migration reference from commit `78415b9`. The Git branch `codex/reference-before-expo-migration` preserves that complete repository state. The reference is not executed by the new application.

Vercel builds `npm run build:web` and serves `dist/`. The build also preserves `/reference/`, `/score-lab/`, `/research/` and `/docs/`. Existing hosting: https://puls-rose.vercel.app.

The four provisional score weights remain Foundation 35%, Behavior 25%, Future Readiness 30% and Knowledge 10%. Learning progress never grants Financial Health points. See [subscores](docs/SUBSCORES_V19.md) and [methodology](research/SCORING_METHODOLOGY.md).
