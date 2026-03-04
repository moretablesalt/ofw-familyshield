import { Component, computed, effect, inject } from '@angular/core';
import { FormService } from '../../../services/form/form.service';
import { PolicyHolderStateService } from '../../../services/form/policy-holder-state.service';
import { Router } from '@angular/router';
import { OverlayService } from '../../../../../shared/ui/overlay/overlay.service';
import { DropDown, SelectOption } from '../../../../../shared/ui/drop-down/drop-down';
import { Input } from '../../../../../shared/ui/input/input';
import { FieldTree } from '@angular/forms/signals';
import { Dependent } from '../../../model/dependent.model';
import { QuoteStateService } from '../../../state/quote-state.service';
import { CivilStatus } from '../../../../../core/enum/civil-status.enum';

@Component({
  selector: 'app-dependents',
  imports: [Input, DropDown],
  templateUrl: './dependents.html',
  styleUrl: './dependents.css',
})
export class Dependents {
  private readonly formService = inject(FormService);
  readonly policyHolderState = inject(PolicyHolderStateService);
  private readonly router = inject(Router);
  private readonly overlayService = inject(OverlayService);
  quoteState = inject(QuoteStateService);

  form = this.formService.form;
  civilStatus = computed(() => this.quoteState.request().policyHolderCivilStatus);
  dependents = this.form.dependents;

  relationshipOptions = computed<SelectOption[]>(() => {
    const status = this.civilStatus();

    switch (status) {
      case CivilStatus.Married:
        return [
          { description: 'Spouse', value: 'SPOUSE' },
          { description: 'Child', value: 'CHILD' },
        ];

      case CivilStatus.Widowed:
      case CivilStatus.Separated:
        return [{ description: 'Child', value: 'CHILD' }];

      case CivilStatus.Single:
        return [
          { description: 'Parent', value: 'PARENT' },
          { description: 'Sibling', value: 'SIBLING' },
        ];

      default:
        return [];
    }
  });


  addDependent() {
    this.policyHolderState.addDependent(); // delegate to your form builder logic
  }

  removeDependent(index: number) {
    this.policyHolderState.removeDependent(index);
  }

  continue(event: Event) {
    event.preventDefault();

    if (!this.form().valid()) {
      // mark every field as touched

      this.touchAll(this.form.dependents);

      setTimeout(() => {
        this.formService.focusFirstInvalid();
      });
      return;
    }

    this.overlayService.show();

    setTimeout(() => {
      this.router.navigate(['/family-shield/review']).then(() => this.overlayService.hide());
    }, 900);
  }

  touchAll(dependents: FieldTree<Dependent[], string>): void {
    for (const dep of dependents) {
      dep.firstName().markAsTouched();
      dep.lastName().markAsTouched();
      dep.birthDate.month().markAsTouched();
      dep.birthDate.day().markAsTouched();
      dep.birthDate.year().markAsTouched();
      dep.relationship().markAsTouched();
    }
  }
}
