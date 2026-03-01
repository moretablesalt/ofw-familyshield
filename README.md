QuoteRequest
- civil status
- familyUnits
- personalUnits

Quote.model.ts

Premium
- breakdown
- 

QuoteStateService
- Stores the user input needed for quote generation

PremiumBreakdownService
- Premium breakdown

QuoteCalculatorService
- Use by QuoteStateService
- Calculates the premium
- Calculates the coverages

QuoteBreakdownMapper
- buildBreakdown
- Use by QuoteStateService
- Maps the coverages calculate by QuoteCalculatorService for easier reading
