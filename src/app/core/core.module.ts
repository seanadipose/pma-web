import { inject, InjectionToken, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { PMA_NAV_LIST } from './tokens/navlist.token';
import { NavlistItem } from './models/navlist-item.model';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/errors.interceptor';
import { LoaderInterceptor } from './interceptors/loader.interceptor';

import { snackBarConfig } from './tokens/snackbar.token';
import { AuthService } from '../modules/user/services/auth.service';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { UserModule } from '../modules/user/user.module';
import { USER_FIELDS_TOKEN } from './tokens/user-fields.token';

import { USER_FIELDS } from '../modules/user/constants/user-fields.constant';

import * as R from 'remeda';
import { StateService } from './services/state-service';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';

const userFields = R.concat(USER_FIELDS);
const config = snackBarConfig.defaults;
export const WINDOW = new InjectionToken<Window>(
  'An abstraction over global window object',
  {
    factory: () => inject(DOCUMENT).defaultView!
  },
);
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(environment.firebase),

    AngularFirestoreModule,
    AngularFireAuthModule,
    UserModule,
    MatIconModule,
  ],
  exports: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() coreModule: CoreModule) {
    if (coreModule) {
      throw new TypeError(`core module imported twice`);
    }
  }

  static forRoot(navList: NavlistItem[]): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: PMA_NAV_LIST, useValue: navList },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: config },
        { provide: USER_FIELDS_TOKEN, useValue: userFields },
        {provide: WINDOW},

        AngularFireAuth,
        AuthService,
        StateService,
      ],
    };
  }
}
