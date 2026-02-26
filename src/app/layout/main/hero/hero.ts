import { Component, signal } from '@angular/core';
import { Quote } from './quote/quote';

@Component({
  selector: 'app-hero',
  imports: [
    Quote
  ],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {

  isMobile = signal(window.innerWidth <= 768);

  constructor() {
    window.addEventListener('resize', () => {
      this.isMobile.set(window.innerWidth <= 768);
    });
  }
}
