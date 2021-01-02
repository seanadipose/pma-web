import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pma-btn-cntr',
  template: `
    <div fxLayout="row" fxLayoutAlign="start start" fxLayoutGap="15px" class="button-container">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .button-container {
        padding: 10px 15px 10px 15px;
      }
    `,
  ],
})
export class ButtonContainerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
