import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { createHash } from 'node:crypto';
import React, { isValidElement, type ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { parseFragment } from 'parse5';
import * as scoring from '../research/score_engine';
import { createPulsApp } from '../src/application/createPulsApp';

const reference = fs.readFileSync(new URL('../reference/puls-v19.html', import.meta.url), 'utf8');
function legacy() {
  const scripts = [...reference.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(
    (match) => match[1],
  );
  const context = vm.createContext({
    window: { PULSCore: scoring },
    Intl,
    console,
    setTimeout,
    clearTimeout,
    document: { querySelector: () => ({}), getElementById: () => null },
  });
  vm.runInContext(
    scripts[1].slice(0, scripts[1].indexOf('function render(){')) +
      '\nfunction render(){};function toast(){}\n' +
      scripts[2].slice(0, scripts[2].indexOf('let pulsTranslating')),
    context,
  );
  return (code: string) => vm.runInContext(code, context);
}
type Props = Record<string, unknown> & {
  children?: ReactNode;
  onClick?: (event: unknown) => void;
  onSubmit?: (event: unknown) => void;
};
function elements(node: ReactNode): React.ReactElement<Props>[] {
  if (Array.isArray(node)) return node.flatMap(elements);
  if (!isValidElement(node)) return [];
  const el = node as React.ReactElement<Props>;
  return [el, ...elements(el.props.children)];
}
function text(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(text).join('');
  return isValidElement(node) ? text((node.props as Props).children) : '';
}
function setup() {
  const app = createPulsApp(() => {}),
    run = legacy();
  const find = (predicate: (element: React.ReactElement<Props>) => boolean) => {
    const found = elements(app.view()).find(predicate);
    assert.ok(found, 'Expected control exists');
    return found;
  };
  const click = (label: string) => {
    const el = find(
      (el) =>
        el.type === 'button' && (el.props['aria-label'] === label || text(el).trim() === label),
    );
    assert.notEqual(el.props.disabled, true, 'Control is enabled');
    (el.props.onClick as Function)({ preventDefault() {} });
  };
  return { app, run, find, click };
}
function nodeById(node: any, id: string): any {
  if (node.attrs?.some((a: any) => a.name === 'id' && a.value === id)) return node;
  for (const child of node.childNodes || []) {
    const found = nodeById(child, id);
    if (found) return found;
  }
}
function canonical(node: any, translate: (s: string) => string): unknown {
  if (node.nodeName === '#text') {
    const value = translate(node.value).replace(/\s+/g, ' ');
    return value.trim() ? value : null;
  }
  if (node.nodeName === '#comment') return null;
  const attrs = (node.attrs || [])
    .filter((a: any) => !/^on/i.test(a.name) && !['data-flow-month', 'selected'].includes(a.name))
    .map((a: any) => [
      a.name,
      ['aria-label', 'title', 'placeholder'].includes(a.name)
        ? translate(a.value)
        : a.name === 'style'
          ? a.value
              .split(';')
              .map((x: string) => x.trim())
              .filter(Boolean)
              .sort()
              .join(';')
          : a.value,
    ])
    .sort((a: string[], b: string[]) => a[0].localeCompare(b[0]));
  const children = (node.childNodes || [])
    .map((n: any) => canonical(n, translate))
    .filter((n: unknown) => n !== null);
  return [node.tagName || node.nodeName, attrs, children];
}
function compare(s: ReturnType<typeof setup>, view = 'overview()') {
  const original = parseFragment(s.run(view));
  const migrated = parseFragment(renderToStaticMarkup(s.app.view()));
  const screen = nodeById(migrated, 'screen');
  assert.ok(screen);
  const left = canonical(original, (value) => s.run(`pulsEnglish(${JSON.stringify(value)})`));
  const right = canonical(
    { nodeName: '#document-fragment', childNodes: screen.childNodes },
    (s) => s,
  );
  const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex');
  if (hash(left) !== hash(right)) {
    fs.writeFileSync('/tmp/puls-reference-tree.json', JSON.stringify(left, null, 2));
    fs.writeFileSync('/tmp/puls-react-tree.json', JSON.stringify(right, null, 2));
  }
  assert.equal(
    hash(right),
    hash(left),
    'Rendered elements, text, attributes and inline styles match the frozen reference',
  );
}

test('banking home markup is preserved exactly', () => {
  const s = setup();
  compare(s, 'home()');
  s.app.dispose();
});
test('score overview and expanded subratings preserve the reference', () => {
  const s = setup();
  s.click('Open PULS Financial Health');
  s.run("go('overview')");
  compare(s);
  s.find((e) => e.props['aria-expanded'] === false).props.onClick!({});
  s.run('st.scoreExpanded=true');
  compare(s);
  s.app.dispose();
});
test('all subscore review, action, method and knowledge screens preserve the reference', () => {
  for (const id of ['fitness', 'behavior', 'future', 'literacy']) {
    const s = setup();
    s.click('Open PULS Financial Health');
    s.find((e) => e.props['aria-expanded'] === false).props.onClick!({});
    s.find(
      (e) =>
        e.props.className === 'score-wing' &&
        String(e.props['aria-label']).startsWith(
          {
            fitness: 'Financial foundation',
            behavior: 'Behavior',
            future: 'Future',
            literacy: 'Financial knowledge',
          }[id]!,
        ),
    ).props.onClick!({});
    s.run(`go('overview');selectDim('${id}')`);
    compare(s);
    if (id !== 'literacy') {
      s.click('Skip question');
      s.run("pulsSubOpen('action')");
      compare(s);
      s.click('How is this calculated?');
    } else s.click('How calculated?');
    s.run("pulsSubOpen('method')");
    compare(s);
    s.app.dispose();
  }
});
test('learning questions, correct feedback and completion preserve the reference', () => {
  const s = setup();
  s.click('Open PULS Financial Health');
  (s.find((e) => e.props['data-step'] === 2).props.onClick as Function)({});
  s.run('go("overview");openGuide(2)');
  compare(s);
  for (let i = 0; i < 3; i++) {
    const correct = s.run('GUIDE_QUESTIONS[2][guideSession().index].correct');
    const options = elements(s.app.view()).filter((e) =>
      String(e.props.className || '')
        .split(' ')
        .includes('education-answer'),
    );
    (options[correct].props.onClick as Function)({});
    s.run(`answerGuide(${correct})`);
    compare(s);
    s.click('Check answer →');
    s.run('checkGuideAnswer()');
    compare(s);
    s.click(i === 2 ? 'Complete level →' : 'Next question →');
    s.run('nextGuideQuestion()');
    compare(s);
  }
  assert.equal(
    elements(s.app.view()).some((e) => e.props['aria-label'] === 'Level 2 complete'),
    true,
  );
  s.app.dispose();
});
test('source consent enables preview and adding cash restates the same baseline', () => {
  const s = setup();
  s.click('Open PULS Financial Health');
  s.click('Manage financial data sources');
  s.run('go("overview");openSources()');
  compare(s);
  const connect = elements(s.app.view()).find(
    (e) => e.type === 'button' && text(e).trim() === 'Connect →',
  )!;
  (connect.props.onClick as Function)({});
  s.run('chooseSource("cash")');
  compare(s);
  const consent = s.find((e) => e.type === 'input' && e.props.type === 'checkbox');
  (consent.props.onChange as Function)({ currentTarget: { checked: true } });
  const next = s.find((e) => e.props.id === 'sourceConsentContinue');
  assert.equal(next.props.disabled, false);
  (next.props.onClick as Function)({});
  s.run('st.sourceUI.consented=true;sourceStep("preview")');
  compare(s);
  s.click('Include sample data →');
  s.run('addSource()');
  compare(s);
  s.app.dispose();
});
test('plan parsing, editing, preview and saving preserve the reference', () => {
  const s = setup();
  s.click('Open PULS Financial Health');
  const input = s.find((e) => e.props.id === 'pulseComposer');
  (input.props.onChange as Function)({
    currentTarget: { value: 'I am planning a move in May 2027 costing €2,400.' },
  });
  s.find((e) => e.type === 'form').props.onSubmit!({ preventDefault() {} });
  s.run(
    `go('overview');st.inputFlow=interpretInput('I am planning a move in May 2027 costing €2,400.')`,
  );
  compare(s);
  s.click('Calculate preview →');
  s.run('flowConfirm()');
  compare(s);
  s.click('Save plan draft →');
  s.run('flowSave()');
  compare(s);
  s.app.dispose();
});

test('the reference CSS is retained verbatim before host-only adaptations', () => {
  const css = fs.readFileSync(new URL('../src/styles/reference.css', import.meta.url), 'utf8');
  assert.ok(css.startsWith(reference.match(/<style>([\s\S]*?)<\/style>/)![1]));
});
