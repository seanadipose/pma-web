import { Inject, Injectable } from '@angular/core';
import { IFormGroup, ReactiveFormConfig, RxFormBuilder } from '@rxweb/reactive-form-validators';
import { ValidationMessagesType } from 'src/app/core/constants/validation-messages.constant';
import { PMA_VALIDATION_MESSAGES } from 'src/app/core/tokens/validation-messages.token';

@Injectable({
  providedIn: 'root',
})
export class PmaFormsService {
  get validationMessage() {
    return this.validation;
  }
  constructor(@Inject(PMA_VALIDATION_MESSAGES) private validation: ValidationMessagesType, private fb: RxFormBuilder) {
    ReactiveFormConfig.set({ validationMessage: { ...validation } });
  }

  makeForm<T>(model: T): IFormGroup<T> {
    return this.fb.formGroup(model) as IFormGroup<T>;
  }
}
