import { Component, OnInit } from '@angular/core';
import { Seeing } from 'src/app/core/models/seeing.model';
import { BaseFormComponent } from 'src/app/modules/forms/components/base-form/base-form.component';

@Component({
  selector: 'pma-seeing-form',
  template: ` <p>seeing-form works!</p> `,
  styleUrls: ['./seeing-form.component.scss'],
})
export class SeeingFormComponent extends BaseFormComponent<Seeing> implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
