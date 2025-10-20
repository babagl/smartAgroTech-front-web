import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: '',
  loadComponent: () => import('./layouts/core/main-layout/main-layout.component').then(m => m.MainLayoutComponent)
}];
