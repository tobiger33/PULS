import type { AppState } from '../application/state';
import { GUIDE_QUESTIONS } from '../data/reference-data';
export function createEducationController(st: AppState, render: () => void) {
  function guideSession(level = st.guideLevel) {
    return (
      (st.guideSessions ||= {})[level] ||
      (st.guideSessions[level] = {
        index: 0,
        answers: [],
        selected: null,
        checked: false,
      })
    );
  }
  function openGuide(n: number) {
    if (!GUIDE_QUESTIONS[n]) return;
    st.guideLevel = n;
    st.lesson = n;
    st.scoreExpanded = false;
    st.detailMode = false;
    st.inputFlow = null;
    guideSession(n);
    render();
  }
  function answerGuide(answer: number) {
    const session = guideSession(),
      q = GUIDE_QUESTIONS[st.guideLevel][session.index];
    if (
      !st.lesson ||
      !q ||
      session.checked ||
      !Number.isInteger(answer) ||
      answer < 0 ||
      answer >= q.answers.length
    )
      return;
    session.selected = answer;
    render();
  }
  function checkGuideAnswer() {
    const session = guideSession(),
      q = GUIDE_QUESTIONS[st.guideLevel][session.index];
    if (!st.lesson || !q || session.selected === null || session.checked) return;
    session.checked = true;
    render();
  }
  function retryGuideQuestion() {
    const session = guideSession(),
      q = GUIDE_QUESTIONS[st.guideLevel][session.index];
    if (!q || !session.checked || session.selected === q.correct) return;
    session.selected = null;
    session.checked = false;
    render();
  }
  function nextGuideQuestion() {
    const session = guideSession(),
      q = GUIDE_QUESTIONS[st.guideLevel][session.index];
    if (!st.lesson || !q || !session.checked || session.selected !== q.correct) return;
    session.answers[session.index] = session.selected;
    session.index++;
    session.selected = null;
    session.checked = false;
    if (session.index === GUIDE_QUESTIONS[st.guideLevel].length) completeGuide();
    else render();
  }
  function completeGuide() {
    const level = st.guideLevel,
      session = guideSession(),
      questions = GUIDE_QUESTIONS[level];
    if (
      !st.lesson ||
      session.index !== questions.length ||
      !questions.every((q, i) => session.answers[i] === q.correct)
    )
      return;
    st.guideDone[level] = true;
    render();
  }
  function replayGuide() {
    delete st.guideSessions[st.guideLevel];
    guideSession();
    render();
  }
  function closeLesson() {
    st.lesson = null;
    render();
  }
  return {
    guideSession,
    openGuide,
    answerGuide,
    checkGuideAnswer,
    retryGuideQuestion,
    nextGuideQuestion,
    completeGuide,
    replayGuide,
    closeLesson,
  };
}
export type EducationActions = ReturnType<typeof createEducationController>;
