import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StepperService } from '../../../../layout/stepper/stepper.service';

@Component({
  selector: 'app-form',
  imports: [RouterOutlet],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  private stepperService = inject(StepperService);

  constructor() {
    this.stepperService.setActive(1);
  }
}
