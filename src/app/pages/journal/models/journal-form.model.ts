import { Injectable } from '@angular/core';
import { maxDate, maxLength, minLength, prop, required } from '@rxweb/reactive-form-validators';
import { Journal } from 'src/app/core/models/journal.model';
import { BaseForm } from 'src/app/modules/forms/models/base-form.model';

export interface JournalForm extends Journal {}

@Injectable({ providedIn: 'any' })
export class JournalForm extends BaseForm {
  @required(BaseForm.requiredErrorMessage('location'))
  location: string;

  @required(BaseForm.requiredErrorMessage('title'))
  @minLength({ value: 5 })
  @maxLength({ value: 300 })
  title: string;

  // @required()
  @prop()
  emotions: string[];

  @prop()
  geoloc: string;

  @prop()
  description: string;

  @required()
  @maxDate({ value: BaseForm.tomorrow })
  dateTime: Date;

  @required()
  rating: number;
}
