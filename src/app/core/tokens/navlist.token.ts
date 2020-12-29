import { InjectionToken } from '@angular/core';
import { NavlistItem } from '../models/navlist-item.model';

export const PMA_NAV_LIST = new InjectionToken<NavlistItem[]>('Main Nav list');
