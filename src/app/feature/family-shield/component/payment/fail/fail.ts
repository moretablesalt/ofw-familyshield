import { Component, inject } from '@angular/core';
import { StepperService } from '../../../../../layout/stepper/stepper.service';
import { retry } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fail',
  imports: [],
  templateUrl: './fail.html',
  styleUrl: './fail.css',
})
export class Fail {
  private readonly stepperService = inject(StepperService);
  private readonly router = inject(Router);

  constructor() {
    this.stepperService.setActive(3);
  }

  retry = () => {
    this.router.navigate(['/family-shield/review']);
  }
}
