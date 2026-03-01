import { inject, Injectable } from '@angular/core';
import { form } from '@angular/forms/signals';
import { PolicyHolderStateService } from './policy-holder-state.service';
import { PolicyHolderSchemaService } from './policy-holder-schema.service';
import { PolicyHolderPersistenceService } from './policy-holder-persistence.service';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  state = inject(PolicyHolderStateService);
  schema = inject(PolicyHolderSchemaService);
  persistence = inject(PolicyHolderPersistenceService);

  readonly form = form(this.state.formModel, (path) => this.schema.build(path));

  constructor() {
    this.persistence.init(this.state);
  }

  clearSession() {
    this.persistence.clear(this.state);
  }

  focusFirstInvalid() {
    const el = document.querySelector(
      '.field.error input, .field.error select',
    ) as HTMLElement | null;

    el?.focus();
  }
}

