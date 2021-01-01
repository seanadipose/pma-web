import { InjectionToken } from '@angular/core';
import { VALIDATION_MESSAGES } from '../constants/validation-messages.constant';

export const PMA_VALIDATION_MESSAGES = new InjectionToken<typeof VALIDATION_MESSAGES>('Main Nav list');
