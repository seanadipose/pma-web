import { ComponentType } from '@angular/cdk/portal';
import { Component, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { pipe, Subject, timer } from 'rxjs';
import { shareReplay, take, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadSubj = new Subject<boolean>();
  getLoadSub = () => this.loadSubj.pipe(shareReplay(1));
  spinnerActive = false;

  constructor(private spinner: NgxSpinnerService, private _snackBar: MatSnackBar) {}

  start() {
    if (this.spinnerActive) this.hide();
    this.spinnerActive = true;
    this.spinner.show();

    timer(5000)
      .pipe(take(1), takeUntil(this.getLoadSub()))
      .subscribe(() => this.spinner.hide());
  }

  hide() {
    this.spinner.hide();
    this.loadSubj.next(true);
    this.spinnerActive = false;
  }

  customComponent<T extends Component>(component: ComponentType<T>) {
    return this._snackBar.openFromComponent(component);
  }

  responseSnackBar(isSuccess = true) {
    return this._snackBar.open(isSuccess ? 'Successful!' : 'Something went wrong, try again', 'close').afterDismissed();
  }
}
