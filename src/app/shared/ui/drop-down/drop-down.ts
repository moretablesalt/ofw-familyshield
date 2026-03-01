import { Component, computed, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { FieldErrorMessage } from '../field-error-message/field-error-message';

export interface SelectOption {
  description: string;
  value: string;
}

@Component({
  selector: 'app-drop-down',
  imports: [
    FormField,
    FieldErrorMessage,
  ],
  templateUrl: './drop-down.html',
  styleUrl: './drop-down.scss',
})
export class DropDown {
  readonly id = input.required<string>();
  readonly fieldTree = input.required<FieldTree<string>>();
  readonly label = input.required();
  readonly options = input.required<SelectOption[]>();

  readonly field = computed(() => this.fieldTree()());

  readonly hasError = computed(() =>
    this.field().touched() && this.field().invalid()
  );

}
