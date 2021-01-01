import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomePageComponent } from './views/home/home-page.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserModule } from 'src/app/modules/user/user.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from 'src/app/modules/forms/forms.module';

@NgModule({
  declarations: [HomeComponent, HomePageComponent, UserFormComponent],
  imports: [CommonModule, HomeRoutingModule, UserModule, SharedModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
