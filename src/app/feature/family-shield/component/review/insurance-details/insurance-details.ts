import { Component, computed, inject } from '@angular/core';
import { QuoteStateService } from '../../../state/quote-state.service';
import { CivilStatus } from '../../../../../core/enum/civil-status.enum';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-insurance-details',
  imports: [DecimalPipe],
  templateUrl: './insurance-details.html',
  styleUrl: './insurance-details.css',
})
export class InsuranceDetails {
  private quoteState = inject(QuoteStateService);

  familyUnits = computed(() => this.quoteState.request().familyLevel);
  personalUnits = computed(() => this.quoteState.request().personalLevel);

  civilStatus = computed(() => this.quoteState.request().civilStatus);

  showPackage1 = computed(() => this.civilStatus() === CivilStatus.Married);

  showPackage2 = computed(
    () => this.civilStatus() !== CivilStatus.Married || this.civilStatus() === CivilStatus.Single,
  );
}
