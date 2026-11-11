import { GUIDE_QUESTIONS, guideStages } from '../data/reference-data';
import type { GuideSession } from '../application/state';
import type { EducationActions } from '../domain/education';
export function EducationQuiz({
  level,
  session,
  actions,
}: {
  level: number;
  session: GuideSession;
  actions: EducationActions;
}) {
  const g = guideStages[level - 1];
  if (!g) return '';
  const questions = GUIDE_QUESTIONS[level],
    total = questions.length,
    done = session.index === total;
  if (done)
    return (
      <section
        className={'education-quiz education-complete'}
        aria-label={'' + 'Level ' + level + ' complete'}
      >
        <div className={'education-success'} aria-hidden={'true'}>
          {'\u2713'}
        </div>
        <div className={'v14-eyebrow'}>
          {'LEVEL '}
          {level}
          {' COMPLETE'}
        </div>
        <h2>
          {'Three questions.'}
          <br />
          {'One step forward.'}
        </h2>
        <p>
          {'You worked through '}
          {total}
          {' of '}
          {total}
          {' questions.'}
        </p>
        <button
          className={'education-primary'}
          onClick={(event) => {
            actions.closeLesson();
          }}
        >
          {'Back to learning path'}
        </button>
        {level < 5 ? (
          <button
            className={'education-secondary'}
            onClick={(event) => {
              actions.openGuide(level + 1);
            }}
          >
            {'Start level '}
            {level + 1}
          </button>
        ) : (
          ''
        )}
        <button
          className={'education-link'}
          onClick={(event) => {
            actions.replayGuide();
          }}
        >
          {'Practise again'}
        </button>
        <small>
          {'Learning progress saved for this session. Financial Health score unchanged.'}
        </small>
      </section>
    );
  const q = questions[session.index],
    correct = session.checked && session.selected === q.correct;
  const progress = session.index + Number(correct);
  return (
    <section
      className={'education-quiz education-active'}
      aria-label={'' + 'Level ' + level + ' learning exercise'}
    >
      <div className={'education-question-body'}>
        <div className={'education-top'}>
          <span>
            {'LEVEL '}
            {level}
            {' \xB7 '}
            {
              [
                'Understand your finances',
                'Build financial security',
                'Start building wealth',
                'Manage your wealth',
                'Preserve your wealth',
              ][level - 1]
            }
          </span>
          <span>
            {session.index + 1}
            {' / '}
            {total}
          </span>
        </div>
        <div
          className={'education-progress'}
          role={'progressbar'}
          aria-label={'Questions completed'}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={progress}
        >
          <i
            style={{
              width: '' + (100 * progress) / total + '%',
            }}
          ></i>
        </div>
        <h2>{q.q}</h2>
        <div className={'education-options'}>
          {q.answers.map((answer, i) => (
            <button
              className={
                '' +
                'education-answer ' +
                (session.selected === i ? 'selected' : '') +
                ' ' +
                (session.checked && session.selected === i
                  ? correct
                    ? 'correct'
                    : 'incorrect'
                  : '')
              }
              onClick={(event) => {
                actions.answerGuide(i);
              }}
              aria-pressed={session.selected === i}
              {...(session.checked
                ? {
                    disabled: true,
                  }
                : {})}
            >
              <span className={'education-letter'}>{String.fromCharCode(65 + i)}</span>
              <span>{answer}</span>
              {session.checked && session.selected === i ? (
                <span aria-hidden={'true'}>{correct ? '✓' : '×'}</span>
              ) : (
                ''
              )}
            </button>
          ))}
        </div>
        <button
          className={'education-link'}
          onClick={(event) => {
            actions.closeLesson();
          }}
        >
          {'Back to learning path'}
        </button>
      </div>
      <div className={'education-footer'}>
        <div
          className={
            '' +
            'education-feedback ' +
            (session.checked ? (correct ? 'correct' : 'incorrect') : '')
          }
          role={'status'}
          aria-live={'polite'}
        >
          {session.checked ? (
            <>
              <strong>{correct ? 'That’s right.' : 'Not quite. Try again.'}</strong>
              <span>{q.why}</span>
            </>
          ) : (
            ''
          )}
        </div>
        {!session.checked ? (
          <button
            className={'education-primary'}
            onClick={(event) => {
              actions.checkGuideAnswer();
            }}
            {...(session.selected === null
              ? {
                  disabled: true,
                }
              : {})}
          >
            {'Check answer '}
            <span>{'\u2192'}</span>
          </button>
        ) : correct ? (
          <button
            className={'education-primary'}
            onClick={(event) => {
              actions.nextGuideQuestion();
            }}
          >
            {session.index === total - 1 ? 'Complete level' : 'Next question'}{' '}
            <span>{'\u2192'}</span>
          </button>
        ) : (
          <button
            className={'education-primary'}
            onClick={(event) => {
              actions.retryGuideQuestion();
            }}
          >
            {'Try again '}
            <span>{'\u21BB'}</span>
          </button>
        )}
      </div>
    </section>
  );
}
