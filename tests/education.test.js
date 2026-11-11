const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function quiz() {
  const html = fs.readFileSync(require('node:path').join(__dirname, '../index.html'), 'utf8');
  const start = html.indexOf('// Education quiz:');
  const end = html.indexOf('\nconst $=', start);
  const context = vm.createContext({
    st: { guideLevel: 2, guideSessions: {}, guideDone: {} },
    render() {},
  });
  vm.runInContext(html.slice(start, end), context);
  return source => vm.runInContext(source, context);
}

test('every level requires all three checked, correct answers before completion', () => {
  const run = quiz();
  for (let level = 1; level <= 5; level++) {
    run(`openGuide(${level})`);
    assert.equal(run('GUIDE_QUESTIONS[st.guideLevel].length'), 3);
    for (let i = 0; i < 3; i++) {
      run('completeGuide(); nextGuideQuestion()');
      assert.equal(run('guideSession().index'), i);
      assert.equal(run('Boolean(st.guideDone[st.guideLevel])'), false);
      run('answerGuide(GUIDE_QUESTIONS[st.guideLevel][guideSession().index].correct)');
      run('nextGuideQuestion()');
      assert.equal(run('guideSession().index'), i, 'selection alone must not advance');
      run('checkGuideAnswer(); nextGuideQuestion()');
    }
    assert.equal(run('Boolean(st.guideDone[st.guideLevel])'), true);
    assert.equal(run('guideSession().answers.length'), 3);
  }
});

test('wrong answers cannot advance and checked answers cannot be changed', () => {
  const run = quiz();
  run('openGuide(2); answerGuide(2); checkGuideAnswer(); answerGuide(0); nextGuideQuestion(); completeGuide()');
  assert.equal(run('guideSession().selected'), 2);
  assert.equal(run('guideSession().index'), 0);
  assert.equal(run('Boolean(st.guideDone[2])'), false);
  run('retryGuideQuestion(); answerGuide(0); checkGuideAnswer(); nextGuideQuestion()');
  assert.equal(run('guideSession().index'), 1);
});

test('leaving and changing levels retains independent progress; replay resets only that attempt', () => {
  const run = quiz();
  run('openGuide(2); answerGuide(0); checkGuideAnswer(); nextGuideQuestion(); closeLesson(); openGuide(3); answerGuide(1); openGuide(2)');
  assert.equal(run('guideSession().index'), 1);
  run('openGuide(3)');
  assert.equal(run('guideSession().selected'), 1);
  run('replayGuide()');
  assert.equal(run('guideSession().selected'), null);
  run('openGuide(2)');
  assert.equal(run('guideSession().index'), 1);
});

test('invalid selections and empty checks cannot unlock progress', () => {
  const run = quiz();
  run('openGuide(2); answerGuide(-1); answerGuide(99); answerGuide(0.5); checkGuideAnswer(); nextGuideQuestion()');
  assert.equal(run('guideSession().selected'), null);
  assert.equal(run('guideSession().checked'), false);
  assert.equal(run('guideSession().index'), 0);
});
