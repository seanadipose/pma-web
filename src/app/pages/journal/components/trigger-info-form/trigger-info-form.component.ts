import { Component, Input, OnInit } from '@angular/core';
import { IFormGroup } from '@rxweb/reactive-form-validators';
import { TriggerInfo } from 'src/app/core/models/trigger-info.model';
import { BaseFormComponent } from 'src/app/modules/forms/components/base-form/base-form.component';

@Component({
  selector: 'pma-trigger-info-form',
  template: `
    <form [formGroup]="fg">
      <div fxLayout="column" fxLayoutAlign="strat start" fxLayoutGap="15px">
        <pma-input name="title" label="title"> </pma-input>

        <pma-textbox-input name="description" label="...lorem ipsum"></pma-textbox-input>
        <agm-map
          *ngIf="position"
          [latitude]="position.lat"
          [longitude]="position.lng"
          [zoom]="16"
          [disableDefaultUI]="true"
        >
          <agm-marker [latitude]="position.lat" [longitude]="position.lng"></agm-marker>
        </agm-map>
      </div>
    </form>
  `,
  styleUrls: ['./trigger-info-form.component.scss'],
})
export class TriggerInfoFormComponent extends BaseFormComponent<TriggerInfoFormComponent> implements OnInit {
  @Input() position: { lat: number; lng: number };
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
