import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginPageComponent } from './views/login/login-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserModule } from 'src/app/modules/user/user.module';
import { FormsModule } from 'src/app/modules/forms/forms.module';

@NgModule({
  declarations: [LoginComponent, LoginPageComponent],
  imports: [CommonModule, LoginRoutingModule, FormsModule, SharedModule, UserModule],
})
export class LoginModule {}
