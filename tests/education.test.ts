import test from 'node:test';
import assert from 'node:assert/strict';
import { createInitialState } from '../src/application/state';
import { createEducationController } from '../src/domain/education';
import { GUIDE_QUESTIONS } from '../src/data/reference-data';

function quiz() {
  const state = createInitialState();
  state.guideDone = {};
  return { state, ...createEducationController(state, () => {}) };
}
test('every level requires all three checked correct answers before completion', () => {
  const q = quiz();
  for (let level = 1; level <= 5; level++) {
    q.openGuide(level);
    assert.equal(GUIDE_QUESTIONS[level].length, 3);
    for (let index = 0; index < 3; index++) {
      q.completeGuide();
      q.nextGuideQuestion();
      assert.equal(q.guideSession().index, index);
      assert.equal(Boolean(q.state.guideDone[level]), false);
      q.answerGuide(GUIDE_QUESTIONS[level][index].correct);
      q.nextGuideQuestion();
      assert.equal(q.guideSession().index, index);
      q.checkGuideAnswer();
      q.nextGuideQuestion();
    }
    assert.equal(q.state.guideDone[level], true);
    assert.equal(q.guideSession().answers.length, 3);
  }
});
test('wrong answers cannot advance and checked answers cannot be changed', () => {
  const q = quiz();
  q.openGuide(2);
  q.answerGuide(2);
  q.checkGuideAnswer();
  q.answerGuide(0);
  q.nextGuideQuestion();
  q.completeGuide();
  assert.equal(q.guideSession().selected, 2);
  assert.equal(q.guideSession().index, 0);
  assert.equal(Boolean(q.state.guideDone[2]), false);
  q.retryGuideQuestion();
  q.answerGuide(0);
  q.checkGuideAnswer();
  q.nextGuideQuestion();
  assert.equal(q.guideSession().index, 1);
});
test('independent level progress resumes; replay resets only that attempt', () => {
  const q = quiz();
  q.openGuide(2);
  q.answerGuide(0);
  q.checkGuideAnswer();
  q.nextGuideQuestion();
  q.closeLesson();
  q.openGuide(3);
  q.answerGuide(1);
  q.openGuide(2);
  assert.equal(q.guideSession().index, 1);
  q.openGuide(3);
  assert.equal(q.guideSession().selected, 1);
  q.replayGuide();
  assert.equal(q.guideSession().selected, null);
  q.openGuide(2);
  assert.equal(q.guideSession().index, 1);
});
test('invalid selections and empty checks cannot unlock progress', () => {
  const q = quiz();
  q.openGuide(2);
  q.answerGuide(-1);
  q.answerGuide(99);
  q.answerGuide(0.5);
  q.checkGuideAnswer();
  q.nextGuideQuestion();
  assert.equal(q.guideSession().selected, null);
  assert.equal(q.guideSession().checked, false);
  assert.equal(q.guideSession().index, 0);
});
