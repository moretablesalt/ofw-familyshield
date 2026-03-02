import { Component, inject } from '@angular/core';
import { FormService } from '../../../services/form/form.service';
import { PolicyHolderStateService } from '../../../services/form/policy-holder-state.service';
import { Router } from '@angular/router';
import { OverlayService } from '../../../../../shared/ui/overlay/overlay.service';
import { DropDown, SelectOption } from '../../../../../shared/ui/drop-down/drop-down';
import { Input } from '../../../../../shared/ui/input/input';

@Component({
  selector: 'app-dependents',
  imports: [Input, DropDown],
  templateUrl: './dependents.html',
  styleUrl: './dependents.css',
})
export class Dependents {
  private readonly formService = inject(FormService);
  readonly state = inject(PolicyHolderStateService);
  private readonly router = inject(Router);
  private readonly overlayService = inject(OverlayService);

  form = this.formService.form;

  relationshipOptions: SelectOption[] = [
    { description: 'Spouse', value: 'SPOUSE' },
    { description: 'Child', value: 'CHILD' },
    { description: 'Parent', value: 'PARENT' },
  ];

  addDependent() {
    this.state.addDependent(); // delegate to your form builder logic
  }

  removeDependent(index: number) {
    this.state.removeDependent(index);
  }

  continue(event: Event) {
    event.preventDefault();

    if (!this.form().valid()) {

      // mark every field as touched

      setTimeout(() => {
        this.formService.focusFirstInvalid();
      });
      return;
    }

    this.overlayService.show();

    setTimeout(() => {
      this.router.navigate(['/family-shield/form/review']).then(() => this.overlayService.hide());
    }, 900);
  }
}
