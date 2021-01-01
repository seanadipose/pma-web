import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginPageComponent } from './views/login/login-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    children: [
      {
        path: '',
        component: LoginPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
