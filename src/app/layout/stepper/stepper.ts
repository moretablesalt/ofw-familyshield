import { Component, inject } from '@angular/core';
import { StepperService } from './stepper.service';
import { Router } from '@angular/router';

export interface Step {
  label: string;
  route: string;
}

@Component({
  selector: 'app-stepper',
  imports: [],
  templateUrl: './stepper.html',
  styleUrl: './stepper.css',
})
export class Stepper {
  protected readonly stepperService = inject(StepperService);
  private readonly router = inject(Router);

  readonly activeStep = this.stepperService.activeStep;

  readonly steps: Step[] = [
    { label: 'Quote', route: '/' },
    { label: 'Personal Info', route: '/direct/form' },
    { label: 'Review & Payment', route: '/direct/review' },
    { label: 'Confirmation', route: '/direct/confirmation' },
  ];

  canJumpToStep(index: number): boolean {
    const current = this.activeStep();
    // Logic: Only allow clicking previous steps, and not if we are on the final confirmation
    return index < current && current < this.steps.length - 1;
  }

  goToStep(index: number) {
    if (this.canJumpToStep(index)) {
      this.router.navigate([this.steps[index].route]);
    }
  }
}
