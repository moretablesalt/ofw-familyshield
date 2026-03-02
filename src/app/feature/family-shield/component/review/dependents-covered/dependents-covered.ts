import { Component, computed, inject } from '@angular/core';
import { FormService } from '../../../services/form/form.service';
import { Dependent } from '../../../model/dependent.model';

@Component({
  selector: 'app-dependents-covered',
  imports: [],
  templateUrl: './dependents-covered.html',
  styleUrl: './dependents-covered.css',
})
export class DependentsCovered {
  private formService = inject(FormService);

  // Fully reactive model
  model = computed(() => this.formService.state.formModel());

  // Reactive dependents list
  dependents = computed(() => this.model().dependents ?? []);

  fullName = (dependent: Dependent): string => {
    return [dependent.firstName, dependent.middleInitial, dependent.lastName]
      .filter(Boolean)
      .join(' ');
  };

  dobPretty = (dependent: Dependent): string => {
    const dob = dependent?.birthDate;

    if (!dob?.month || !dob?.day || !dob?.year) return '';

    const date = new Date(Number(dob.year), Number(dob.month) - 1, Number(dob.day));

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
}
