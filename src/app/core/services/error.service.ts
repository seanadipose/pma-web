import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LogLevels } from '../enums/enums/log-levels.enum';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private _snackBar: MatSnackBar) {}

  log(lvl: keyof typeof LogLevels, opts: { message: string } = { message: 'An error has occurred. Please try again' }) {
    const { message } = opts;
    console.log(this);
    const ref = this._snackBar.open(message, 'OK', {
      duration: 5000,
      // color: 'accent'
    });

    return ref.afterDismissed();
  }
}
