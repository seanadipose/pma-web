import { MAT_SNACK_BAR_DEFAULT_OPTIONS_FACTORY } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

const defaults = MAT_SNACK_BAR_DEFAULT_OPTIONS_FACTORY();

defaults.duration = environment.timeout;
defaults.announcementMessage = 'Announcement';

export const snackBarConfig = { defaults };


const test = [ defaults, defaults ] as const;

// test.map(itm => itm.)
