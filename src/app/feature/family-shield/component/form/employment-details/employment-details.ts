import { Component, inject } from '@angular/core';
import { FormService } from '../../../services/form/form.service';
import { Router } from '@angular/router';
import { OverlayService } from '../../../../../shared/ui/overlay/overlay.service';
import { Input } from '../../../../../shared/ui/input/input';

@Component({
  selector: 'app-employment-details',
  imports: [Input],
  templateUrl: './employment-details.html',
  styleUrl: './employment-details.css',
})
export class EmploymentDetails {
  formService = inject(FormService);
  router = inject(Router);
  overlayService = inject(OverlayService);

  model = this.formService.state.formModel;

  form = this.formService.form.employmentInfo;

  protected continue(event: Event) {
    event.preventDefault();

    if (!this.form().valid()) {
      this.form.deploymentType().markAsTouched();
      this.form.jobTitle().markAsTouched();
      this.form.employerName().markAsTouched();
      this.form.countryOfEmployment().markAsTouched();

      setTimeout(() => {
        this.formService.focusFirstInvalid();
      });

      return;
    }

    this.overlayService.show();

    // Fake delay (800ms–1200ms feels natural)
    setTimeout(() => {
      this.router.navigate(['/direct/review']).then(() => this.overlayService.hide());
    }, 900);
  }
}
