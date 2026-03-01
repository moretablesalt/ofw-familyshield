import { Component, input } from '@angular/core';
import { WithField } from '@angular/forms/signals';

@Component({
  selector: 'app-field-error-message',
  imports: [],
  templateUrl: './field-error-message.html',
  styleUrl: './field-error-message.scss',
})
export class FieldErrorMessage {

  errors = input.required<WithField<any>[]>();

}
