import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { filter, switchMap, takeWhile } from 'rxjs/operators';
import { AuthService } from './modules/user/services/auth.service';
import { LoadingService } from './core/services/loading.service';
import { StateService } from './core/services/state-service';

@Component({
  selector: 'pma-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <pma-navigation *ngIf="userId$ | async as id" [userId]="id">
      <router-outlet></router-outlet>
    </pma-navigation>

    <ngx-spinner></ngx-spinner>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Progressive Mental Alignment';
  isReady = false;
  userId$: Observable<string>;
  // userId$: any;

  constructor(
    private authSvc: AuthService,
    private stateSvc: StateService,
    private router: Router,
    private loadingSvc: LoadingService
  ) {}

  ngOnInit() {
    const userId = this.authSvc.checkUser().pipe(
      // filter((id) => typeof id === 'string'),
      switchMap((id) => this.stateSvc.init(id))
      // takeWhile((val) => !!val)
    );
    // .subscribe((res) => {
    //   console.log('loaded');
    //   this.stateSvc.setUserId(res ? res : '');
    //   this.isReady = !!res;
    // });
    this.userId$ = userId;
  }
}
