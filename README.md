## Model 
QuoteRequest
- civil status
- familyUnits
- personalUnits

QuoteResult
- spouseCoverage
- dependentCoverage
- personalCoverage
- familyPremium
- personalPremium
- totalPremium

## State
QuoteStateService
- Stores the user input needed for quote generation
- Has both the premium and coverage breakdown


## Services
QuoteCalculatorService
- Use by QuoteStateService
- Calculates the premium
- Calculates the coverage

QuoteBreakdownMapper
- Use by QuoteStateService
- buildBreakdown (coverages)
- Maps the coverages calculate by QuoteCalculatorService for easier reading

PremiumBreakdownService
- Used by Summary Bar
- Premium breakdown
