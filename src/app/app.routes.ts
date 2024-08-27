import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { Forbidden403Component } from './components/forbidden403/forbidden403.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/products/products.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserComponent } from './components/user/user.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'users',
    component: UserComponent,
  },
  {
    path: 'users/page/:page',
    component: UserComponent,
  },
  {
    path: 'users/create',
    component: UserFormComponent,
    //canActivate: [authGuard],
  },
  {
    path: 'users/edit/:id',
    component: UserFormComponent,
    //canActivate: [authGuard],
  },
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'forbidden',
    component: Forbidden403Component,
  },
  {
    path: 'products',
    component: ProductComponent,
  },
  {
    path: 'product/edit/:id',
    component: ProductComponent,
  },
];
