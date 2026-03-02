import { Component, inject } from '@angular/core';
import { PremiumBreakdownService } from '../../../services/premium-breakdown.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-premium-breakdown',
  imports: [DecimalPipe],
  templateUrl: './premium-breakdown.html',
  styleUrl: './premium-breakdown.css',
})
export class PremiumBreakdown {
  private breakdown = inject(PremiumBreakdownService);

  // Coverage period (from quote)

  // USD values (from breakdown service)
  basicPremiumPhp = this.breakdown.basicPremiumPhp;
  grossPremiumPhp = this.breakdown.grossPremiumPhp;
  premiumTaxPhp = this.breakdown.premiumTaxPhp;
  lgtPhp = this.breakdown.lgtPhp;
  dstPhp = this.breakdown.dstPhp;
}
