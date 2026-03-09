import { Routes } from '@angular/router';
import { Main } from './layout/main/main';

export const routes: Routes = [
  {
    path: '',
    component: Main,
  },
  {
    path: 'family-shield',
    loadComponent: () =>
      import('./feature/family-shield/family-shield').then((m) => m.FamilyShield),
    children: [
      { path: '', redirectTo: 'form', pathMatch: 'full' },
      {
        path: 'form',
        loadComponent: () =>
          import('./feature/family-shield/component/form/form').then((m) => m.Form),
        children: [
          {
            path: '',
            redirectTo: 'personal-details',
            pathMatch: 'full',
          },
          {
            path: 'personal-details',
            loadComponent: () =>
              import('./feature/family-shield/component/form/personal-details/personal-details').then(
                (m) => m.PersonalDetails,
              ),
          },
          {
            path: 'contact-info',
            loadComponent: () =>
              import('./feature/family-shield/component/form/contact-info/contact-info').then(
                (m) => m.ContactInfo,
              ),
          },
          {
            path: 'employment-details',
            loadComponent: () =>
              import('./feature/family-shield/component/form/employment-details/employment-details').then(
                (m) => m.EmploymentDetails,
              ),
          },
          {
            path: 'dependents',
            loadComponent: () =>
              import('./feature/family-shield/component/form/dependents/dependents').then(
                (m) => m.Dependents,
              ),
          },
        ],
      },
      {
        path: 'review',
        loadComponent: () =>
          import('./feature/family-shield/component/review/review').then((m) => m.Review),
      },
      {
        path: 'payment-success/:policyNo',
        loadComponent: () =>
          import('./feature/family-shield/component/payment/success/success').then(
            (m) => m.Success,
          ),
      },
      {
        path: 'payment-fail',
        loadComponent: () =>
          import('./feature/family-shield/component/payment/fail/fail').then((m) => m.Fail),
      },
    ],
  },
];
