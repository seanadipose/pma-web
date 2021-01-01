import { Inject, Injectable } from '@angular/core';
import { ReactiveFormConfig } from '@rxweb/reactive-form-validators';
import { ValidationMessagesType } from 'src/app/core/constants/validation-messages.constant';
import { PMA_VALIDATION_MESSAGES } from 'src/app/core/tokens/validation-messages.token';

@Injectable({
  providedIn: 'root',
})
export class PmaFormsService {
  get validationMessage() {
    return this.validation;
  }
  constructor(@Inject(PMA_VALIDATION_MESSAGES) private validation: ValidationMessagesType) {
    ReactiveFormConfig.set({ validationMessage: { ...validation } });
    // this.cfg.set(JSON.stringify(PMA_VALIDATION_MESSAGES));
    // this.fbConfig.
  }
}
