import { InjectionToken } from '@angular/core';
import { UserFieldsType } from 'src/app/modules/user/constants/user-fields.constant';

export const USER_FIELDS_TOKEN = new InjectionToken<UserFieldsType>('Main Nav list');
