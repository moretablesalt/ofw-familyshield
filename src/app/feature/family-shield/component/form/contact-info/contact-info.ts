import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormService } from '../../../services/form/form.service';
import { Router } from '@angular/router';
import { OverlayService } from '../../../../../shared/ui/overlay/overlay.service';
import { DropDown } from '../../../../../shared/ui/drop-down/drop-down';
import { Input } from '../../../../../shared/ui/input/input';
import { PROVINCES } from '../../../../../core/constant/address/province-data';
import { REGIONS } from '../../../../../core/constant/address/region-data';
import { CITIES } from '../../../../../core/constant/address/city-data';
import { BarangayApi } from '../../../../../core/service/barangay-api';
import { Barangay } from '../../../../../core/model/barangay';

@Component({
  selector: 'app-contact-info',
  imports: [Input, DropDown],
  templateUrl: './contact-info.html',
  styleUrl: './contact-info.css',
})
export class ContactInfo {
  formService = inject(FormService);
  router = inject(Router);
  overlayService = inject(OverlayService);
  brgyApi = inject(BarangayApi);

  model = this.formService.state.formModel;

  form = this.formService.form.contactInfo;

  private barangays = signal<Barangay[]>([]);

  regionOptions = REGIONS.map((p) => ({
    value: p.code,
    description: p.name,
  }));

  provinceOptions = computed(() => {
    const regionCode = this.form.address.region().value();

    if (!regionCode) return [];

    return PROVINCES.filter((c) => c.regionCode === regionCode).map((c) => ({
      value: c.code,
      description: c.name,
    }));
  });

  cityOptions = computed(() => {
    const provinceCode = this.form.address.province().value();

    if (!provinceCode) return [];

    return CITIES.filter((c) => c.provinceCode === provinceCode).map((c) => ({
      value: c.code,
      description: c.name,
    }));
  });

  barangayOptions = computed(() =>
    this.barangays().map((b) => ({
      value: b.code,
      description: b.name,
    })),
  );

  zipCodeOptions = this.formService.state.ZIPCODE_OPTIONS;

  constructor() {
    effect(() => {
      const cityCode = this.form.address.city().value();

      if (!cityCode) {
        this.barangays.set([]);
        return;
      }

      this.brgyApi.getBarangays(cityCode).subscribe({
        next: (res) => {
          const sorted = res.sort((a, b) => a.name.localeCompare(b.name));
          this.barangays.set(sorted);
        },
        error: (err) => {
          console.error(err);
          this.barangays.set([]);
        },
      });
    });

    effect(() => {
      const barangayCode = this.form.address.barangay().value();

      this.form.address.zipCode().value.set('');

      if (!barangayCode) return;

      const brgy = this.barangays().find((b) => b.code === barangayCode);

      if (brgy?.zipCode) {
        this.form.address.zipCode().value.set(brgy.zipCode);
      }
    });
  }

  protected continue(event: Event) {
    event.preventDefault();

    if (!this.form().valid()) {
      // Address
      this.form.address.province().markAsTouched();
      this.form.address.city().markAsTouched();
      this.form.address.barangay().markAsTouched();
      this.form.address.zipCode().markAsTouched();
      this.form.address.street().markAsTouched();

      // Contact
      this.form.email().markAsTouched();
      this.form.mobile().markAsTouched();

      // Passport
      this.form.passportNo().markAsTouched();
      this.form.passportExpiryDate().markAsTouched();

      setTimeout(() => {
        this.formService.focusFirstInvalid();
      });

      return;
    }

    this.overlayService.show();

    // Fake delay (800ms–1200ms feels natural)
    setTimeout(() => {
      this.router
        .navigate(['/family-shield/form/employment-details'])
        .then(() => this.overlayService.hide());
    }, 900);
  }
}
