import { Routes } from '@angular/router';
import { Main } from './layout/main/main';

export const routes: Routes = [
  {
    path: '',
    component: Main,
  },
  {
    path: 'family-shield',
    loadComponent: ()=> import('./feature/family-shield/family-shield').then(m => m.FamilyShield),
    children: [
      { path: '', redirectTo: 'form', pathMatch: 'full' },
      {
        path: 'form',
        loadComponent: () => import('./feature/family-shield/form/form').then(m => m.Form),
        // children: [
        //   {
        //     path: '',
        //     redirectTo: 'personal-details',
        //     pathMatch: 'full'
        //   },
        // ]
      }
    ],
  }
]
