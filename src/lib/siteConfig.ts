// Centralized editable claims and display flags. Verify every value before publishing.
export const PERFORMANCE_METRICS = {
  cleanClaimRate: 99, // TODO_CONFIRM
  fasterCollections: 35, // TODO_CONFIRM
  arDaysReduction: 40, // TODO_CONFIRM
  satisfaction: 98, // TODO_CONFIRM
  SHOW_SATISFACTION: false,
  evidenceNote: 'Based on TODO_CONFIRM clients over TODO_CONFIRM months.',
} as const;

export const OPTIMUS_FEE_PCT = 5; // TODO_CONFIRM before publishing or relying on this estimate.\n\nexport const CREDIBILITY_FLAGS = {
  SHOW_SOC2: false, // Enable only after confirming current SOC 2 status.
  SHOW_US_BASED: false, // Enable only if the team is genuinely US-based.
} as const;
