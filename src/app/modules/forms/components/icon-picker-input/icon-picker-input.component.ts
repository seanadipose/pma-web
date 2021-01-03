import { Component, EventEmitter, Host, Input, OnInit, Optional, Output } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { PmaInputComponent } from '../pma-input/pma-input.component';
import { IconNamesEnum as Icons } from 'ngx-bootstrap-icons';

import * as R from 'remeda';
// const cloned = IconNamesEnum as const
// type iconstype = typeof cloned

export const iconTuple = (name: string) => {
  return [name, `${name}-fill`];
};

export const iconList = [
  Icons.EmojiAngry,
  Icons.EmojiFrown,
  Icons.EmojiExpressionless,
  Icons.EmojiSmile,
  Icons.EmojiSunglasses,
];

function mapIcons(icons: string[]) {
  return icons.map((icon) => iconTuple(icon));
}

@Component({
  selector: 'pma-icon-picker-input',
  template: `
    <div fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="15px">
      <button
        mat-icon-button
        pmaIconButton
        (click)="rating = i"
        *ngFor="let icon of ratingsIcons; index as i"
        color="{{ rating >= i ? 'success' : undefined }}"
      >
        <!-- <mat-icon [inline]="true" appearance="outline" color="{{ _value >= i ? 'success' : undefined }}">
        {{ icon }}</mat-icon
      > -->
        <i-bs name="{{ rating >= i ? icon[1] : icon[0] }}" width="2.5rem" height="2.5rem"> </i-bs>
      </button>
      <mat-error><ng-content select="icon-error"></ng-content></mat-error>
    </div>
  `,
  styleUrls: ['./icon-picker-input.component.scss'],
  exportAs: 'iconInput',
})
export class IconPickerInputComponent {
  values: boolean[];
  @Output() ratingChange = new EventEmitter<number>();
  @Input() rating: number = -1;
  @Input('icons') ratingsIcons = mapIcons(iconList);
  @Input() icon = '';
  constructor(@Optional() @Host() public form: ControlContainer) {}
  ngOnInit() {
    console.log(this.ratingsIcons);
    // this._value = this.ratingsIcons.length;
  }
}
