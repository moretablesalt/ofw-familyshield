import { Component, inject } from '@angular/core';
import { FormService } from '../../../services/form/form.service';
import { Router } from '@angular/router';
import { OverlayService } from '../../../../../shared/ui/overlay/overlay.service';
import { DropDown, SelectOption } from '../../../../../shared/ui/drop-down/drop-down';
import { Input } from '../../../../../shared/ui/input/input';

@Component({
  selector: 'app-contact-info',
  imports: [Input, DropDown],
  templateUrl: './contact-info.html',
  styleUrl: './contact-info.css',
})
export class ContactInfo {
  formService = inject(FormService);
  router = inject(Router);
  overlayService = inject(OverlayService);

  model = this.formService.state.formModel;

  form = this.formService.form.contactInfo;

  readonly genderOptions: SelectOption[] = [
    { description: 'Male', value: 'M' },
    { description: 'Female', value: 'F' },
  ];

  provinceOptions = this.formService.state.PROVINCE_OPTIONS;
  cityOptions = this.formService.state.CITY_OPTIONS;
  barangayOptions = this.formService.state.BARANGAY_OPTIONS;
  zipCodeOptions = this.formService.state.ZIPCODE_OPTIONS;

  protected continue(event: Event) {
    event.preventDefault();

    if (!this.form().valid()) {
      // Address
      this.form.address.province().markAsTouched();
      this.form.address.city().markAsTouched();
      this.form.address.barangay().markAsTouched();
      this.form.address.zipCode().markAsTouched();
      this.form.address.street().markAsTouched();

      // Contact
      this.form.email().markAsTouched();
      this.form.mobile().markAsTouched();

      // Passport
      this.form.passportNo().markAsTouched();
      this.form.passportExpiryDate().markAsTouched();

      setTimeout(() => {
        this.formService.focusFirstInvalid();
      });

      return;
    }

    this.overlayService.show();

    // Fake delay (800ms–1200ms feels natural)
    setTimeout(() => {
      this.router
        .navigate(['/direct/form/employer-details'])
        .then(() => this.overlayService.hide());
    }, 900);
  }
}
