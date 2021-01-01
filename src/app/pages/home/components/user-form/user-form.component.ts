import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFormGroup, RxFormBuilder } from '@rxweb/reactive-form-validators';
import { UserForm } from 'src/app/modules/user/models/user-form.model';

@Component({
  selector: 'pma-user-form',
  template: `
    <form #userForm="ngForm" [formGroup]="fg" fxLayout="column">
      <mat-card>
        <mat-card-header>
          <mat-icon>email</mat-icon>
          <mat-card-title>
            {{ fg.get('email').value }}
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-list>
            <pma-input mat-list-item name="displayName" label="displayName"></pma-input>
            <pma-input mat-list-item name="photoURL" label="Photo Link"></pma-input>
          </mat-list>
          <!-- <pma-input name="providerId" label="providerId"></pma-input> -->
        </mat-card-content>
        <mat-card-actions>
          <ng-container>
            <button mat-button [disabled]="fg.pristine" (click)="fg.reset()">Undo</button>
            <button mat-button color="accent" [disabled]="fg.pristine" (click)="saveUserForm.emit(fg.value)">
              Save
            </button>
          </ng-container>
        </mat-card-actions>
        <mat-card-footer>
          <mat-error>
            <ng-content select="error-state"></ng-content>
          </mat-error>
        </mat-card-footer>
      </mat-card>
    </form>
  `,
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Input() fg: IFormGroup<UserForm>;
  @Input() set user(user: any) {
    this.fg.patchModelValue(user);
    console.log(this);
  }
  @Output() saveUserForm = new EventEmitter<UserForm>();
  constructor() {}

  ngOnInit(): void {}
}
