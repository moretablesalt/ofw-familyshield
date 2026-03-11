import { Component, inject } from '@angular/core';
import { FormService } from '../../../services/form/form.service';
import { Router } from '@angular/router';
import { DropDown, SelectOption } from '../../../../../shared/ui/drop-down/drop-down';
import { Input } from '../../../../../shared/ui/input/input';
import { OverlayService } from '../../../../../shared/ui/overlay/overlay.service';
import { PolicyHolderStateService } from '../../../services/form/policy-holder-state.service';
import { QuoteStateService } from '../../../state/quote-state.service';

@Component({
  selector: 'app-personal-details',
  imports: [DropDown, Input],
  templateUrl: './personal-details.html',
  styleUrl: './personal-details.css',
})
export class PersonalDetails {
  formService = inject(FormService);
  private readonly quoteState = inject(QuoteStateService);
  private readonly state = inject(PolicyHolderStateService);
  router = inject(Router);
  overlayService = inject(OverlayService);

  model = this.state.formModel;

  form = this.formService.form.personalInfo;

  constructor() {
    const civilStatus = this.quoteState.request().policyHolderCivilStatus;
    if (civilStatus) {
      this.form.civilStatus().value.set(civilStatus);
    }
  }

  readonly genderOptions: SelectOption[] = [
    { description: 'Male', value: 'MALE' },
    { description: 'Female', value: 'FEMALE' },
  ];

  monthOptions = this.state.MONTH_OPTIONS;
  dayOptions = this.state.DAY_OPTIONS;
  yearOptions = this.state.YEAR_OPTIONS;
  civilStatusOptions = this.state.CIVIL_STATUS_OPTIONS;
  nationalityOptions = this.state.NATIONALITY_OPTIONS;

  protected continue(event: Event) {
    event.preventDefault();

    if (!this.form().valid()) {
      this.form.firstName().markAsTouched();
      this.form.lastName().markAsTouched();
      this.form.dob.day().markAsTouched();
      this.form.dob.month().markAsTouched();
      this.form.dob.year().markAsTouched();
      this.form.gender().markAsTouched();
      this.form.civilStatus().markAsTouched();
      this.form.nationality().markAsTouched();

      setTimeout(() => {
        this.formService.focusFirstInvalid();
      });
      return;
    }

    this.overlayService.show();

    // Fake delay (800ms–1200ms feels natural)
    setTimeout(() => {
      this.router
        .navigate(['/family-shield/form/contact-info'])
        .then(() => this.overlayService.hide());
    }, 900);
  }
}
