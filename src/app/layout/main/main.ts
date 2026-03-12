import { Component } from '@angular/core';
import { Hero } from './hero/hero';
import { Benefits } from './benefits/benefits';
import {Faqs} from './faqs/faqs';

@Component({
  selector: 'app-main',
  imports: [
    Hero,
    Benefits,
    Faqs
  ],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {

}
