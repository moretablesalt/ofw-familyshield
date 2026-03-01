import { Component } from '@angular/core';
import { Stepper } from '../../layout/stepper/stepper';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-family-shield',
  imports: [Stepper, RouterOutlet],
  templateUrl: './family-shield.html',
  styleUrl: './family-shield.css',
})
export class FamilyShield {}
