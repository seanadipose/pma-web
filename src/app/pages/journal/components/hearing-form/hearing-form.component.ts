import { Component, OnInit } from '@angular/core';
import { Hearing } from 'src/app/core/models/hearing.model';
import { BaseFormComponent } from 'src/app/modules/forms/components/base-form/base-form.component';

@Component({
  selector: 'pma-hearing-form',
  template: ` <p>hearing-form works!</p> `,
  styleUrls: ['./hearing-form.component.scss'],
})
export class HearingFormComponent extends BaseFormComponent<Hearing> implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
