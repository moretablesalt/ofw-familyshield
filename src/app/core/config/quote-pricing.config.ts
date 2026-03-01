// quote-pricing.config.ts
export const QUOTE_PRICING = {
  spouseBase: 200_000,
  spouseIncrement: 100_000,

  dependentBase: 100_000,
  dependentIncrement: 50_000,

  familyBasePremium: 1_000,
  familyIncrementPremium: 500,

  personalCoveragePerLevel: 100_000,
  personalPremiumPerLevel: 800,

  maxFamilyLevel: 5,
  maxPersonalLevel: 5,
  maxChildren: 4,
};
