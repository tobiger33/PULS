export interface GuideSession {
  index: number;
  answers: number[];
  selected: number | null;
  checked: boolean;
}
export interface InputFlow {
  stage: string;
  kind: string;
  original: string;
  amount: string;
  month: string;
  assumedMonth: boolean;
  validation: string;
  confirmed: boolean;
  recordIndex?: number;
}
export interface ContextEntry {
  type: string;
  kind: string;
  description: string;
  amount: number | null;
  month: string | null;
}
export interface SubscoreDraft {
  amount: number;
  percent: number;
  choice: string | null;
}
export interface KnowledgeResult {
  attempted: number;
  correct: number;
  independentAssessment: boolean;
}
export interface AppState {
  microChoices: Record<string, string>;
  microStages: Record<string, string>;
  microSaved: Record<string, boolean>;
  microWhy: Record<string, boolean>;
  microExternal: number;
  microBudget: number;
  microPercent: number;
  microEventAmount: number;
  page: string;
  selected: string;
  saving: number;
  rule: boolean;
  verified: boolean;
  question: string | null;
  goal: ContextEntry | null;
  draftText: string;
  draftType: string;
  draftAmount: number;
  draftMonth: string;
  goalSaved: boolean;
  scoreExpanded: boolean;
  detailMode: boolean;
  actionExpanded: boolean;
  reasonExpanded: boolean;
  insightPosition: number;
  composerText: string;
  behaviorAmount: number;
  behaviorSet: boolean;
  protectionChoice: string | null;
  knowledgeChoice: number | null;
  learningChoice: number | null;
  journeyPosition: number | null;
  guideLevel: number;
  guideSessions: Record<number, GuideSession>;
  guideAnswers: Record<number, number>;
  guideDone: Record<number, boolean>;
  guidePath: number[];
  demoContext: string;
  pulsSubStages: Record<string, string>;
  pulsSubChoices: Record<string, string>;
  pulsSubDrafts: Record<string, SubscoreDraft>;
  pulsQuiz: { index: number; answers: number[] } | null;
  pulsKnowledgeResult: KnowledgeResult | null;
  pulsKnowledgeTimestamp: string | null;
  pulsPlanAmount: number;
  pulsPlanPercent: number;
  pulsMeasurementNote: string | null;
  inputFlow: InputFlow | null;
  contextEntries: ContextEntry[];
  sourceUI: { stage: string; choice: string; consented?: boolean } | null;
  sourceAssets: Record<string, boolean>;
  lesson: number | null;
  saveMessage: string;
  toastMessage?: string;
}
export function createInitialState(): AppState {
  return {
    microChoices: {},
    microStages: {},
    microSaved: {},
    microWhy: {},
    microExternal: 0,
    microBudget: 150,
    microPercent: 10,
    microEventAmount: 2400,
    page: 'home',
    selected: 'fitness',
    saving: 150,
    rule: false,
    verified: false,
    question: null,
    goal: null,
    draftText: 'I am planning a €1,500 vacation in March.',
    draftType: 'Urlaub',
    draftAmount: 1500,
    draftMonth: 'März 2027',
    goalSaved: false,
    scoreExpanded: false,
    detailMode: false,
    actionExpanded: false,
    reasonExpanded: false,
    insightPosition: 0,
    composerText: '',
    behaviorAmount: 100,
    behaviorSet: false,
    protectionChoice: null,
    knowledgeChoice: null,
    learningChoice: null,
    journeyPosition: null,
    guideLevel: 2,
    guideSessions: {},
    guideAnswers: {},
    guideDone: { 1: true },
    guidePath: [1],
    demoContext: 'regular',
    pulsSubStages: {},
    pulsSubChoices: {},
    pulsSubDrafts: {},
    pulsQuiz: null,
    pulsKnowledgeResult: null,
    pulsKnowledgeTimestamp: null,
    pulsPlanAmount: 40,
    pulsPlanPercent: 10,
    pulsMeasurementNote: null,
    inputFlow: null,
    contextEntries: [],
    sourceUI: null,
    sourceAssets: {},
    lesson: null,
    saveMessage: '',
  };
}
export interface Source {
  name: string;
  type: string;
  amount: number;
  kind: string;
  hint: string;
  info: string;
}
export interface EducationQuestion {
  q: string;
  answers: string[];
  correct: number;
  why: string;
}
export interface Dimension {
  id: string;
  name: string;
  score: number;
  weight?: number;
  [key: string]: string | number | undefined;
}
export interface SubscoreDetail {
  eyebrow: string;
  headline: string;
  description: string;
  metricLabel: string;
  metricValue: string;
  metricDetail: string;
  ratio: number;
  ratioCaption: string;
  facts: [string, string][];
  question: string;
  options: [string, string][];
  title: string;
  actionHint: string;
  why: string;
  cta: string;
}
