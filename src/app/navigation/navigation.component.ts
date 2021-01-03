import { Component, Host, Inject, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavlistItem } from '../core/models/navlist-item.model';
import { PMA_NAV_LIST } from '../core/tokens/navlist.token';
import { AuthService } from '../modules/user/services/auth.service';
import { StateService } from '../core/services/state-service';
import { LoadingService } from '../core/services/loading.service';

@Component({
  selector: 'pma-navigation',
  template: `
    <ng-container *ngIf="isReady">
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
          <mat-nav-list fxLayout="column" fxLayoutGap="5px">
            <mat-list-item
              *ngFor="let listItem of navList"
              fxFlex="100%"
              fxFlexFill
              fxLayout="row"
              fxLayoutAlign="space-between start"
            >
              <a [routerLink]="listItem.link" fxFlexFill mat-line routerLinkActive="active" #rla="routerLinkActive">{{
                listItem.label | titlecase
              }}</a>
              <mat-icon mat-list-icon [class.active]="rla.isActive"> {{ listItem.icon }}</mat-icon>
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
            <div class="toolbar-spacer"></div>
            <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Example icon-button with a menu">
              <mat-icon>face</mat-icon>
            </button>
          </mat-toolbar>
          <!-- Add Content Here -->
          <ng-content></ng-content>
        </mat-sidenav-content>
      </mat-sidenav-container>

      <mat-menu #menu="matMenu">
        <button mat-menu-item>
          <mat-icon>dialpad</mat-icon>
          <span>New</span>
        </button>
        <button mat-menu-item disabled>
          <mat-icon>voicemail</mat-icon>
          <span>Check voice mail</span>
        </button>
        <button mat-menu-item>
          <mat-icon>notifications_off</mat-icon>
          <span>Disable alerts</span>
        </button>
      </mat-menu>
    </ng-container>
  `,
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  isReady = false;
  // @Input('userId') setUserId(id: string) {

  // }

  @Input() userId: string;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );

  constructor(
    @Inject(PMA_NAV_LIST) public navList: NavlistItem[],
    private breakpointObserver: BreakpointObserver,
    private stateSvc: StateService,
    private loadSvc: LoadingService
  ) {}

  ngOnInit(): void {
    this.stateSvc.setUserId(this.userId);
    this.isReady = true;
  }
}
