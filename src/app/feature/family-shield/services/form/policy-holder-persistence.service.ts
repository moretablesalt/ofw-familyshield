import { effect, Injectable } from '@angular/core';
import { PolicyHolderStateService } from './policy-holder-state.service';
import { PolicyHolder } from '../../model/policy-holder/policy-holder.model';

@Injectable({
  providedIn: 'root',
})
export class PolicyHolderPersistenceService {
  private readonly STORAGE_KEY = 'directForm.policyHolder';

  init(state: PolicyHolderStateService) {
    this.rehydrate(state);

    effect(() => {
      const value = state.formModel();
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(value));
    });
  }

  clear(state: PolicyHolderStateService) {
    sessionStorage.removeItem(this.STORAGE_KEY);
    state.reset();
  }

  private rehydrate(state: PolicyHolderStateService) {
    const raw = sessionStorage.getItem(this.STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as Partial<PolicyHolder>;
      const defaults = state.createInitialPolicyHolder(); // 👈 expose this

      const merged: PolicyHolder = {
        ...defaults,
        ...parsed,

        personalInfo: {
          ...defaults.personalInfo,
          ...parsed.personalInfo,
          birthDate: {
            ...defaults.personalInfo.birthDate,
            ...parsed.personalInfo?.birthDate,
          },
        },

        contactInfo: {
          ...defaults.contactInfo,
          ...parsed.contactInfo,
          address: {
            ...defaults.contactInfo.address,
            ...parsed.contactInfo?.address,
          },
        },

        employmentInfo: {
          ...defaults.employmentInfo,
          ...parsed.employmentInfo,
        },
      };

      state.formModel.set(merged);
    } catch {
      sessionStorage.removeItem(this.STORAGE_KEY);
    }
  }
}
