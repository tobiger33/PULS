export interface MoneyAccount {
  id: string;
  kind: string;
  balance: number;
  liquid: boolean;
  verified: boolean;
}
export interface FinancialMonth {
  month: string;
  income: number;
  essential: number;
  discretionary: number;
  netSaving: number;
  billsDue: number;
  billsLate: number;
  unplannedOverdraft: boolean;
}
export interface FinancialProfile {
  id: string;
  asOf: string;
  lifeStage: string;
  accounts: MoneyAccount[];
  debts: { id: string; balance: number; monthlyPayment: number; apr: number | null }[];
  accountsReviewed: boolean;
  debtsReviewed: boolean;
  financialPictureReviewed: boolean;
  months: FinancialMonth[];
  future: {
    incomeProtection: string;
    retirementPlan: string;
    invested: boolean;
    largestHoldingShare: number;
  };
  goals: {
    label: string;
    targetMonth: string | null;
    cost: number;
    reserved: number | null;
    monthlyAllocation: number | null;
  }[];
  noUpcomingGoalsConfirmed: boolean;
  knowledge: { attempted: number; correct: number; independentAssessment: boolean };
}
export interface ScorePart {
  id: string;
  weight: number;
  value: number | null | 'NA';
  explanation: string;
  reason: string;
}
export interface ScoreDomain {
  score: number | null;
  coverage: number;
  parts: ScorePart[];
  components?: Record<string, unknown>;
}
export interface ScoreResult {
  method: string;
  overall: number | null;
  domains: Record<'foundation' | 'behavior' | 'future' | 'knowledge', ScoreDomain>;
  context: { reserveTargetMonths: number };
  metrics: {
    essential: number;
    surplus: number;
    emergencyMonths: number;
    debtPayment: number;
    cash: { verifiedLiquid: number };
  };
}
export const METHOD_VERSION: string;
export const WEIGHTS: Readonly<Record<string, number>>;
export function computeScore(
  profile: FinancialProfile,
  options?: Record<string, unknown>,
): ScoreResult;
export function selectRecommendation(profile: FinancialProfile, result: ScoreResult): unknown;
export function compareSnapshots(
  previous: ScoreResult,
  current: ScoreResult,
  eventType?: string,
): unknown;
export function weightSensitivity(
  profile: FinancialProfile,
  options?: Record<string, unknown>,
): unknown;
