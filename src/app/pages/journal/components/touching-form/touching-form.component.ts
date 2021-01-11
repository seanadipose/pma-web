import { Component, OnInit } from '@angular/core';
import { Touching } from 'src/app/core/models/touching.model';
import { BaseFormComponent } from 'src/app/modules/forms/components/base-form/base-form.component';

@Component({
  selector: 'pma-touching-form',
  template: ` <p>touching-form works!</p> `,
  styleUrls: ['./touching-form.component.scss'],
})
export class TouchingFormComponent extends BaseFormComponent<Touching> implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
