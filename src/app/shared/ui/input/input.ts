import { Component, computed, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { FieldErrorMessage } from '../field-error-message/field-error-message';

@Component({
  selector: 'app-input',
  imports: [
    FormField,
    FieldErrorMessage
  ],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class Input {
  readonly id = input.required<string>();
  readonly fieldTree = input.required<FieldTree<string, string>>();
  readonly label = input.required();
  readonly type = input<string>('text');

  readonly field = computed(() => this.fieldTree()());

  readonly hasError = computed(() =>
    this.field().touched() && this.field().invalid()
  );

}
