import { Component, Host, OnInit, Optional } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { PmaInputComponent } from '../pma-input/pma-input.component';

@Component({
  selector: 'pma-location-input',
  template: `
    <mat-form-field [formGroup]="form.control" [appearance]="appearance" fxFlexFill>
      <mat-label> {{ label }} </mat-label>
      <input matInput #inputField="matInput" [formControlName]="name" type="text" [disabled]="true" />
      <button mat-button matSuffix mat-icon-button (click)="this.getLocation()">
        <mat-icon>{{ this.control.value ? 'close' : 'my_location' }}</mat-icon>
      </button>
      <mat-error>{{ form.control.get(name)['errorMessage'] }}</mat-error>
    </mat-form-field>
  `,
  styleUrls: ['./location-input.component.scss'],
  exportAs: 'locationInput',
})
export class LocationInputComponent extends PmaInputComponent implements OnInit {
  get control() {
    return this.form.control.get(this.name);
  }
  lat;
  lng;
  constructor(@Optional() @Host() public form: ControlContainer) {
    super(form);
  }

  ngOnInit(): void {
    const ctrl = this.control;
    ctrl.disable();
  }

  getLocation() {
    if (this.control.value) {
      return this.control.patchValue(null);
    }
    if (navigator.geolocation) {
      console.log(navigator);
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          if (position) {
            console.log('Latitude: ' + position.coords.latitude + 'Longitude: ' + position.coords.longitude);
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            console.log(this.lat);
            console.log(this.lat);
            const ctrl = this.form.control.get(this.name);
            ctrl.patchValue([this.lat, this.lng]);

            ctrl.updateValueAndValidity({ onlySelf: false, emitEvent: true });
          }
        },
        (error: any) => console.log(error)
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
}
