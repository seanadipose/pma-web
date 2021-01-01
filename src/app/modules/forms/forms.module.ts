import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { clone } from 'remeda';
import { VALIDATION_MESSAGES } from 'src/app/core/constants/validation-messages.constant';
import { PMA_VALIDATION_MESSAGES } from 'src/app/core/tokens/validation-messages.token';
import { PmaFormsService } from './services/pma-forms.service';
import { PmaInputComponent } from './components/pma-input/pma-input.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';

const MAT_MODULES = [MatFormFieldModule, MatInputModule];
const validations = clone(VALIDATION_MESSAGES);

const components = [PmaInputComponent];

@NgModule({
  declarations: [...components, PasswordInputComponent],
  imports: [CommonModule, ReactiveFormsModule, RxReactiveFormsModule, ...MAT_MODULES],
  exports: [ReactiveFormsModule, RxReactiveFormsModule, ...MAT_MODULES, ...components, PasswordInputComponent],
  providers: [{ provide: PMA_VALIDATION_MESSAGES, useValue: validations }, PmaFormsService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FormsModule {}
