import { Component, OnInit } from '@angular/core';
import { Feeling } from 'src/app/core/models/feeling.model';
import { BaseFormComponent } from 'src/app/modules/forms/components/base-form/base-form.component';

@Component({
  selector: 'pma-feeling-form',
  template: ` <p>feeling-form works!</p> `,
  styleUrls: ['./feeling-form.component.scss'],
})
export class FeelingFormComponent extends BaseFormComponent<Feeling> implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
