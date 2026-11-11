import { createEducationController } from '../domain/education';
import { EducationQuiz } from '../components/EducationQuiz';
import {
  sampleSources,
  dimensions,
  guideStages,
  flowMonthNames,
  flowMonthAliases,
  PULS_DOMAIN_KEY,
  PULS_LABELS,
  PULS_KNOWLEDGE_QUESTIONS,
  examples,
} from '../data/reference-data';
import React, { type ReactNode } from 'react';
import * as PULSCore from '../domain/score-engine';
import { pulsEnglish } from './localization';
import { createInitialState, type SubscoreDetail } from './state';
import type { FinancialProfile, ScoreResult } from '../../research/score_engine';
import { localizeTree } from './react-tree';
export function createPulsApp(notify: () => void) {
  let toastTimer: ReturnType<typeof setTimeout>;
  const cfg = {
    size: 'regular',
    style: 'smooth',
    trend: true,
    score: true,
  };
  const st = createInitialState();
  const education = createEducationController(st, render);
  const { guideSession, openGuide } = education;
  function inlineLessonView() {
    return EducationQuiz({
      level: st.lesson ?? st.guideLevel,
      session: guideSession(st.lesson ?? st.guideLevel),
      actions: education,
    });
  }
  function hasSource(k: string) {
    return Boolean(st.sourceAssets[k]);
  }
  function measuredOverall() {
    return Math.round(pulsResult().overall ?? 0);
  } // Real deterministic research engine, still synthetic and unvalidated.
  function dimensionValue(d: { id: string }) {
    return pulsDomain(d.id).score === null ? 0 : Math.round(pulsDomain(d.id).score ?? 0);
  }
  function linkedAssetTotal() {
    return (
      13050 +
      Object.keys(st.sourceAssets)
        .filter((k) => sampleSources[k].kind !== 'liability')
        .reduce((v, k) => v + sampleSources[k].amount, 0)
    );
  }
  function linkedDebtTotal() {
    return Object.keys(st.sourceAssets)
      .filter((k) => sampleSources[k].kind === 'liability')
      .reduce((v, k) => v + sampleSources[k].amount, 0);
  }
  function openSources() {
    st.sourceUI = {
      stage: 'list',
      choice: '',
    };
    st.scoreExpanded = false;
    if (st.page !== 'overview') st.page = 'overview';
    render();
  }
  function closeSources() {
    st.sourceUI = null;
    render();
  }
  function chooseSource(id: string) {
    if (!sampleSources[id]) return;
    st.sourceUI = {
      stage: 'consent',
      choice: id,
      consented: false,
    };
    render();
  }
  function sourceConsent(value: boolean) {
    if (!st.sourceUI) return;
    st.sourceUI.consented = Boolean(value);
    render();
  }
  function sourceStep(stage: string) {
    if (!st.sourceUI) return;
    if (stage === 'preview' && !st.sourceUI.consented) return;
    st.sourceUI.stage = stage;
    render();
  }
  function addSource() {
    const ui = st.sourceUI;
    if (!ui || ui.stage !== 'preview' || !sampleSources[ui.choice]) return;
    st.sourceAssets[ui.choice] = true;
    ui.stage = 'list';
    if (ui.choice === 'cash') {
      delete st.pulsSubChoices.fitness;
      st.pulsSubStages.fitness = 'review';
    }
    render();
    toast('Demo source added. Data recalculated; no provider was contacted.');
  }
  function removeSource(id: string) {
    if (!st.sourceAssets[id]) return;
    delete st.sourceAssets[id];
    if (id === 'cash') {
      delete st.pulsSubChoices.fitness;
      st.pulsSubStages.fitness = 'review';
    }
    render();
    toast('Demo source disconnected; score re-estimated from remaining data.');
  }
  function sourceView() {
    const ui = st.sourceUI || {
        stage: 'list',
        choice: '',
      },
      src = sampleSources[ui.choice],
      keys = Object.keys(st.sourceAssets);
    if (ui.stage === 'consent')
      return (
        <section className={'v14-panel'} aria-label={'Demo source consent'}>
          <div className={'v14-eyebrow'}>{'READ-ONLY \xB7 DEMONSTRATION'}</div>
          <h2>
            {'Connect '}
            {src.name}
          </h2>
          <p className={'v14-muted'}>
            {
              'PULS would request access to your balance and relevant account information with your permission.'
            }
          </p>
          <div className={'v14-source-line'}>
            <strong>{src.type}</strong>
            <span>{src.hint}</span>
          </div>
          <p className={'v14-muted'}>
            {
              'This prototype uses fictional data. No sign-in, bank passwords or real API connection.'
            }
          </p>
          <label className={'v14-check'}>
            <input
              type={'checkbox'}
              onChange={(event) => {
                sourceConsent(event.currentTarget.checked);
              }}
            />
            {' I understand this is a simulated connection'}
          </label>
          <button
            className={'v14-primary'}
            id={'sourceConsentContinue'}
            onClick={(event) => {
              sourceStep('preview');
            }}
            disabled={!ui.consented}
          >
            {'Review sample data '}
            <span>{'\u2192'}</span>
          </button>
          <button
            className={'v14-link'}
            onClick={(event) => {
              sourceStep('list');
            }}
          >
            {'Cancel'}
          </button>
        </section>
      );
    if (ui.stage === 'preview')
      return (
        <section className={'v14-panel'} aria-label={'Review synthetic source'}>
          <div className={'v14-eyebrow'}>{'REVIEW BEFORE INCLUDING'}</div>
          <h2>{src.name}</h2>
          <p className={'v14-muted'}>{src.info}</p>
          <div className={'v14-highlight'}>
            <span>{src.type}</span>
            <strong>{euro(src.amount)}</strong>
            <small>
              {src.kind === 'accessible'
                ? 'Included in liquid reserves'
                : src.kind === 'invested'
                  ? 'Included in asset overview, not cash reserves'
                  : 'Included as a liability, not cash'}
            </small>
          </div>
          <p className={'v14-muted'}>
            {src.kind === 'accessible'
              ? 'Reserve coverage: 2.7 → 4.0 months. The illustrative fitness score would change because the underlying cash information changes.'
              : 'This connection alone earns no points. Scores remain provisional until all relevant inputs are known.'}
          </p>
          <button
            className={'v14-primary'}
            onClick={(event) => {
              addSource();
            }}
          >
            {'Include sample data '}
            <span>{'\u2192'}</span>
          </button>
          <button
            className={'v14-link'}
            onClick={(event) => {
              sourceStep('list');
            }}
          >
            {'Back'}
          </button>
        </section>
      );
    return (
      <section className={'v14-panel'} aria-label={'Financial data sources'}>
        <div className={'v14-eyebrow'}>{'FINANCIAL PICTURE \xB7 SYNTHETIC'}</div>
        <h2>{'Your money, in context.'}</h2>
        <p className={'v14-muted'}>
          {'Deutsche Bank + '}
          {keys.length}
          {' external demo '}
          {keys.length === 1 ? 'source' : 'sources'}
          {'. Missing information stays unknown, never zero.'}
        </p>
        <div className={'v14-source-line'}>
          <strong>{'Deutsche Bank'}</strong>
          <span>{'\u20AC13,050 accounts & investments \u2713'}</span>
        </div>
        <div className={'v14-source-list'}>
          {Object.entries(sampleSources).map(([id, ss]) => (
            <div className={'v14-source-line'}>
              <div>
                <strong>{ss.name}</strong>
                <small>{hasSource(id) ? ss.hint : ss.type}</small>
              </div>
              {hasSource(id) ? (
                <button
                  onClick={(event) => {
                    removeSource(id);
                  }}
                  aria-label={'' + 'Remove ' + ss.name}
                >
                  {'Remove'}
                </button>
              ) : (
                <button
                  onClick={(event) => {
                    chooseSource(id);
                  }}
                >
                  {'Connect \u2192'}
                </button>
              )}
            </div>
          ))}
        </div>
        <div className={'v14-net'}>
          <span>
            {'Visible assets: '}
            {euro(linkedAssetTotal())}
          </span>
          <span>
            {'Known liabilities: '}
            {euro(linkedDebtTotal())}
          </span>
        </div>
        <p className={'v14-note'}>
          {
            "Data coverage: partial / self-declared. Only accessible cash affects this prototype's reserve calculation. Never a reward for connecting."
          }
        </p>
        <button
          className={'v14-link'}
          onClick={(event) => {
            closeSources();
          }}
        >
          {'Back to PULS'}
        </button>
      </section>
    );
  }
  const pageHistory: string[] = [];
  function guideProgress() {
    return (
      1 +
      Number(Boolean(st.guideDone[2])) +
      Number(Boolean(st.guideDone[3])) +
      Number(Boolean(st.guideDone[4])) +
      Number(Boolean(st.guideDone[5]))
    );
  }
  function euro(n: number) {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(n);
  }
  function trend() {
    return cfg.trend ? (
      <svg className={'sparkline'} viewBox={'0 0 330 90'} preserveAspectRatio={'none'}>
        <defs>
          <linearGradient id={'grad'} x1={'0'} x2={'0'} y1={'0'} y2={'1'}>
            <stop stopColor={'#95eef0'} stopOpacity={'.65'}></stop>
            <stop offset={'1'} stopColor={'#95eef0'} stopOpacity={'0'}></stop>
          </linearGradient>
        </defs>
        <path
          d={
            'M0 72 C28 70 38 66 62 67 S112 65 135 56 S182 62 205 46 S247 51 270 33 S301 40 330 18 L330 90 L0 90Z'
          }
          fill={'url(#grad)'}
        ></path>
        <path
          d={'M0 72 C28 70 38 66 62 67 S112 65 135 56 S182 62 205 46 S247 51 270 33 S301 40 330 18'}
          fill={'none'}
          stroke={'#91eff2'}
          strokeWidth={'2.3'}
        ></path>
      </svg>
    ) : (
      ''
    );
  }
  function bankLogo() {
    return (
      <>
        <span className={'dbicon'}></span>
        {' Deutsche Bank'}
      </>
    );
  }
  function bottomBar() {
    return (
      <div className={'homenav'}>
        <button className={'active'}>
          <b>{'\u2302'}</b>
          {'\xDCbersicht'}
        </button>
        <button
          onClick={(event) => {
            toast('Zahlungen sind nicht Teil des Prototyps');
          }}
        >
          <b>{'\u2194'}</b>
          {'Zahlungen'}
        </button>
        <button
          onClick={(event) => {
            toast('Depot-Demo nicht implementiert');
          }}
        >
          <b>{'\u25A5'}</b>
          {'Investieren'}
        </button>
        <button
          onClick={(event) => {
            toast('Profil-Demo nicht implementiert');
          }}
        >
          <b>{'\u263B'}</b>
          {'Profil'}
        </button>
      </div>
    );
  }
  function header() {
    return (
      <div className={'puls-header'}>
        <button
          className={'back'}
          onClick={(event) => {
            back();
          }}
          aria-label={'Zur\xFCck'}
          title={'Zur\xFCck'}
        >
          {'\u2190'}
        </button>
        <strong>{'Deutsche Bank'}</strong>
        <button
          className={'xbtn'}
          onClick={(event) => {
            openSources();
          }}
          aria-label={'Manage financial data sources'}
          title={'Financial data sources'}
        >
          {'\u229E'}
        </button>
      </div>
    );
  }
  function home() {
    return (
      <section className={'phone-section'}>
        <div className={'app-top'}>
          <div className={'brandline'}>
            {bankLogo()}
            <button
              className={'roundbtn'}
              onClick={(event) => {
                toast('Demo: keine Benachrichtigungen');
              }}
            >
              {'\u2667'}
            </button>
          </div>
          <h2>{'Hallo, Lena.'}</h2>
          <p>{'Mittwoch, 11. November'}</p>
        </div>
        <div className={'homebody'}>
          <div>
            <div className={'balance-label'}>{'GESAMT\xDCBERSICHT'}</div>
            <div className={'total'}>{'13.050 \u20AC'}</div>
            <div className={'sub'}>{'Deine Konten und Depots im \xDCberblick'}</div>
          </div>
          <div className={'account-mini'}>
            <div>
              {'Girokonto'}
              <strong>{'4.850 \u20AC'}</strong>
            </div>
            <div>
              {'Depot'}
              <strong>{'8.200 \u20AC'}</strong>
            </div>
          </div>
          <div className={'labelrow'}>
            <span className={'mainlabel'}>{'F\xFCr dich'}</span>
            <small>{'Pers\xF6nliche Einblicke'}</small>
          </div>
          <button
            className={'' + 'puls-widget ' + (cfg.size === 'compact' ? 'compact' : '')}
            onClick={(event) => {
              go('overview');
            }}
            aria-label={'PULS Financial Health \xF6ffnen'}
          >
            {trend()}
            <div className={'wtop'}>
              <span>{'\u25C9 \xA0PULS \xB7 Financial Health'}</span>
              <span
                style={{
                  opacity: '.75',
                }}
              >
                {'\u2197'}
              </span>
            </div>
            <div className={'wmain'}>
              {cfg.score ? (
                <span className={'widgetscore'}>
                  {measuredOverall()}
                  <small>{'/100'}</small>
                </span>
              ) : (
                <span
                  className={'widgetscore'}
                  style={{
                    fontSize: '22px',
                  }}
                >
                  {'Dein PULS'}
                </span>
              )}
              <div className={'wtext'}>
                {hasSource('cash')
                  ? 'Additional savings included.'
                  : st.verified
                    ? 'Deine Notreserve ist vollständig.'
                    : 'Du baust finanzielle Stabilität auf.'}
                <br />
                <span
                  style={{
                    color: '#fff',
                    fontWeight: '700',
                  }}
                >
                  {hasSource('cash')
                    ? 'Financial picture updated'
                    : st.verified
                      ? 'Simulation reviewed'
                      : '1 next step available'}
                </span>
              </div>
            </div>
            <div className={'wbottom'}>
              <span className={'weekly'}>
                {cfg.trend
                  ? '+0.8 this week ↗'
                  : st.verified
                    ? 'Aktualisierte Demo-Bewertung'
                    : 'Provisional baseline · demo'}
              </span>
              <span className={'open'}>{'Details \xF6ffnen \u2192'}</span>
            </div>
          </button>
          <div className={'other-row'}>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <span className={'other-icon'}>{'\u25A4'}</span>
              <span>
                {'FinanzPlaner'}
                <br />
                <small>{'Einnahmen & Ausgaben'}</small>
              </span>
            </span>
            <span>{'\u203A'}</span>
          </div>
          <div className={'other-row'}>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <span className={'other-icon'}>{'\u25EB'}</span>
              <span>
                {'Karten & Services'}
                <br />
                <small>{'Alle Funktionen'}</small>
              </span>
            </span>
            <span>{'\u203A'}</span>
          </div>
          <div className={'grow'}></div>
        </div>
        {bottomBar()}
      </section>
    );
  }
  function overview() {
    const active = dimensions.find((d) => d.id === st.selected) || dimensions[0];
    const val = st.detailMode ? dimensionValue(active) : measuredOverall();
    const leftDims = ['fitness', 'behavior'].map((id) => dimensions.find((d) => d.id === id)!);
    const rightDims = ['future', 'literacy'].map((id) => dimensions.find((d) => d.id === id)!);
    const side = (dims: typeof dimensions, sideName: string) => (
      <div
        className={'' + 'score-wings ' + sideName}
        aria-hidden={st.scoreExpanded ? 'false' : 'true'}
      >
        {dims.map((d) => (
          <button
            type={'button'}
            tabIndex={st.scoreExpanded ? 0 : -1}
            className={'score-wing'}
            onClick={(event) => {
              selectDim(d.id);
            }}
            aria-label={'' + d.name + ': ' + dimensionValue(d) + ' von 100'}
          >
            <span>{PULS_LABELS[d.id]}</span>
            <b>{dimensionValue(d)}</b>
          </button>
        ))}
      </div>
    );
    return (
      <section className={'phone-section'}>
        {header()}
        <div className={'puls-experience'}>
          {'\n    '}
          {!st.lesson ? (
            <div
              className={
                '' +
                'sticky-score ' +
                (!st.detailMode && st.scoreExpanded ? 'expanded' : '') +
                ' ' +
                (st.detailMode ? 'detail-focus' : '')
              }
            >
              {'\n      '}
              <div className={'score-assembly'}>
                {'\n        '}
                {st.detailMode ? (
                  <div
                    className={'score-trigger score-static'}
                    role={'img'}
                    aria-label={'' + active.name + ': ' + val + ' von 100 Punkten'}
                  >
                    {'\n          '}
                    <div
                      className={'large-ring'}
                      style={
                        {
                          '--pct': val,
                        } as React.CSSProperties
                      }
                    >
                      <span className={'score-ring-piece whole-ring'}></span>
                      <span className={'large-ring-inner'}>
                        <b>{val}</b>
                        <small>{'von 100'}</small>
                      </span>
                    </div>
                    {'\n          '}
                    <span className={'score-toggle-label'}>{active.name}</span>
                    {'\n        '}
                  </div>
                ) : (
                  <>
                    {side(leftDims, 'left')}
                    {'\n        '}
                    <button
                      className={'score-trigger'}
                      type={'button'}
                      onClick={(event) => {
                        toggleScoreDetails();
                      }}
                      aria-expanded={Boolean(st.scoreExpanded)}
                      aria-label={
                        '' +
                        'Financial Health Score ' +
                        val +
                        ' von 100, vier Unterbewertungen ' +
                        (st.scoreExpanded ? 'schließen' : 'anzeigen')
                      }
                    >
                      {'\n          '}
                      <div
                        className={'large-ring'}
                        style={
                          {
                            '--pct': val,
                          } as React.CSSProperties
                        }
                      >
                        <span className={'score-ring-piece left-half'}></span>
                        <span className={'score-ring-piece right-half'}></span>
                        <span className={'large-ring-inner'}>
                          <b>{val}</b>
                          <small>{'von 100'}</small>
                        </span>
                      </div>
                      {'\n          '}
                      <span className={'score-toggle-label'}>
                        {st.scoreExpanded
                          ? 'Teilbewertungen schließen'
                          : 'Tippen für Teilbewertungen'}
                        {' \u2194'}
                      </span>
                      {'\n        '}
                    </button>
                    {'\n        '}
                    {side(rightDims, 'right')}
                    {'\n'}
                  </>
                )}
                {'\n      '}
              </div>
              {'\n    '}
            </div>
          ) : (
            ''
          )}
          {'\n    '}
          {st.sourceUI ? (
            sourceView()
          ) : st.lesson ? (
            inlineLessonView()
          ) : st.inputFlow ? (
            inlineInputView()
          ) : st.detailMode ? (
            recommendationView()
          ) : (
            <div
              className={'journey-scroll'}
              ref={(element) => {
                if (element)
                  element.scrollTop =
                    st.journeyPosition === null
                      ? element.scrollHeight - element.clientHeight
                      : st.journeyPosition;
              }}
              aria-label={'Wealth Journey: Level 1 unten, Level 5 oben; nach oben scrollen'}
              onScroll={(event) => {
                st.journeyPosition = event.currentTarget.scrollTop;
              }}
            >
              {'\n      '}
              <div className={'journey-world'}>
                {'\n        '}
                <svg
                  className={'journey-road'}
                  viewBox={'0 0 360 935'}
                  preserveAspectRatio={'none'}
                  aria-hidden={'true'}
                >
                  {'\n          '}
                  <path
                    className={'road-shadow'}
                    d={
                      'M48 830 C45 747 316 752 316 655 S48 565 48 480 S316 390 316 305 S48 212 48 130'
                    }
                  ></path>
                  {'\n          '}
                  <path
                    className={'road-inner'}
                    d={
                      'M48 830 C45 747 316 752 316 655 S48 565 48 480 S316 390 316 305 S48 212 48 130'
                    }
                  ></path>
                  {'\n        '}
                </svg>
                {'\n        '}
                {[...guideStages].reverse().map((g) => {
                  const isDone = Boolean(st.guideDone[g.n]),
                    current = !isDone && g.n === Math.min(5, guideProgress() + 1);
                  return (
                    <button
                      className={
                        '' +
                        'journey-stage ' +
                        (g.n % 2 ? 'left' : 'right') +
                        ' ' +
                        (isDone ? 'done' : current ? 'current' : 'upcoming')
                      }
                      data-step={g.n}
                      onClick={(event) => {
                        openGuide(g.n);
                      }}
                      aria-label={
                        '' +
                        'Level ' +
                        g.n +
                        ': ' +
                        g.title +
                        (current ? ', dein nächster Schritt' : '')
                      }
                    >
                      <span className={'stage-node'}>{isDone ? '✓' : g.n}</span>
                      <span className={'stage-copy'}>
                        <b>{g.title}</b>
                        <small>{g.sub}</small>
                        {current ? (
                          <em>{'Jetzt verbessern \u2197'}</em>
                        ) : isDone ? (
                          <em>{'Abgeschlossen \u2713'}</em>
                        ) : (
                          ''
                        )}
                      </span>
                    </button>
                  );
                })}
                {'\n      '}
              </div>
              {'\n    '}
            </div>
          )}
          {'\n    '}
          {!st.lesson ? (
            <div className={'coach-composer'}>
              <form
                onSubmit={(event) => {
                  submitComposer(event);
                }}
              >
                <input
                  id={'pulseComposer'}
                  aria-label={'Pers\xF6nlichen Plan eingeben'}
                  maxLength={240}
                  autoComplete={'off'}
                  placeholder={'Was steht bei dir an? Urlaub, Umzug \u2026'}
                  value={st.composerText}
                  onChange={(event) => {
                    st.composerText = event.currentTarget.value;
                    syncComposerButton(event.currentTarget);
                  }}
                />
                <button
                  className={'composer-send'}
                  type={'submit'}
                  aria-label={'Nachricht senden'}
                  {...(st.composerText.trim()
                    ? {}
                    : {
                        disabled: true,
                      })}
                >
                  <svg
                    viewBox={'0 0 24 24'}
                    fill={'none'}
                    stroke={'white'}
                    strokeWidth={'2.5'}
                    strokeLinecap={'round'}
                    strokeLinejoin={'round'}
                  >
                    <path d={'M12 19V5 M5 12l7-7 7 7'}></path>
                  </svg>
                </button>
              </form>
            </div>
          ) : (
            ''
          )}
          {'\n  '}
        </div>
      </section>
    );
  }
  function toggleScoreDetails() {
    if (st.detailMode) return;
    st.scoreExpanded = !st.scoreExpanded;
    render();
  }
  function syncComposerButton(input: HTMLInputElement) {
    st.composerText = input.value;
    render();
  }
  function submitComposer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = st.composerText.trim();
    if (!message) return;
    st.composerText = '';
    st.scoreExpanded = false;
    st.inputFlow = interpretInput(message);
    render();
  }

  // V13: inline, rule-based demonstration only. Nothing is written or executed before confirmation.

  function flowCurrencyNumber(raw: string) {
    const t = String(raw)
      .replace(/\u00a0/g, ' ')
      .trim()
      .replace(/\s+/g, '');
    if (!t) return null;
    const lastComma = t.lastIndexOf(','),
      lastDot = t.lastIndexOf('.');
    const last = Math.max(lastComma, lastDot);
    const tail = last >= 0 ? t.slice(last + 1) : '';
    if (last >= 0 && tail.length === 2 && /\d/.test(tail)) {
      const dec = Number(t.slice(0, last).replace(/[^0-9]/g, '')) + Number(tail) / 100;
      return Number.isFinite(dec) ? dec : null;
    }
    const cleaned = Number(t.replace(/[^0-9]/g, ''));
    return Number.isFinite(cleaned) ? cleaned : null;
  }
  function extractAmount(text: string) {
    // Require an explicit currency indication or an amount in a financial phrase.
    // Accept €1,500 / 1.500 € / EUR 1 500 / 1500 euros. Never parse a year as a budget.
    const patterns = [
      /(?:€|\beur(?:o|os)?\b)\s*([0-9]+(?:[\s.,][0-9]{3})*(?:[.,][0-9]{2})?)/gi,
      /([0-9]+(?:[\s.,][0-9]{3})*(?:[.,][0-9]{2})?)\s*(?:€|\beur(?:o|os)?\b)/gi,
      /(?:budget|costs?|costing|spend|spending|for|around|about|roughly|approximately|ungefähr|etwa|für|kostet)\s+(?:of\s+|up to\s+)?([0-9]+(?:[\s.,][0-9]{3})*(?:[.,][0-9]{2})?)/gi,
    ];
    for (const re of patterns) {
      let m;
      while ((m = re.exec(text)) !== null) {
        const n = flowCurrencyNumber(m[1]);
        if (n !== null && n > 0 && !(n >= 2020 && n <= 2100 && !/[€]|eur/i.test(m[0])))
          return Math.round(n);
      }
    }
    return null;
  }
  function extractMonth(text: string) {
    const r =
      /\b(january|jan|february|feb|march|mar|märz|maerz|april|apr|may|mai|june|jun|july|jul|august|aug|september|sept|sep|october|oct|oktober|okt|november|nov|december|dec|dezember|dez)\b(?:\s+(?:of\s+)?(20\d{2}))?/i;
    const m = text.match(r);
    if (!m)
      return {
        key: '',
        assumed: false,
      };
    const mm = flowMonthAliases[m[1].toLowerCase()];
    if (!mm)
      return {
        key: '',
        assumed: false,
      };
    // Prototype reference date: November 2026. If year omitted, next occurrence is assumed, flagged.
    const assumed = !m[2];
    let y = m[2] ? Number(m[2]) : mm <= 11 ? 2027 : 2026;
    return {
      key: y + '-' + String(mm).padStart(2, '0'),
      assumed,
    };
  }
  function detectFlowKind(text: string) {
    const low = text.toLowerCase();
    if (
      /^\s*(can|could|should|how|why|what|when|where|is|are|will|would|do|does|am i|do i|can i|wie|kann|soll|was|warum)\b/i.test(
        text,
      ) ||
      text.includes('?')
    )
      return 'question';
    if (/vacation|holiday|trip|travel|urlaub|reise/.test(low)) return 'vacation';
    if (/mov(e|ing)|relocat|apartment|wohnung|umzug|auszieh|new flat|rent a place/.test(low))
      return 'moving';
    if (
      /start\s+(a\s+)?business|startup|self.employ|self employment|freelanc|selbst.st.nd|gr.nd/.test(
        low,
      )
    )
      return 'business';
    if (/car|vehicle|auto|purchase|kauf|buy a/.test(low)) return 'purchase';
    if (
      /raise|promotion|salary|pay increase|bonus|gehalt|income change|new job|i (?:will|am going to) earn/.test(
        low,
      )
    )
      return 'information';
    return 'information';
  }
  function interpretInput(text: string) {
    const kind = detectFlowKind(text);
    const amt = extractAmount(text),
      date = extractMonth(text);
    return {
      stage: kind === 'question' ? 'answer' : 'review',
      kind,
      original: text,
      amount: amt === null ? '' : String(amt),
      month: date.key,
      assumedMonth: date.assumed,
      validation: '',
      confirmed: false,
    };
  }
  function monthLabel(key: string) {
    if (!/^20\d{2}-(0[1-9]|1[0-2])$/.test(key || '')) return 'Not specified';
    const [year, month] = key.split('-').map(Number);
    return flowMonthNames[month - 1] + ' ' + year;
  }
  function monthOptions() {
    const options = [
      <option key="empty" value="">
        Choose month
      </option>,
    ];
    for (let year = 2026; year <= 2029; year++)
      for (let month = 1; month <= 12; month++) {
        if (year === 2026 && month <= 11) continue;
        const key = year + '-' + String(month).padStart(2, '0');
        options.push(
          <option key={key} value={key}>
            {monthLabel(key)}
          </option>,
        );
      }
    return options;
  }
  function flowName(kind: string) {
    return (
      {
        vacation: 'Vacation',
        moving: 'Moving',
        business: 'Starting a business',
        purchase: 'Major purchase',
        information: 'Personal update',
        question: 'Your question',
      }[kind] || 'Personal update'
    );
  }
  function flowSetAmount(value: string) {
    if (!st.inputFlow) return;
    st.inputFlow.amount = value;
    st.inputFlow.validation = '';
    render();
  }
  function flowSetMonth(value: string) {
    if (!st.inputFlow) return;
    st.inputFlow.month = value;
    st.inputFlow.assumedMonth = false;
    st.inputFlow.validation = '';
    render();
  }
  function flowCancel() {
    st.inputFlow = null;
    render();
  }
  function flowConfirm() {
    const f = st.inputFlow;
    if (!f || f.stage !== 'review') return;
    if (f.kind !== 'information') {
      const n = Number(f.amount);
      if (!Number.isFinite(n) || n <= 0 || n > 10000000) {
        f.validation = 'Enter a realistic budget before we calculate.';
        render();
        return;
      }
      if (!f.month) {
        f.validation = 'Choose a target month.';
        render();
        return;
      }
    }
    f.validation = '';
    if (f.kind === 'information') {
      saveFlowRecord();
      f.stage = 'saved';
    } else {
      f.stage = 'result';
    }
    render();
  }
  function saveFlowRecord() {
    const f = st.inputFlow;
    if (!f) return;
    const record = {
      type: flowName(f.kind),
      kind: f.kind,
      description: f.original,
      amount: f.amount === '' ? null : Number(f.amount),
      month: f.month ? monthLabel(f.month) : null,
    };
    const idx =
      typeof f.recordIndex === 'number'
        ? f.recordIndex
        : st.contextEntries.findIndex((x) => x.kind === f.kind);
    if (idx >= 0) {
      st.contextEntries[idx] = record;
      f.recordIndex = idx;
    } else {
      f.recordIndex = st.contextEntries.push(record) - 1;
    }
    if (f.kind !== 'information') {
      st.goal = record;
      st.goalSaved = true;
      delete st.microChoices.life;
      st.microStages.life = 'question';
    }
    f.stage = 'saved';
  }
  function flowSave() {
    const f = st.inputFlow;
    if (!f || f.stage !== 'result') return;
    saveFlowRecord();
    render();
  }
  function flowEdit() {
    if (!st.inputFlow) return;
    st.inputFlow.stage = 'review';
    render();
  }
  function flowTurnIntoPlan() {
    const f = st.inputFlow;
    if (!f) return;
    const low = f.original.toLowerCase();
    const detected = /vacation|holiday|trip|travel|urlaub|reise/.test(low)
      ? 'vacation'
      : /mov(e|ing)|relocat|apartment|wohnung|umzug/.test(low)
        ? 'moving'
        : /business|startup|gründ|selbst/.test(low)
          ? 'business'
          : /car|vehicle|purchase|buy|auto/.test(low)
            ? 'purchase'
            : null;
    if (detected) {
      flowChoosePlan(detected);
      return;
    }
    f.stage = 'selectPlan';
    render();
  }
  function flowChoosePlan(kind: string) {
    const f = st.inputFlow;
    if (!f || !['vacation', 'moving', 'business', 'purchase'].includes(kind)) return;
    f.kind = kind;
    f.stage = 'review';
    f.validation = '';
    render();
  }
  function flowScenarioNote(kind: string) {
    if (kind === 'moving')
      return 'Not yet included: rent changes, deposits or ongoing bills. Add those details before treating the preview as an affordability assessment.';
    if (kind === 'purchase')
      return 'Purchase price only. Insurance, maintenance, financing costs and taxes are not yet included.';
    if (kind === 'business')
      return 'One-off startup budget only. Business revenue and personal living-cost runway are not forecast.';
    return 'This preview assumes no savings have already been set aside specifically for this trip.';
  }
  function flowMonthsUntil(key: string) {
    const [y, m] = key.split('-').map(Number);
    return Math.max(1, (y - 2026) * 12 + m - 11);
  }
  function flowAnswer(text: string) {
    const low = text.toLowerCase();
    if (/reserve|emergency|buffer|notgroschen/.test(low))
      return 'In this synthetic snapshot, the reserve calculation uses accessible cash divided by essential monthly spending. If you have more savings elsewhere, link or add them before relying on this assessment.';
    if (/score|health|puls/.test(low))
      return 'Your score is an illustrative, unvalidated model. Tap the score to explore the four categories. Missing external assets or liabilities could change the result.';
    if (/afford|buy|cost|rent|housing|car|vacation|trip|move|urlaub/.test(low))
      return 'To assess affordability, PULS needs your estimated cost and timing, plus a complete view of accounts, debts and ongoing expenses. Add it as a plan to explore a simple scenario.';
    return 'This prototype has no live AI model. PULS would answer using your confirmed context and available financial data, and ask a follow-up when key information is missing.';
  }
  function inlineInputView() {
    const f = st.inputFlow;
    if (!f) return '';
    const isPlan = !['information', 'question'].includes(f.kind);
    let body: ReactNode = '';
    if (f.stage === 'review') {
      const editPlan = isPlan;
      body = (
        <>
          <div className={'flow-kicker'}>
            {editPlan ? 'REVIEW YOUR PLAN' : 'REVIEW THIS UPDATE'}
          </div>
          {'\n     '}
          <h2 className={'flow-title'}>
            {editPlan
              ? 'Let’s plan your ' + flowName(f.kind).toLowerCase() + '.'
              : 'Add this to your financial context?'}
          </h2>
          {'\n     '}
          <p className={'flow-summary'}>{f.original}</p>
          {'\n     '}
          {editPlan ? (
            <>
              <div className={'flow-fields'}>
                {'\n       '}
                <label className={'flow-field'}>
                  <span>{'Estimated budget'}</span>
                  <div className={'flow-currency'}>
                    <span>{'\u20AC'}</span>
                    <input
                      type={'number'}
                      min={'1'}
                      max={'10000000'}
                      step={'1'}
                      inputMode={'decimal'}
                      aria-label={'Estimated budget in euros'}
                      value={f.amount}
                      placeholder={'Amount'}
                      onChange={(event) => {
                        flowSetAmount(event.currentTarget.value);
                      }}
                    />
                  </div>
                </label>
                {'\n       '}
                <label className={'flow-field'}>
                  <span>{'When?'}</span>
                  <select
                    aria-label={'Target month'}
                    onChange={(event) => {
                      flowSetMonth(event.currentTarget.value);
                    }}
                    value={f.month}
                  >
                    {monthOptions()}
                  </select>
                </label>
                {'\n     '}
              </div>
              {'\n     '}
              {f.assumedMonth ? (
                <div className={'flow-assumption'}>
                  {'We assumed the next occurrence of this month. Please confirm.'}
                </div>
              ) : (
                ''
              )}
            </>
          ) : (
            <div className={'flow-info-notice'}>
              {
                'This information will be included in your planning context. It won\u2019t change your score or trigger a financial action.'
              }
            </div>
          )}
          {'\n     '}
          <div className={'flow-validation'} role={'alert'}>
            {f.validation || ''}
          </div>
          {'\n     '}
          <button
            className={'flow-primary'}
            type={'button'}
            onClick={(event) => {
              flowConfirm();
            }}
          >
            {editPlan ? 'Calculate preview' : 'Save this update'} <span>{'\u2192'}</span>
          </button>
          {'\n     '}
          <button
            className={'flow-quiet'}
            type={'button'}
            onClick={(event) => {
              flowCancel();
            }}
          >
            {'Cancel'}
          </button>
        </>
      );
    } else if (f.stage === 'selectPlan') {
      body = (
        <>
          <div className={'flow-kicker'}>{'CHOOSE A SCENARIO'}</div>
          <h2 className={'flow-title'}>{'What would you like to explore?'}</h2>
          <p className={'flow-help'}>
            {'Select a goal; nothing will be saved unless you ask PULS to save it.'}
          </p>
          <div className={'v14-options'}>
            {[
              ['vacation', 'Vacation'],
              ['moving', 'Moving'],
              ['purchase', 'A car or purchase'],
              ['business', 'Starting a business'],
            ].map(([k, l]) => (
              <button
                className={'v14-choice'}
                onClick={(event) => {
                  flowChoosePlan(k);
                }}
              >
                {l}
                <span>{'\u203A'}</span>
              </button>
            ))}
          </div>
          <button
            className={'flow-quiet'}
            onClick={(event) => {
              flowCancel();
            }}
          >
            {'Cancel'}
          </button>
        </>
      );
    } else if (f.stage === 'answer') {
      body = (
        <>
          <div className={'flow-kicker'}>{'PULS COACH \xB7 DEMO'}</div>
          <h2 className={'flow-title'}>{'Your question'}</h2>
          {'\n    '}
          <p className={'flow-summary'}>{f.original}</p>
          <p className={'flow-response'}>{flowAnswer(f.original)}</p>
          {'\n    '}
          <div className={'flow-actions'}>
            <button
              type={'button'}
              className={'flow-primary'}
              onClick={(event) => {
                flowTurnIntoPlan();
              }}
            >
              {'Explore a plan '}
              <span>{'\u2192'}</span>
            </button>
            <button
              type={'button'}
              className={'flow-quiet'}
              onClick={(event) => {
                flowCancel();
              }}
            >
              {'Close'}
            </button>
          </div>
        </>
      );
    } else if (f.stage === 'result' && isPlan) {
      const amount = Number(f.amount),
        months = flowMonthsUntil(f.month),
        monthly = Math.ceil(amount / months),
        cash = 3600,
        after = Math.max(0, cash - amount);
      body = (
        <>
          <div className={'flow-kicker'}>{'PLAN PREVIEW \xB7 NOT SAVED'}</div>
          {'\n   '}
          <h2 className={'flow-title'}>
            {flowName(f.kind)}
            {' \xB7 '}
            {monthLabel(f.month)}
          </h2>
          {'\n   '}
          <div className={'flow-figure'}>
            {euro(monthly)} <span>{'/ month'}</span>
          </div>
          {'\n   '}
          <p className={'flow-help'}>
            {'Illustrative target over '}
            {months}
            {' month'}
            {months === 1 ? '' : 's'}
            {'. '}
            {flowScenarioNote(f.kind)}
          </p>
          {'\n   '}
          <div className={'flow-metric'}>
            <span>{'Your planned budget'}</span>
            <strong>{euro(amount)}</strong>
          </div>
          {'\n   '}
          <div className={'flow-metric'}>
            <span>{'Emergency cash if paid entirely from savings'}</span>
            <strong>{euro(after)}</strong>
          </div>
          {'\n   '}
          <p className={'flow-footnote'}>
            {
              'This is a preview only. No plan has been saved. Separate planned spending from emergency cash where possible. Your score is unchanged.'
            }
          </p>
          {'\n   '}
          <div className={'flow-actions'}>
            <button
              className={'flow-primary'}
              type={'button'}
              onClick={(event) => {
                flowSave();
              }}
            >
              {'Save plan draft '}
              <span>{'\u2192'}</span>
            </button>
            <button
              className={'flow-quiet'}
              type={'button'}
              onClick={(event) => {
                flowEdit();
              }}
            >
              {'Adjust'}
            </button>
            <button
              className={'flow-quiet'}
              type={'button'}
              onClick={(event) => {
                flowCancel();
              }}
            >
              {'Discard preview'}
            </button>
          </div>
        </>
      );
    } else if (f.stage === 'saved' && isPlan) {
      body = (
        <>
          <div className={'flow-kicker'}>{'DRAFT SAVED \xB7 DEMO ONLY'}</div>
          <h2 className={'flow-title'}>
            {flowName(f.kind)}
            {' added to Life Events.'}
          </h2>
          <p className={'flow-response'}>
            {euro(Number(f.amount))}
            {' planned for '}
            {monthLabel(f.month)}
            {'.'}
          </p>
          <p className={'flow-help'}>
            {
              'This plan is now part of your future scenarios. No funds moved and your current score has not changed.'
            }
          </p>
          <button
            className={'flow-primary'}
            type={'button'}
            onClick={(event) => {
              flowCancel();
            }}
          >
            {'Return to PULS '}
            <span>{'\u2192'}</span>
          </button>
          <button
            className={'flow-quiet'}
            type={'button'}
            onClick={(event) => {
              flowEdit();
            }}
          >
            {'Edit saved draft'}
          </button>
        </>
      );
    } else {
      body = (
        <>
          <div className={'flow-kicker'}>{'UPDATE SAVED \xB7 DEMO ONLY'}</div>
          <h2 className={'flow-title'}>{'Context updated.'}</h2>
          {'\n      '}
          <p className={'flow-response'}>{f.original}</p>
          {'\n      '}
          <p className={'flow-help'}>
            {
              'This note is saved in your demo planning context. No account data or score was changed.'
            }
          </p>
          {'\n      '}
          <button
            className={'flow-primary'}
            type={'button'}
            onClick={(event) => {
              flowCancel();
            }}
          >
            {'Return to PULS '}
            <span>{'\u2192'}</span>
          </button>
        </>
      );
    }
    return (
      <section
        className={'flow-inline'}
        aria-label={'Personalised PULS input, without page navigation'}
      >
        <div className={'flow-inner'} aria-live={'polite'}>
          {body}
        </div>
      </section>
    );
  }
  function setDemoContext(which: string) {
    if (!['regular', 'variable', 'moving'].includes(which)) return;
    st.demoContext = which;
    // Keep the original demo scores; only the conversation changes.
    // Old choices cannot silently transfer to a different financial situation.
    st.microChoices = {};
    st.microStages = {};
    st.microSaved = {};
    st.microWhy = {};
    st.pulsSubChoices = {};
    st.pulsSubStages = {};
    st.pulsSubDrafts = {};
    st.selected = which === 'variable' ? 'behavior' : which === 'moving' ? 'future' : 'fitness';
    st.page = 'overview';
    st.detailMode = true;
    st.scoreExpanded = false;
    st.actionExpanded = false;
    pageHistory.length = 0;
    pageHistory.push('home');
    render();
  }
  function pulsProfile(): FinancialProfile {
    const ns = [150, 0, 225, 170, 0, 220],
      funds = [
        {
          id: 'db-current',
          kind: 'current',
          balance: 4850,
          liquid: true,
          verified: true,
        },
        {
          id: 'db-investments',
          kind: 'investment',
          balance: 8200,
          liquid: false,
          verified: true,
        },
      ];
    if (hasSource('cash'))
      funds.push({
        id: 'demo-other-cash',
        kind: 'savings',
        balance: 2400,
        liquid: true,
        verified: true,
      });
    if (hasSource('broker'))
      funds.push({
        id: 'demo-other-portfolio',
        kind: 'investment',
        balance: 8200,
        liquid: false,
        verified: true,
      });
    const debts = hasSource('loan')
      ? [
          {
            id: 'demo-loan',
            balance: 4500,
            monthlyPayment: 155,
            apr: null,
          },
        ]
      : [];
    const goals = st.contextEntries
      .filter((x) => x && x.amount !== null && x.amount > 0 && x.month && x.kind !== 'information')
      .map((x, i) => {
        const dt = String(x.month).match(
          /(January|February|March|April|May|June|July|August|September|October|November|December)\s+(20\d{2})/i,
        );
        const mm = dt
          ? String(
              [
                'january',
                'february',
                'march',
                'april',
                'may',
                'june',
                'july',
                'august',
                'september',
                'october',
                'november',
                'december',
              ].indexOf(dt[1].toLowerCase()) + 1,
            ).padStart(2, '0')
          : null;
        return {
          label: x.type || 'Plan',
          targetMonth: mm && dt ? dt[2] + '-' + mm : null,
          cost: x.amount ?? 0,
          reserved: null,
          monthlyAllocation: null,
        };
      });
    return {
      id: 'lena-synthetic',
      asOf: '2026-11-11',
      lifeStage: 'first_job',
      accounts: funds,
      debts,
      accountsReviewed: true,
      debtsReviewed: true,
      financialPictureReviewed: false,
      months: ns.map((n, i) => ({
        month: `2026-${String(i + 5).padStart(2, '0')}`,
        income: 2700,
        essential: 1800,
        discretionary: 700,
        netSaving: n,
        billsDue: 6,
        billsLate: 0,
        unplannedOverdraft: false,
      })),
      future: {
        incomeProtection: 'reviewed_partial',
        retirementPlan: 'started_no_review',
        invested: true,
        largestHoldingShare: 0.75,
      },
      goals,
      noUpcomingGoalsConfirmed: false,
      knowledge: st.pulsKnowledgeResult || {
        attempted: 5,
        correct: 4,
        independentAssessment: true,
      },
    };
  }
  function pulsResult() {
    return PULSCore.computeScore(pulsProfile());
  }
  function pulsNice(v: number | null | undefined, unit = '') {
    return v === null || v === undefined ? 'Not assessed' : String(Math.round(v * 10) / 10) + unit;
  }
  function pulsDomain(id: string) {
    return pulsResult().domains[PULS_DOMAIN_KEY[id] || 'foundation'];
  }
  function pulsObservedMonths() {
    return pulsProfile().months.filter((x) => x.netSaving > 0).length;
  }
  function pulsDetail(id: string): SubscoreDetail {
    const p = pulsResult(),
      m = p.metrics,
      d = p.domains[PULS_DOMAIN_KEY[id]],
      s = d.score;
    if (id === 'fitness') {
      const target = p.context.reserveTargetMonths || 3,
        months = m.emergencyMonths,
        shortfall = Math.max(0, target * m.essential - m.cash.verifiedLiquid);
      return {
        eyebrow: 'LIQUIDITY · SIX-MONTH BASELINE',
        headline:
          months >= target
            ? 'Your accessible reserve meets the reference.'
            : 'Your reserve is close to the reference.',
        description: 'A liquidity check using cash you can access, not your investment portfolio.',
        metricLabel: 'Accessible reserves',
        metricValue: pulsNice(months, ' months'),
        metricDetail: `${euro(m.cash.verifiedLiquid)} / ${euro(m.essential)} essential costs per month`,
        ratio: Math.min(100, (months / target) * 100),
        ratioCaption: `Illustrative reference: ${target} months · gap ${euro(shortfall)}`,
        facts: [
          ['Monthly breathing room', euro(m.surplus)],
          ['Debt payments', euro(m.debtPayment || 0)],
        ],
        question: 'Do you have other accessible savings?',
        options: [
          ['yes', 'Yes, at another bank'],
          ['no', 'No, this is everything'],
          ['unsure', 'Not sure'],
        ],
        title: shortfall > 0 ? 'Make the buffer more resilient' : 'Keep your buffer accessible',
        actionHint:
          shortfall > 0
            ? `The reference gap is ${euro(shortfall)}. Check affordability before setting anything aside.`
            : 'Your liquid coverage already meets this sample reference.',
        why: 'Foundation combines liquid reserves (40%), free cash flow (25%), debt service (20%) and costly debt (15%). The reference is illustrative and adjustable.',
        cta: 'Save an optional savings draft',
      };
    }
    if (id === 'behavior') {
      const n = pulsObservedMonths(),
        len = pulsProfile().months.length;
      return {
        eyebrow: 'TRANSACTIONS · SIX OBSERVED MONTHS',
        headline: `You saved in ${n} of ${len} months.`,
        description:
          'A missed savings month is not necessarily a poor choice. Timing and context matter.',
        metricLabel: 'Months with positive net savings',
        metricValue: `${n} / ${len}`,
        metricDetail: 'Net deposits · excluding transfers between own accounts',
        ratio: (100 * n) / len,
        ratioCaption: 'Not a target or a mandatory streak',
        facts: [
          ['Bills paid on time', '36 / 36'],
          ['Unplanned overdrafts', '0 months'],
        ],
        question: 'What explains the months without savings?',
        options: [
          ['unexpected', 'Unexpected costs'],
          ['variable', 'Income varies'],
          ['planned', 'Planned spending'],
          ['unsure', 'I am not sure'],
        ],
        title: 'Choose a routine that fits your cash flow',
        actionHint: `Your current estimated monthly surplus is ${euro(m.surplus)}. A draft should never exceed affordable spare cash.`,
        why: 'Behavior measures net saving frequency (55%), on-time bills (30%) and avoidance of unplanned overdrafts (15%). Planned spending is not automatically bad behavior.',
        cta: 'Save a flexible savings draft',
      };
    }
    if (id === 'future') {
      const plans = st.contextEntries.filter((x) => x && x.kind !== 'information'),
        count = plans.length,
        last = plans[count - 1],
        isMoving = st.demoContext === 'moving' && !count;
      return {
        eyebrow: 'LONG-TERM PREPARATION · CONTEXT',
        headline: isMoving
          ? 'A possible move needs a real budget.'
          : 'Your future protection needs a review.',
        description: isMoving
          ? 'A move can affect monthly obligations. This context is not yet a saved or scored plan.'
          : 'Coverage, retirement preparation and upcoming plans belong together, but are evaluated separately.',
        metricLabel: 'Long-term readiness',
        metricValue: s === null ? 'Not assessed' : Math.round(s) + ' / 100',
        metricDetail: 'Self-reported partial protection; pension started but not reviewed',
        ratio: s || 0,
        ratioCaption: 'Life plans inform scenarios, not the scored total',
        facts: [
          ['Income protection', 'Partial review'],
          [
            'Life plans',
            last
              ? `${last.type}: ${euro(last.amount ?? 0)}`
              : isMoving
                ? 'Possible move · not confirmed'
                : 'None confirmed',
          ],
        ],
        question: isMoving
          ? 'Have you estimated the moving costs?'
          : 'Have you reviewed your income protection?',
        options: isMoving
          ? [
              ['yes', 'Yes, upfront and ongoing costs'],
              ['no', 'Only some of the costs'],
              ['unsure', 'Not yet'],
            ]
          : [
              ['yes', 'Yes, coverage reviewed'],
              ['no', 'Not yet'],
              ['unsure', 'I do not know'],
            ],
        title: 'Clarify your future obligations',
        actionHint: count
          ? 'You can review the plan you saved. Check one-off and recurring costs separately.'
          : 'First understand existing protection. Add a life event if one is coming.',
        why: 'The Future score uses income protection (45%), retirement planning (45%) and a concentration proxy (10%). Life-event preparedness is contextual, never a bonus or penalty.',
        cta: 'Save a review checklist',
      };
    }
    return {
      eyebrow: 'KNOWLEDGE BASELINE · NOT THE WEALTH GUIDE',
      headline: 'Knowing more helps you decide better.',
      description:
        'Knowledge is checked with questions, not rewarded for completing lessons or opening products.',
      metricLabel: 'Independent demo check',
      metricValue: `${pulsProfile().knowledge.correct} / ${pulsProfile().knowledge.attempted}`,
      metricDetail: 'Short synthetic assessment · not a validated literacy test',
      ratio: s || 0,
      ratioCaption: 'Lessons do not change this assessment',
      facts: [
        ['Assessment source', 'Question responses'],
        ['Guide progress', 'Not scored'],
      ],
      question: 'Would you like to reassess your knowledge?',
      options: [],
      title: 'Take a five-question check',
      actionHint:
        'Five independent questions; feedback follows the complete check. You can review answers before applying this demo assessment.',
      why: 'The Knowledge dimension is the percentage correct on a separate assessment (at least 3 questions). It is provisional, not an OECD or certified score.',
      cta: 'Start knowledge check',
    };
  }
  function pulsSubStage(id: string) {
    return st.pulsSubStages?.[id] || 'review';
  }
  function pulsSubOpen(stage: string) {
    (st.pulsSubStages ||= {})[st.selected] = stage;
    render();
  }
  function pulsSubChoose(value: string) {
    (st.pulsSubChoices ||= {})[st.selected] = value;
    st.pulsSubStages[st.selected] = 'action';
    render();
  }
  function pulsSubSave() {
    (st.pulsSubDrafts ||= {})[st.selected] = {
      amount: st.pulsPlanAmount || 40,
      percent: st.pulsPlanPercent || 10,
      choice: st.pulsSubChoices[st.selected] || null,
    };
    render();
    toast('Demo draft saved. No transfer or score improvement recorded.');
  }
  function pulsSubAmount(value: string) {
    st.pulsPlanAmount = Math.max(10, Math.min(200, Math.round((Number(value) || 40) / 10) * 10));
    render();
  }
  function pulsSubPercent(value: string) {
    st.pulsPlanPercent = Math.max(1, Math.min(25, Number(value) || 10));
    render();
  }
  function pulsKnowledgeStart() {
    st.pulsQuiz = {
      index: 0,
      answers: [],
    };
    st.pulsSubStages.literacy = 'quiz';
    render();
  }
  function pulsKnowledgeAnswer(answer: number) {
    const quiz = st.pulsQuiz;
    if (!quiz || quiz.index >= PULS_KNOWLEDGE_QUESTIONS.length) return;
    quiz.answers.push(Number(answer));
    quiz.index++;
    render();
  }
  function pulsKnowledgeCommit() {
    const q = st.pulsQuiz;
    if (!q || q.answers.length !== PULS_KNOWLEDGE_QUESTIONS.length) return;
    const correct = q.answers.reduce(
      (n, a, i) => n + (a === PULS_KNOWLEDGE_QUESTIONS[i].correct ? 1 : 0),
      0,
    );
    st.pulsKnowledgeResult = {
      attempted: q.answers.length,
      correct,
      independentAssessment: true,
    };
    st.pulsKnowledgeTimestamp = '2026-11-11';
    st.pulsMeasurementNote = 'ASSESSMENT_UPDATE';
    st.pulsSubStages.literacy = 'review';
    st.pulsQuiz = null;
    render();
    toast('Assessment recorded as a new demo measurement, not financial progress.');
  }
  function pulsSubGetPlan() {
    const plans = st.contextEntries.filter((x) => x && x.kind !== 'information');
    return plans[plans.length - 1] || null;
  }
  function pulsSubPlanPrefill(kind = 'moving') {
    st.detailMode = false;
    st.scoreExpanded = false;
    st.composerText =
      kind === 'purchase'
        ? 'I am considering a major purchase next year costing €1,500.'
        : 'I am planning a move next year costing €2,400.';
    st.pulsSubStages.future = 'review';
    render();
    toast('Review this message before sending. Nothing is saved yet.');
  }
  function pulsMethodRows(id: string, result: ScoreResult) {
    const d = result.domains[PULS_DOMAIN_KEY[id]];
    return d.parts
      .filter((x) => x.value !== 'NA')
      .map((x) => (
        <div className={'p19-evidence-row'}>
          <div>
            <b>
              {{
                liquid_buffer: 'Liquid reserve',
                free_cash_flow: 'Free cash flow',
                debt_service: 'Debt service',
                costly_debt: 'Costly debt',
                net_saving_frequency: 'Saving frequency',
                bills_on_time: 'On-time bills',
                avoid_unplanned_overdraft: 'Unplanned overdrafts',
                income_protection: 'Income protection',
                retirement_readiness: 'Retirement',
                concentration: 'Asset concentration',
                independent_knowledge_assessment: 'Knowledge check',
              }[x.id] || x.id.replaceAll('_', ' ')}
            </b>
            <small>
              {Math.round(x.weight * 100)}
              {'% of this category'}
            </small>
          </div>
          <strong>{x.value === null ? 'Unknown' : Math.round(Number(x.value)) + '/100'}</strong>
        </div>
      ));
  }
  function pulsSubAction(id: string, d: SubscoreDetail, choice: string) {
    const saved = Boolean(st.pulsSubDrafts?.[id]);
    const p = pulsResult(),
      shortfall = Math.max(0, 3 * p.metrics.essential - p.metrics.cash.verifiedLiquid);
    if (id === 'fitness') {
      if (choice === 'yes' || choice === 'unsure')
        return (
          <button
            className={'p19-button'}
            onClick={(event) => {
              openSources();
            }}
          >
            {'Review other accounts '}
            <span>{'\u2192'}</span>
          </button>
        );
      const amount = st.pulsPlanAmount || 40;
      return (
        <>
          {shortfall > 0 ? (
            <div className={'p19-adjust'}>
              <div className={'p19-adjust-head'}>
                <span>{'Possible monthly amount'}</span>
                <b id={'p19-amount'}>{euro(amount)}</b>
              </div>
              <input
                type={'range'}
                aria-label={'Draft monthly amount'}
                min={'10'}
                max={'200'}
                step={'10'}
                value={amount}
                onChange={(event) => {
                  pulsSubAmount(event.currentTarget.value);
                }}
              />
              <small>
                {euro(shortfall)}
                {' reference gap \xB7 '}
                <b id={'p19-months'}>
                  {Math.ceil(shortfall / amount)}
                  {' months'}
                </b>
                {' \xB7 simulation only'}
              </small>
            </div>
          ) : (
            ''
          )}
          {shortfall > 0 ? (
            <button
              className={'p19-button'}
              onClick={(event) => {
                pulsSubSave();
              }}
            >
              {saved ? 'Draft saved ✓' : 'Save draft · no transfer'} <span>{'\u2192'}</span>
            </button>
          ) : (
            ''
          )}
        </>
      );
    }
    if (id === 'behavior') {
      if (choice === 'planned')
        return (
          <button
            className={'p19-button'}
            onClick={(event) => {
              pulsSubPlanPrefill('purchase');
            }}
          >
            {'Draft a personal plan '}
            <span>{'\u2192'}</span>
          </button>
        );
      const amount = st.pulsPlanAmount || 40,
        pct = st.pulsPlanPercent || 10;
      return (
        <>
          <div className={'p19-adjust'}>
            <div className={'p19-adjust-head'}>
              <span>
                {choice === 'variable' ? 'Share of monthly surplus' : 'Example monthly savings'}
              </span>
              <b id={choice === 'variable' ? 'p19-percent' : 'p19-amount'}>
                {choice === 'variable' ? pct + '%' : euro(amount)}
              </b>
            </div>
            {choice === 'variable' ? (
              <input
                type={'range'}
                min={'1'}
                max={'25'}
                value={pct}
                onChange={(event) => {
                  pulsSubPercent(event.currentTarget.value);
                }}
                aria-label={'Draft percent of available surplus'}
              />
            ) : (
              <input
                type={'range'}
                min={'10'}
                max={'200'}
                step={'10'}
                value={amount}
                onChange={(event) => {
                  pulsSubAmount(event.currentTarget.value);
                }}
                aria-label={'Draft monthly amount'}
              />
            )}
            <small>{'A draft, not a standing order.'}</small>
          </div>
          <button
            className={'p19-button'}
            onClick={(event) => {
              pulsSubSave();
            }}
          >
            {saved ? 'Draft saved ✓' : 'Save optional draft'} <span>{'\u2192'}</span>
          </button>
        </>
      );
    }
    if (id === 'future') {
      if (st.demoContext === 'moving' && !pulsSubGetPlan())
        return (
          <>
            <div className={'p19-checklist'}>
              <div>
                {'01 '}
                <span>{'One-off moving costs and deposit'}</span>
              </div>
              <div>
                {'02 '}
                <span>{'New recurring monthly costs'}</span>
              </div>
              <div>
                {'03 '}
                <span>{'Cash remaining after moving'}</span>
              </div>
            </div>
            <button
              className={'p19-button'}
              onClick={(event) => {
                pulsSubPlanPrefill();
              }}
            >
              {'Draft a moving plan '}
              <span>{'\u2192'}</span>
            </button>
          </>
        );
      return (
        <>
          <div className={'p19-checklist'}>
            <div>
              {'01 '}
              <span>{'Income and benefits available'}</span>
            </div>
            <div>
              {'02 '}
              <span>{'Existing policies and employer cover'}</span>
            </div>
            <div>
              {'03 '}
              <span>{'Changes from upcoming life events'}</span>
            </div>
          </div>
          <button
            className={'p19-button'}
            onClick={(event) => {
              pulsSubSave();
            }}
          >
            {saved ? 'Review draft saved ✓' : 'Save review checklist'} <span>{'\u2192'}</span>
          </button>
          <button
            className={'p19-plain'}
            onClick={(event) => {
              pulsSubPlanPrefill();
            }}
          >
            {'Add a life plan \u2197'}
          </button>
        </>
      );
    }
    return '';
  }
  function pulsQuizView() {
    const quiz = st.pulsQuiz || {
        index: 0,
        answers: [],
      },
      n = PULS_KNOWLEDGE_QUESTIONS.length;
    if (quiz.index >= n) {
      const right = quiz.answers.reduce(
        (r, x, i) => r + (x === PULS_KNOWLEDGE_QUESTIONS[i].correct ? 1 : 0),
        0,
      );
      return (
        <div className={'p19-content'}>
          <div className={'p19-eyebrow'}>{'KNOWLEDGE CHECK \xB7 COMPLETE'}</div>
          <h2 className={'p19-title'}>
            {right}
            {' of '}
            {n}
            {' correct'}
          </h2>
          <p className={'p19-paragraph'}>
            {
              'This is a short demonstration check, not a validated assessment. You can record it as a *new measurement*, not a financial improvement.'
            }
          </p>
          <div className={'p19-measure'}>
            <span>{'New demo result'}</span>
            <b>
              {Math.round((right / n) * 100)}
              {' / 100'}
            </b>
            <div className={'p19-track'}>
              <i
                style={{
                  width: '' + (100 * right) / n + '%',
                }}
              ></i>
            </div>
          </div>
          <div className={'p19-short-feedback'}>
            {PULS_KNOWLEDGE_QUESTIONS.filter((q, i) => quiz.answers[i] !== q.correct)
              .slice(0, 2)
              .map((q) => <p>{q.why}</p>) || (
              <p>
                {
                  'All questions correct in this short check. Further evidence is still needed for a robust assessment.'
                }
              </p>
            )}
          </div>
          <button
            className={'p19-button'}
            onClick={(event) => {
              pulsKnowledgeCommit();
            }}
          >
            {'Use this as demo assessment '}
            <span>{'\u2192'}</span>
          </button>
          <button
            className={'p19-plain'}
            onClick={(event) => {
              pulsKnowledgeStart();
            }}
          >
            {'Try another check'}
          </button>
        </div>
      );
    }
    const q = PULS_KNOWLEDGE_QUESTIONS[quiz.index];
    return (
      <div className={'p19-content'}>
        <div className={'p19-eyebrow'}>
          {'KNOWLEDGE CHECK \xB7 '}
          {quiz.index + 1}
          {' OF '}
          {n}
        </div>
        <div className={'p19-quiz-track'}>
          <i
            style={{
              width: '' + (quiz.index / n) * 100 + '%',
            }}
          ></i>
        </div>
        <h2 className={'p19-title'}>{q.q}</h2>
        <p className={'p19-paragraph'}>
          {'Choose one answer. Feedback is provided after the complete check.'}
        </p>
        <div className={'p19-answers'}>
          {q.answers.map((a, i) => (
            <button
              onClick={(event) => {
                pulsKnowledgeAnswer(i);
              }}
            >
              <span>{a}</span>
              <strong>{'\u203A'}</strong>
            </button>
          ))}
        </div>
        <button
          className={'p19-plain'}
          onClick={(event) => {
            pulsSubOpen('review');
          }}
        >
          {'Cancel without changing score'}
        </button>
      </div>
    );
  }
  function recommendationView() {
    const id = st.selected,
      d = pulsDetail(id),
      result = pulsResult(),
      sub = pulsDomain(id),
      state = pulsSubStage(id),
      choice = st.pulsSubChoices?.[id];
    if (id === 'literacy' && state === 'quiz')
      return (
        <div className={'insight-fixed'} aria-label={'Knowledge assessment, no scrolling'}>
          {pulsQuizView()}
        </div>
      );
    const coverage = sub.coverage,
      score = sub.score;
    if (state === 'method')
      return (
        <div className={'insight-fixed'} aria-label={'' + PULS_LABELS[id] + ' scoring explanation'}>
          <div className={'p19-content p19-method-view'}>
            <div className={'p19-eyebrow'}>
              {'SCORING EXPLAINED \xB7 '}
              {PULS_LABELS[id].toUpperCase()}
            </div>
            <h2 className={'p19-title'}>{'Where this number comes from'}</h2>
            <p className={'p19-paragraph'}>
              {d.headline} {d.description}
            </p>
            <p className={'p19-paragraph'}>
              {'Category result: '}
              <b>{score === null ? 'Not assessed' : Math.round(score) + '/100'}</b>
              {' \xB7 indicator coverage: '}
              <b>
                {Math.round(coverage)}
                {'%'}
              </b>
              {'.'}
            </p>
            <div className={'p19-measure'}>
              <div className={'p19-measure-top'}>
                <span>{d.metricLabel}</span>
                <b>{d.metricValue}</b>
              </div>
              <div className={'p19-caption'}>{d.metricDetail}</div>
            </div>
            <div className={'p19-facts'}>
              {d.facts.map(([n, v]) => (
                <div>
                  <span>{n}</span>
                  <b>{v}</b>
                </div>
              ))}
            </div>
            <div className={'p19-evidence-list'}>{pulsMethodRows(id, result)}</div>
            <p className={'p19-method-note'}>{d.why}</p>
            <p className={'p19-method-note'}>
              {
                'Model v0.2 \xB7 unvalidated thresholds \xB7 synthetic records. Missing inputs are not scored as zero. Overall weights: Foundation 35%, Behavior 25%, Future 30%, Knowledge 10%.'
              }
            </p>
            <button
              className={'p19-button'}
              onClick={(event) => {
                pulsSubOpen('review');
              }}
            >
              {'Back to this subscore '}
              <span>{'\u2192'}</span>
            </button>
          </div>
        </div>
      );
    if (id === 'literacy')
      return (
        <div className={'insight-fixed'} aria-label={'Knowledge: independent check'}>
          <div className={'p19-content p19-simple-view'}>
            <h2 className={'p19-subtitle'}>{'Check your knowledge in five questions.'}</h2>
            <button
              className={'p19-button'}
              onClick={(event) => {
                pulsKnowledgeStart();
              }}
            >
              {'Start knowledge check '}
              <span>{'\u2192'}</span>
            </button>
            <div className={'p19-bottom'}>
              <button
                className={'p19-plain'}
                onClick={(event) => {
                  pulsSubOpen('method');
                }}
              >
                {'How calculated?'}
              </button>
            </div>
            <div className={'p19-disclaimer'}>
              {'Optional demo assessment \xB7 not a certified test'}
            </div>
          </div>
        </div>
      );
    let inner: ReactNode = '';
    if (state === 'action') {
      const title =
        id === 'fitness'
          ? choice === 'yes' || choice === 'unsure'
            ? 'Bring your other savings into view.'
            : result.metrics.emergencyMonths >= 3
              ? 'Your reserve meets the reference.'
              : 'Plan how to close your reserve gap.'
          : id === 'behavior'
            ? choice === 'planned'
              ? 'Set a budget for your planned expense.'
              : choice === 'variable'
                ? 'Choose a savings share that fits your surplus.'
                : 'Choose a monthly amount you can afford.'
            : st.demoContext === 'moving' && !pulsSubGetPlan()
              ? 'Plan your upfront and monthly moving costs.'
              : choice === 'unsure'
                ? 'Find out what protection you already have.'
                : 'Review the income you could rely on.';
      inner = (
        <>
          <h2 className={'p19-subtitle'}>{title}</h2>
          {pulsSubAction(id, d, choice)}
          <div className={'p19-bottom'}>
            <button
              className={'p19-plain'}
              onClick={(event) => {
                pulsSubOpen('method');
              }}
            >
              {'How is this calculated?'}
            </button>
            <button
              className={'p19-plain'}
              onClick={(event) => {
                pulsSubOpen('review');
              }}
            >
              {'Change answer'}
            </button>
          </div>
        </>
      );
    } else {
      const options = d.options.map(([val, label]) => (
        <button
          onClick={(event) => {
            pulsSubChoose(val);
          }}
        >
          <span>{label}</span>
          <strong>{'\u203A'}</strong>
        </button>
      ));
      inner = (
        <section className={'p19-question'} aria-labelledby={'p19-question-title'}>
          <h2 className={'p19-subtitle'} id={'p19-question-title'}>
            {d.question}
          </h2>
          <div className={'p19-answers'}>{options}</div>
          <div className={'p19-bottom'}>
            <button
              className={'p19-plain'}
              onClick={(event) => {
                pulsSubOpen('method');
              }}
            >
              {'How calculated?'}
            </button>
            <button
              className={'p19-plain'}
              onClick={(event) => {
                pulsSubOpen('action');
              }}
            >
              {'Skip question'}
            </button>
          </div>
        </section>
      );
    }
    return (
      <div
        className={'insight-fixed'}
        aria-label={'' + PULS_LABELS[id] + ': measured evidence and relevant action, no scrolling'}
      >
        <div
          className={
            '' + 'p19-content ' + (state === 'review' ? 'p19-question-view' : 'p19-simple-view')
          }
        >
          {inner}
          <div className={'p19-disclaimer'}>
            {st.pulsMeasurementNote === 'DATA_RESTATEMENT'
              ? 'Data restatement · not financial progress'
              : st.pulsMeasurementNote === 'ASSESSMENT_UPDATE'
                ? 'Knowledge assessment updated · not a financial improvement'
                : 'Demo data · Provisional score · No financial action executed'}
          </div>
        </div>
      </div>
    );
  }
  function go(page: string) {
    if (['coach', 'goalInput', 'goalConfirm', 'goalResult'].includes(page)) {
      st.page = 'overview';
      st.inputFlow = null;
      st.lesson = null;
      st.sourceUI = null;
      render();
      return;
    }
    if (['guide', 'guideLesson'].includes(page)) {
      st.page = 'overview';
      st.detailMode = false;
      st.sourceUI = null;
      st.inputFlow = null;
      render();
      return;
    }
    if (['dimension', 'execution'].includes(page)) {
      st.page = 'overview';
      st.detailMode = true;
      st.sourceUI = null;
      render();
      return;
    }
    if (page !== st.page) {
      pageHistory.push(st.page);
      st.page = page;
    }
    render();
  }
  function back() {
    if (st.sourceUI) {
      if (st.sourceUI.stage !== 'list') st.sourceUI.stage = 'list';
      else st.sourceUI = null;
      render();
      return;
    }
    if (st.lesson) {
      st.lesson = null;
      render();
      return;
    }
    if (st.inputFlow) {
      if (st.inputFlow.stage === 'result') {
        flowEdit();
        return;
      }
      flowCancel();
      return;
    }
    if (st.page === 'overview' && st.detailMode) {
      if (pulsSubStage(st.selected) !== 'review') {
        pulsSubOpen('review');
        return;
      }
      st.detailMode = false;
      st.scoreExpanded = true;
      render();
      return;
    }
    if (st.page === 'overview' && st.scoreExpanded) {
      st.scoreExpanded = false;
      render();
      return;
    }
    st.page = pageHistory.pop() || 'home';
    render();
  }
  function selectDim(id: string) {
    st.selected = id;
    st.detailMode = true;
    st.scoreExpanded = false;
    st.actionExpanded = false;
    st.reasonExpanded = false;
    st.insightPosition = 0;
    render();
  }
  function toast(message: string) {
    st.toastMessage = pulsEnglish(message);
    render();
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      st.toastMessage = '';
      render();
    }, 2700);
  }
  function render() {
    notify();
  }
  function reset() {
    pageHistory.length = 0;
    st.page = 'home';
    st.selected = 'fitness';
    st.saving = 150;
    st.rule = false;
    st.verified = false;
    st.question = null;
    st.goal = null;
    st.goalSaved = false;
    st.scoreExpanded = false;
    st.detailMode = false;
    st.actionExpanded = false;
    st.reasonExpanded = false;
    st.insightPosition = 0;
    st.composerText = '';
    st.behaviorAmount = 100;
    st.behaviorSet = false;
    st.protectionChoice = null;
    st.knowledgeChoice = null;
    st.learningChoice = null;
    st.journeyPosition = null;
    st.draftText = examples.Urlaub;
    st.draftType = 'Urlaub';
    st.draftAmount = 1500;
    st.draftMonth = 'März 2027';
    st.guideLevel = 2;
    st.guideSessions = {};
    st.guideAnswers = {};
    st.guideDone = {
      1: true,
    };
    st.microChoices = {};
    st.microStages = {};
    st.microSaved = {};
    st.microWhy = {};
    st.pulsSubStages = {};
    st.pulsSubChoices = {};
    st.pulsSubDrafts = {};
    st.pulsQuiz = null;
    st.pulsKnowledgeResult = null;
    st.pulsPlanAmount = 40;
    st.pulsPlanPercent = 10;
    st.pulsMeasurementNote = null;
    st.microExternal = 0;
    st.microBudget = 150;
    st.microPercent = 10;
    st.inputFlow = null;
    st.contextEntries = [];
    st.sourceUI = null;
    st.sourceAssets = {};
    st.lesson = null;
    cfg.size = 'regular';
    cfg.style = 'smooth';
    cfg.trend = true;
    cfg.score = true;
    render();
  }
  function Shell() {
    return (
      <>
        <div className={'appframe'}>
          {'\n'}
          <aside className={'rail'}>
            {'\n  '}
            <div className={'logo'}>
              <span className={'mark'}>{'\u223F'}</span>
              <div>
                <b>{'PULS LAB'}</b>
                <div className={'micro'}>{'Widget Design Studio'}</div>
              </div>
            </div>
            {'\n  '}
            <div>
              <div className={'micro'}>{'Hackathon \xB7 Konzept v17'}</div>
              <h1>{'PULS + Wealth Journey.'}</h1>
            </div>
            {'\n  '}
            <p className={'description'}>
              {
                'The banking home stays unchanged. Plans and questions are handled directly below the fixed score. Simulations are saved only when you choose. The Wealth Journey remains scrollable.'
              }
            </p>
            {'\n  '}
            <div className={'option'}>
              <label>{'Widget-Gr\xF6\xDFe'}</label>
              <div className={'toggle-set'} id={'size-choice'}>
                <button
                  data-size={'regular'}
                  onClick={(event) => {
                    cfg.size = 'regular';
                    render();
                  }}
                  className={cfg.size === 'regular' ? 'sel' : ''}
                >
                  {'Standard'}
                </button>
                <button
                  data-size={'compact'}
                  onClick={(event) => {
                    cfg.size = 'compact';
                    render();
                  }}
                  className={cfg.size === 'compact' ? 'sel' : ''}
                >
                  {'Kompakt'}
                </button>
              </div>
            </div>
            {'\n  '}
            <div className={'option'}>
              <label>{'Visueller Stil'}</label>
              <div className={'toggle-set'} id={'style-choice'}>
                <button
                  data-style={'smooth'}
                  onClick={(event) => {
                    cfg.style = 'smooth';
                    render();
                  }}
                  className={cfg.style === 'smooth' ? 'sel' : ''}
                >
                  {'Modern'}
                </button>
                <button
                  data-style={'calm'}
                  onClick={(event) => {
                    cfg.style = 'calm';
                    render();
                  }}
                  className={cfg.style === 'calm' ? 'sel' : ''}
                >
                  {'Ruhig'}
                </button>
              </div>
            </div>
            {'\n  '}
            <div className={'switchrow'}>
              {'Wochenverlauf im Widget '}
              <button
                id={'trendToggle'}
                aria-label={'Wochenverlauf ein oder aus'}
                onClick={(event) => {
                  cfg.trend = !cfg.trend;
                  render();
                }}
                className={'switch' + (cfg.trend ? ' yes' : '')}
              ></button>
            </div>
            {'\n  '}
            <div className={'switchrow'}>
              {'Score als Zahl anzeigen '}
              <button
                id={'scoreToggle'}
                aria-label={'Score zeigen oder verbergen'}
                onClick={(event) => {
                  cfg.score = !cfg.score;
                  render();
                }}
                className={'switch' + (cfg.score ? ' yes' : '')}
              ></button>
            </div>
            {'\n  '}
            <div className={'option'}>
              <label>{'Demo customer context'}</label>
              <div className={'toggle-set context-toggle'} id={'context-choice'}>
                {'\n    '}
                <button
                  type={'button'}
                  onClick={(event) => {
                    setDemoContext('regular');
                  }}
                  data-context={'regular'}
                  className={st.demoContext === 'regular' ? 'sel' : ''}
                >
                  {'Everyday'}
                </button>
                {'\n    '}
                <button
                  type={'button'}
                  onClick={(event) => {
                    setDemoContext('variable');
                  }}
                  data-context={'variable'}
                  className={st.demoContext === 'variable' ? 'sel' : ''}
                >
                  {'Variable pay'}
                </button>
                {'\n    '}
                <button
                  type={'button'}
                  onClick={(event) => {
                    setDemoContext('moving');
                  }}
                  data-context={'moving'}
                  className={st.demoContext === 'moving' ? 'sel' : ''}
                >
                  {'Moving soon'}
                </button>
                {'\n  '}
              </div>
              <div className={'context-description'} id={'context-hint'}>
                {
                  {
                    regular: 'Illustrative profile: regular income, no confirmed life event.',
                    variable:
                      'Illustrative profile: monthly income fluctuates. Behavior questions adapt.',
                    moving:
                      'Illustrative profile: an upcoming move is known. Life-event questions adapt.',
                  }[st.demoContext]
                }
              </div>
            </div>
            {'\n  '}
            <div className={'option'}>
              <label>{'Welchen Einstieg m\xF6chtest du testen?'}</label>
              <div className={'toggle-set'} id={'start-choice'}>
                <button
                  data-start={'home'}
                  onClick={(event) => {
                    pageHistory.length = 0;
                    st.page = 'home';
                    st.detailMode = false;
                    st.scoreExpanded = false;
                    st.actionExpanded = false;
                    render();
                  }}
                  className={st.page === 'home' ? 'sel' : ''}
                >
                  {'Banking'}
                </button>
                <button
                  data-start={'overview'}
                  onClick={(event) => {
                    pageHistory.length = 0;
                    st.page = 'overview';
                    st.detailMode = false;
                    st.scoreExpanded = false;
                    st.actionExpanded = false;
                    render();
                  }}
                  className={st.page === 'overview' ? 'sel' : ''}
                >
                  {'PULS offen'}
                </button>
              </div>
            </div>
            {'\n  '}
            <button
              className={'reset'}
              id={'reset'}
              onClick={(event) => {
                reset();
              }}
            >
              {'\u21BB Prototyp zur\xFCcksetzen'}
            </button>
            {'\n  '}
            <div className={'note'}>
              <b>{'V18 \xB7 Vier Teilbewertungen:'}</b>
              {
                ' Foundation 35 %, Behavior 25 %, Future Readiness 30 % (inklusive unbewerteter Lebensplan-Szenarien), Knowledge 10 %. Formeln nur experimentell. '
              }
              <br />
              <br />
              <b>{'Designentscheidung:'}</b>
              {
                ' Lernen wie bei Duolingo: f\xFCnf Stationen auf einem geschwungenen Weg, kurze Aufgaben und sichtbarer Fortschritt. Keine t\xE4glichen Streaks und keine Score-Punkte f\xFCr das blo\xDFe Anklicken von Lektionen.'
              }
            </div>
            {'\n  '}
            <div className={'version'}>
              {'Standalone HTML \xB7 Ohne Backend \xB7 Alle Daten synthetisch'}
            </div>
            {'\n'}
          </aside>
          {'\n'}
          <main className={'stage'}>
            {'\n  '}
            <div className={'stage-head'}>
              <strong>{'Deutsche Bank \xD7 PULS'}</strong>
              <span className={'status'}>
                {'Interaktive Produktstudie \xB7 keine offizielle Bank-App'}
              </span>
            </div>
            {'\n  '}
            <div id={'phone'} className={'phone' + (cfg.style === 'calm' ? ' calm' : '')}>
              <div className={'glass'}>
                <div className={'statusbar'}>
                  <span>{'9:41'}</span>
                  <span>{'\u25CF\u25CF\u25CF \u25AE\u25AE 100%'}</span>
                </div>
                <div
                  id={'screen'}
                  style={{
                    display: 'flex',
                    flex: '1',
                    minHeight: '0',
                    flexDirection: 'column',
                  }}
                >
                  {st.page === 'home' ? home() : overview()}
                </div>
                <div
                  className={'toast'}
                  id={'toast'}
                  style={{
                    display: st.toastMessage ? 'block' : 'none',
                  }}
                >
                  {st.toastMessage || ''}
                </div>
              </div>
            </div>
            {'\n  '}
            <div className={'mock-disclaimer'}>
              {'Alle Funktionen sind klickbar. Keine echten Bankdaten oder \xDCberweisungen.'}
            </div>
            {'\n'}
          </main>
          {'\n'}
          <aside className={'rail'}>
            {'\n  '}
            <div>
              <div className={'micro'}>{'Die Nutzerreise'}</div>
              <h2>{'Ein Widget. Vier Momente.'}</h2>
            </div>
            {'\n  '}
            <div className={'flowsteps'}>
              {'\n    '}
              <div className={'flowstep'}>
                <b>{'1'}</b>
                <div>
                  <strong>{'Entdecken'}</strong>
                  {
                    'Auf der Banking-Startseite: Score, Ver\xE4nderung der Woche und subtiler Trend.'
                  }
                </div>
              </div>
              {'\n    '}
              <div className={'flowstep'}>
                <b>{'2'}</b>
                <div>
                  <strong>{'Verstehen'}</strong>
                  {
                    'Score entfaltet die Teilbewertungen. Pers\xF6nliche Eingaben werden im selben Bildschirm best\xE4tigt \u2013 ohne Formularseiten.'
                  }
                </div>
              </div>
              {'\n    '}
              <div className={'flowstep'}>
                <b>{'3'}</b>
                <div>
                  <strong>{'Handeln'}</strong>
                  {
                    'Ein n\xE4chster Schritt oder eine best\xE4tigte Planung \u2013 direkt im Widget, ohne neue Seite.'
                  }
                </div>
              </div>
              {'\n    '}
              <div className={'flowstep'}>
                <b>{'4'}</b>
                <div>
                  <strong>{'Begleiten'}</strong>
                  {
                    'Ein festes Eingabefeld f\xFCr Fragen und Pl\xE4ne; Beraterkontakt nur auf Wunsch.'
                  }
                </div>
              </div>
              {'\n  '}
            </div>
            {'\n  '}
            <div className={'note'}>
              <b>{'Warum Nutzer zur\xFCckkehren:'}</b>
              {
                ' Ein relevanter Monatsr\xFCckblick, ver\xE4nderte Lebenssituation oder eine offene Entscheidung. Keine k\xFCnstlichen t\xE4glichen Aufgaben.'
              }
            </div>
            {'\n  '}
            <div className={'rightfoot'}>
              {'Score-Bereiche ausgew\xE4hlt aus: '}
              <i>{'Next Gen I Challenge'}</i>
              {', Abschnitt \u201EPotential Data Sources\u201C.'}
              <br />
              {'The synthetic assessment is not statistically validated.'}
            </div>
            {'\n'}
          </aside>
          {'\n'}
        </div>
        {'\n'}
      </>
    );
  }
  return {
    view: () => localizeTree(Shell()),
    back,
    dispose: () => clearTimeout(toastTimer),
  };
}
