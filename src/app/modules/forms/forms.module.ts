import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSliderModule } from '@angular/material/slider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { clone } from 'remeda';
import { VALIDATION_MESSAGES } from 'src/app/core/constants/validation-messages.constant';
import { PMA_VALIDATION_MESSAGES } from 'src/app/core/tokens/validation-messages.token';
import { PmaFormsService } from './services/pma-forms.service';
import { PmaInputComponent } from './components/pma-input/pma-input.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { DateInputComponent } from './components/date-input/date-input.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PmaTextboxInputComponent } from './components/pma-textbox-input/pma-textbox-input.component';
import { LocationInputComponent } from './components/location-input/location-input.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SelectInputComponent } from './components/select-input/select-input.component';
import { MatSelectModule } from '@angular/material/select';
import { AutocompleteInputComponent } from './components/autocomplete-input/autocomplete-input.component';
import { IconPickerInputComponent } from './components/icon-picker-input/icon-picker-input.component';
import { IconButtonDirective } from './directives/icon-button.directive';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { FlexLayoutModule } from '@angular/flex-layout';

const MAT_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatStepperModule,
  MatStepperModule,
  MatSelectModule,
  MatSliderModule,
  MatAutocompleteModule,
  MatNativeDateModule,
  ReactiveFormsModule,
  RxReactiveFormsModule,
  MatIconModule,
  MatButtonModule,
  NgxBootstrapIconsModule,
  FlexLayoutModule,
];
const validations = clone(VALIDATION_MESSAGES);

const components = [
  PmaInputComponent,
  AutocompleteInputComponent,

  PasswordInputComponent,
  DateInputComponent,
  PmaTextboxInputComponent,
  LocationInputComponent,
  SelectInputComponent,
  IconPickerInputComponent,
];
const directives = [IconButtonDirective];

@NgModule({
  declarations: [...components, ...directives],
  imports: [CommonModule, ...MAT_MODULES],
  exports: [...MAT_MODULES, ...components],
  providers: [{ provide: PMA_VALIDATION_MESSAGES, useValue: validations }, PmaFormsService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FormsModule {
  constructor() {}
}
