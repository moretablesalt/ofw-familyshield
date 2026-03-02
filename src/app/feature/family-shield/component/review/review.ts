import { Component, inject } from '@angular/core';
import { PremiumBreakdown } from './premium-breakdown/premium-breakdown';
import { PolicyHolderInfo } from './policy-holder-info/policy-holder-info';
import { Router } from '@angular/router';
import { StepperService } from '../../../../layout/stepper/stepper.service';
import { DependentsCovered } from './dependents-covered/dependents-covered';
import { TermsAndConditions } from './terms-and-conditions/terms-and-conditions';
import { PaymentMethod } from './payment-method/payment-method';
import { InsuranceDetails } from './insurance-details/insurance-details';

@Component({
  selector: 'app-review',
  imports: [
    PremiumBreakdown,
    PolicyHolderInfo,
    DependentsCovered,
    TermsAndConditions,
    PaymentMethod,
    InsuranceDetails,
  ],
  templateUrl: './review.html',
  styleUrl: './review.css',
})
export class Review {
  private readonly router = inject(Router);
  private readonly stepperService = inject(StepperService);

  constructor() {
    this.stepperService.setActive(2);
  }

  protected continue() {
    this.router.navigate(['/family-shield/confirmation']);
  }
}
