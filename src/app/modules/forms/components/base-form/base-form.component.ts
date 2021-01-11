import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IFormGroup } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'pma-base-form',
  template: ` <p>base-form works!</p> `,
  styleUrls: ['./base-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class BaseFormComponent<T> implements OnInit {
  @Input() fg: IFormGroup<T>;

  constructor() {}

  ngOnInit(): void {}
}
