import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IFormGroup } from '@rxweb/reactive-form-validators';

@Component({
  template: ``,
  styleUrls: ['./base-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'pmaForm',
})
export abstract class BaseFormComponent<T> implements OnInit {
  @Input() fg: IFormGroup<T>;

  constructor() {}

  ngOnInit(): void {}
}
