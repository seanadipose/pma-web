import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pma-form-card',
  template: `
    <div mdcCard outlined>
      <!-- <a mdcCardPrimaryAction href="javascript:void(0)">
        <section mdcCardMedia size="16:9"></section>
        <div class="custom-card__primary">
          <h2 class="mdc-typography- -headline6">Our Changing Planet</h2>
          <h3 class="mdc-typography--subtitle2">by Kurt Wagner</h3>
        </div>
        <div class="custom-card__secondary mdc-typography--body2">
          Visit ten places on our planet that are undergoing the biggest changes today.
        </div>
      </a> -->
      <ng-content select="card-body"></ng-content>
    </div>
  `,
  styleUrls: ['./form-card.component.scss'],
})
export class FormCardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
