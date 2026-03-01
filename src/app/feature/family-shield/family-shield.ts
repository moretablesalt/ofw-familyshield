import { Component } from '@angular/core';
import { Stepper } from '../../layout/stepper/stepper';
import { RouterOutlet } from '@angular/router';
import { PremiumSummaryBar } from '../../layout/premium-summary-bar/premium-summary-bar';

@Component({
  selector: 'app-family-shield',
  imports: [Stepper, RouterOutlet, PremiumSummaryBar],
  templateUrl: './family-shield.html',
  styleUrl: './family-shield.css',
})
export class FamilyShield {}
