import { Injectable } from '@angular/core';
import { maxDate, maxLength, minLength, prop, required } from '@rxweb/reactive-form-validators';
import { Journal } from 'src/app/core/models/journal.model';
import { BaseForm } from 'src/app/modules/forms/models/base-form.model';

const date = new Date();
const hours = date.getHours();
const minutes = date.getMinutes();
const now = `${hours}:${minutes}`;
export interface JournalForm extends Journal {}

@Injectable({ providedIn: 'any' })
export class JournalForm extends BaseForm {
  @required(BaseForm.requiredErrorMessage('location'))
  place: string;

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

  @required(BaseForm.requiredErrorMessage('Date'))
  // @maxDate({ value: new Date() })
  dateTime: Date = new Date();

  @prop()
  time = now;

  @required()
  rating: number = 5;
}
