import { Component, inject } from '@angular/core';
import { StepperService } from '../../../../layout/stepper/stepper.service';

@Component({
  selector: 'app-confirmation',
  imports: [],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.css',
})
export class Confirmation {
  private readonly stepperService = inject(StepperService);

  constructor() {
    this.stepperService.setActive(3);
  }
}
