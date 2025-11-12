import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: '',
  loadComponent: () => import('./layouts/core/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
  children:[
    {
        path: '',
        redirectTo: 'fields',
        pathMatch: 'full'
      },
      {
        path: 'fields',
        loadComponent: () =>
          import('./pages/fields/fields.component').then((m) => m.FieldsComponent)
      },
  ]
}];
