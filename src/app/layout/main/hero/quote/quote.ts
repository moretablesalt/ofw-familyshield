import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
// import { DirectQuoteService } from '../../../../feature/direct/services/direct-quote.service';
import { DecimalPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.html',
  styleUrl: './quote.scss',
  imports: [DecimalPipe],
})
export class Quote {
  // ===== STATE =====
  status = signal<string>('');
  familyLevel = signal<number>(1);
  personalLevel = signal<number>(0);
  error = signal<string>('');

  // ===== CALCULATIONS =====
  calculateSpouse(level: number) {
    return 200000 + (level - 1) * 100000;
  }

  calculateOther(level: number) {
    return 100000 + (level - 1) * 50000;
  }

  calculatePersonal(level: number) {
    return level * 100000;
  }

  calculateFamilyPremium(level: number) {
    return 1000 + (level - 1) * 500;
  }

  totalPremium = computed(() => {
    const familyPremium = this.calculateFamilyPremium(this.familyLevel());
    const personalPremium = this.personalLevel() * 800;
    return familyPremium + personalPremium;
  });

  breakdown = computed(() => {
    const status = this.status();
    const familyLevel = this.familyLevel();
    const personalLevel = this.personalLevel();

    if (!status) return null;

    const spouse = this.calculateSpouse(familyLevel);
    const other = this.calculateOther(familyLevel);
    const personal = this.calculatePersonal(personalLevel);

    const sections: any[] = [];

    // FAMILY SECTION
    const familyRows: { label: string; amount: number }[] = [];

    if (status === 'Married') {
      familyRows.push({ label: 'Spouse', amount: spouse });
      familyRows.push({ label: 'Children (each, up to 4)', amount: other });
    }

    if (status === 'Single') {
      familyRows.push({ label: 'Parents & Siblings (each)', amount: other });
    }

    if (status === 'Widowed') {
      familyRows.push({ label: 'Children (each, up to 4)', amount: other });
    }

    if (familyRows.length) {
      sections.push({
        title: 'Family Protection',
        rows: familyRows,
      });
    }

    // PERSONAL SECTION
    if (personalLevel > 0) {
      sections.push({
        title: 'Personal Protection',
        rows: [{ label: 'OFW Personal Shield', amount: personal }],
      });
    }

    return sections;
  });

  validate() {
    if (!this.status()) {
      this.error.set('Please select civil status.');
      return;
    }

    this.error.set('');
    alert('Proceeding to checkout...');
  }
}
