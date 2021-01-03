import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CoreModule } from './core/core.module';

import { NAV_LIST } from './core/constants/navlist.constant';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';

import * as R from 'remeda';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatNativeDateModule } from '@angular/material/core';
import { AgmCoreModule } from '@agm/core';
import { Loader } from '@googlemaps/js-api-loader';

import {
  NgxBootstrapIconsModule,
  alarm,
  alarmFill,
  alignBottom,
  emojiAngryFill,
  emojiAngry,
  allIcons,
} from 'ngx-bootstrap-icons';
// Select some icons (use an object, not an array)
const icons = {
  alarm,
  alarmFill,
  alignBottom,
  emojiAngryFill,
  emojiAngry,
};

const navList = R.concat(NAV_LIST, []);

@NgModule({
  declarations: [AppComponent, NavigationComponent],
  imports: [
    BrowserModule,
    MatNativeDateModule,

    CoreModule.forRoot(navList),
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBLhvZLX4rxcz_6GjJXn0ED5qUJuEm1A0w',
    }),
    FlexLayoutModule,
    MatMenuModule,
    NgxSpinnerModule,
    NgxBootstrapIconsModule.pick(allIcons),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [NgxBootstrapIconsModule],
})
export class AppModule {}
