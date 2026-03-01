import { Component, effect, inject } from '@angular/core';
import { OverlayService } from './overlay.service';

@Component({
  selector: 'app-overlay',
  imports: [],
  templateUrl: './overlay.html',
  styleUrl: './overlay.scss',
})
export class Overlay {
  overlayService = inject(OverlayService);

  constructor() {
    effect(() => {
      this.overlayService.loading() ? document.body.style.overflow = 'hidden' : document.body.style.overflow = '';
    });
  }
}
