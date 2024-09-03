import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadComponent: () => import('./main-container/main-container.component').then(
      (m) => m.MainContainerComponent,
    ),
  },
  {
    path: 'add-edit-user',
    loadComponent: () => import('./main-container/components/user-add-edit/user-add-edit.component').then(
      (m) => m.UserAddEditComponent
    ),
  },
  {
    path: 'add-edit-user/:id',
    loadComponent: () => import('./main-container/components/user-add-edit/user-add-edit.component').then(
      (m) => m.UserAddEditComponent
    ),
  },
];
