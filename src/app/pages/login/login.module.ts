import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginPageComponent } from './views/login/login-page.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, LoginPageComponent],
  imports: [CommonModule, LoginRoutingModule, MatCardModule, FormsModule],
})
export class LoginModule {}
