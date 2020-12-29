import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { PMA_NAV_LIST } from './tokens/navlist.token';
import { NAV_LIST } from './constants/navlist.constant';
import { NavlistItem } from './models/navlist-item.model';

@NgModule({
  declarations: [],
  imports: [CommonModule],
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
      providers: [{ provide: PMA_NAV_LIST, useValue: navList }],
    };
  }
}
