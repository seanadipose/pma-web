import { Component, Inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavlistItem } from '../core/models/navlist-item.model';
import { PMA_NAV_LIST } from '../core/tokens/navlist.token';

@Component({
  selector: 'pma-navigation',
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav
        #drawer
        class="sidenav"
        fixedInViewport
        [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
        [mode]="(isHandset$ | async) ? 'over' : 'side'"
        [opened]="(isHandset$ | async) === false"
      >
        <mat-toolbar color="primary" class="menu-toolbar">Menu</mat-toolbar>
        <mat-nav-list>
          <mat-list-item *ngFor="let listItem of navList">
            <a [routerLink]="listItem.link">{{ listItem.label | titlecase }}</a>
          </mat-list-item>
          <!-- <a mat-list-item href="#">Link 3</a> -->
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <button
            type="button"
            aria-label="Toggle sidenav"
            mat-icon-button
            (click)="drawer.toggle()"
            *ngIf="isHandset$ | async"
          >
            <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
          </button>
          <span>Progressive Mental Alignment</span>
        </mat-toolbar>
        <!-- Add Content Here -->
        <ng-content></ng-content>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );

  constructor(@Inject(PMA_NAV_LIST) public navList: NavlistItem[], private breakpointObserver: BreakpointObserver) {}
}
