import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StepperService {
  private _activeStep = signal(0);
  activeStep = this._activeStep.asReadonly();

  setActive(step: number) {
    this._activeStep.set(step);
  }
}
