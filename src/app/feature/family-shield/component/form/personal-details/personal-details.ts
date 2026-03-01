import { Component, inject } from '@angular/core';
import { FormService } from '../../../services/form.service';
import { Router } from '@angular/router';
import { DropDown, SelectOption } from '../../../../../shared/ui/drop-down/drop-down';
import { Input } from '../../../../../shared/ui/input/input';
import { OverlayService } from '../../../../../shared/ui/overlay/overlay.service';

@Component({
  selector: 'app-personal-details',
  imports: [DropDown, Input],
  templateUrl: './personal-details.html',
  styleUrl: './personal-details.css',
})
export class PersonalDetails {
  formService = inject(FormService);
  router = inject(Router);
  overlayService = inject(OverlayService);

  model = this.formService.formModel;

  form = this.formService.form.personalInfo;

  readonly genderOptions: SelectOption[] = [
    { description: 'Male', value: 'MALE' },
    { description: 'Female', value: 'FEMALE' },
  ];

  monthOptions = this.formService.MONTH_OPTIONS;
  dayOptions = this.formService.DAY_OPTIONS;
  yearOptions = this.formService.YEAR_OPTIONS;
  civilStatusOptions = this.formService.CIVIL_STATUS_OPTIONS;
  nationalityOptions = this.formService.NATIONALITY_OPTIONS;

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
      this.router.navigate(['/direct/form/contact-info']).then(() => this.overlayService.hide());
    }, 900);
  }
}
