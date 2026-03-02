import { Component, computed, inject } from '@angular/core';
import { FormService } from '../../../services/form/form.service';

@Component({
  selector: 'app-policy-holder-info',
  imports: [],
  templateUrl: './policy-holder-info.html',
  styleUrl: './policy-holder-info.css',
})
export class PolicyHolderInfo {
  formService = inject(FormService);

  model = this.formService.state.formModel();

  fullName = computed(() => {
    const p = this.formService.state.formModel().personalInfo;

    return [p.firstName, p.middleName, p.lastName, p.suffix].filter(Boolean).join(' ');
  });

  dobPretty = computed(() => {
    const dob = this.formService.state.formModel().personalInfo.dob;

    if (!dob.month || !dob.day || !dob.year) return '';

    const date = new Date(Number(dob.year), Number(dob.month) - 1, Number(dob.day));

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  });
}
