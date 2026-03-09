import { Component, inject } from '@angular/core';
import { PremiumBreakdown } from './premium-breakdown/premium-breakdown';
import { PolicyHolderInfo } from './policy-holder-info/policy-holder-info';
import { Router } from '@angular/router';
import { StepperService } from '../../../../layout/stepper/stepper.service';
import { DependentsCovered } from './dependents-covered/dependents-covered';
import { TermsAndConditions } from './terms-and-conditions/terms-and-conditions';
import { PaymentMethod } from './payment-method/payment-method';
import { InsuranceDetails } from './insurance-details/insurance-details';
import { ApplicationApiService } from '../../services/application-api.service';
import { ApplicationRequestDto } from '../../model/dto/application-request.dto';
import { buildApplicationRequest } from '../../mapper/application-request.mapper';
import { QuoteStateService } from '../../state/quote-state.service';
import { PolicyHolderStateService } from '../../services/form/policy-holder-state.service';
import { ApplicationResponseDto } from '../../model/dto/application-response.dto';
import { PaymentRedirectService } from '../../services/payment-redirect.service';

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
  private readonly applicationApiService = inject(ApplicationApiService);
  quoteStateService = inject(QuoteStateService);
  policyHolderStateService = inject(PolicyHolderStateService);

  paymentRedirect = inject(PaymentRedirectService);

  constructor() {
    this.stepperService.setActive(2);
  }

  result: ApplicationResponseDto = {
    referenceNumber: '',
    premium: '',
    pesopayHash: '',
    merchantId: '',
  };

  private paymentUrl = 'https://test.pesopay.com/b2cDemo/eng/payment/payForm.jsp';

  protected continue() {
    this.applicationApiService.create(this.buildRequest()).subscribe((res) => {

      const baseUrl = window.location.origin;

      const formData = {
        merchantId: res.merchantId,
        amount: res.premium,
        orderRef: res.referenceNumber,
        currCode: '608',
        successUrl: baseUrl + '/family-shield/payment-success/'+ res.referenceNumber,
        failUrl: baseUrl + '/family-shield/payment-fail',
        cancelUrl: baseUrl + '/family-shield/payment-fail',
        payType: 'N',
        lang: 'E',
        mpsMode: 'NIL',
        payMethod: 'ALL',
        secureHash: res.pesopayHash,
        remark: '',
        redirect: '',
        oriCountry: '',
        destCountry: '',
      };

      this.paymentRedirect.submit(this.paymentUrl, formData);
    });
  }

  private buildRequest(): ApplicationRequestDto {
    return buildApplicationRequest(
      this.policyHolderStateService.formModel(),
      this.quoteStateService.request(),
    );
  }
}
