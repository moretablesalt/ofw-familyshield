import { Component, inject } from '@angular/core';
import { StepperService } from '../../../../../layout/stepper/stepper.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-success',
  imports: [],
  templateUrl: './success.html',
  styleUrl: './success.css',
})
export class Success {
  private readonly stepperService = inject(StepperService);
  private route = inject(ActivatedRoute);

  constructor() {
    this.stepperService.setActive(3);
  }

  // Converts the Observable paramMap into a Signal
  readonly policyNo = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('policyNo') ?? '')),
    { initialValue: '' },
  );
}
