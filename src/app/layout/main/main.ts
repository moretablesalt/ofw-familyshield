import { Component } from '@angular/core';
import { Hero } from './hero/hero';
import { Benefits } from './benefits/benefits';
import { CoverageBanner } from './coverage-banner/coverage-banner';
import { QuickTips } from './quick-tips/quick-tips';
import { WhyTrustUs } from './why-trust-us/why-trust-us';
import {Faqs} from './faqs/faqs';

@Component({
  selector: 'app-main',
  imports: [
    Hero,
    Benefits,
    CoverageBanner,
    QuickTips,
    WhyTrustUs,
    Faqs
  ],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {

}
