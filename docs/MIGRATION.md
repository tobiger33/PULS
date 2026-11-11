# Expo migration verification

Reference: repository commit `78415b980f26bede23cbad61ea53a6d3192c2bc2`, retained byte-for-byte as `reference/puls-v19.html`.

The application now uses Expo SDK 58, React 19 and strict TypeScript. UI elements are React JSX, event handlers are React callbacks, state is typed and scoped to the application instance, and localisation runs before rendering. The runtime does not load the reference HTML, inject scripts, evaluate strings, or replace the screen through `innerHTML`.

The web and native applications share `PulsSurface`. Expo DOM supplies the embedded native web view, with locally bundled HTML/CSS/JS. Native hosting removes the simulated lab frame and status bar, and uses the device safe areas. This is a hybrid Expo application, not a replacement of each UI element with a native control.

## Automated checks

- Strict TypeScript and unused-import checks pass.
- All 39 tests pass: 28 unchanged scoring tests, 4 tests of the migrated education controller and 7 migration/reference tests.
- Reference comparisons cover home, score overview/expansion, all four subscore review/method states, relevant actions, all three education questions with feedback/completion, source consent/preview/addition, and plan parsing/preview/save.
- Original CSS is checked verbatim. Only host adaptations follow it.
- Web, iOS and Android bundle exports succeed.
- The web build retains research, score-lab, docs and reference URLs.

## Browser checks

The reference and production web build were compared in the same browser window at 758 × 973. The home screenshots were pixel-identical. The quiz retained its layout; the initial comparison identified minor text-node/kerning differences, which were corrected by combining adjacent reference text runs before rendering. Quiz navigation and the anchored footer were also exercised in the new application.

The reference parity tests compare semantic output, not React's internal component tree. Event attributes are replaced by callbacks; the legacy `data-flow-month` marker and serialized `option[selected]` are excluded because the migrated select uses a controlled value. Source consent is verified to enable the preview action.

## Limits

Native bundle export validates compilation and asset inclusion; it is not a signed application binary, simulator UI test or physical-device test. iPhone and Android device testing remains necessary before release. The application still uses synthetic data and session-only state; this migration adds no backend or live banking connection.
