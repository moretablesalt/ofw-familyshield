import { Component } from '@angular/core';

@Component({
  selector: 'app-benefits',
  imports: [],
  templateUrl: './benefits.html',
  styleUrl: './benefits.scss',
})
export class Benefits {
  activeTab: 'package1' | 'package2' | 'package3' = 'package1';
}
