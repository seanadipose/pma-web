import { Component, Input, OnInit } from '@angular/core';
import { IFormGroup } from '@rxweb/reactive-form-validators';
import { TriggerInfo } from 'src/app/core/models/trigger-info.model';

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
export class TriggerInfoFormComponent implements OnInit {
  @Input() fg: IFormGroup<TriggerInfo>;
  @Input() position: { lat: number; lng: number };
  constructor() {}

  ngOnInit(): void {}
}
