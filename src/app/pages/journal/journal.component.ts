import { Component, OnInit } from '@angular/core';
import { JournalCollectionService } from 'src/app/modules/collections/services/journal-collections.service';
// "Q6XV6zAOwFCR1IdvX31n"
@Component({
  selector: 'pma-journal',
  template: `
    <mat-toolbar color="accent">
      <span>My Triggers</span>
      <div class="toolbar-spacer"></div>
      <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Example icon-button with a menu">
        <mat-icon>menu</mat-icon>
      </button>
    </mat-toolbar>
    <div fxLayout="row" fxFlexFill fxLayout="column" fxFlexFill>
      <router-outlet></router-outlet>
    </div>

    <mat-menu #menu="matMenu">
      <a mat-menu-item [routerLink]="['new']">
        <mat-icon>create</mat-icon>
        <span>New</span>
      </a>
      <button mat-menu-item disabled>
        <mat-icon>voicemail</mat-icon>
        <span>Check voice mail</span>
      </button>
      <button mat-menu-item>
        <mat-icon>notifications_off</mat-icon>
        <span>Disable alerts</span>
      </button>
    </mat-menu>
  `,
  styles: [
    `
      :host() {
        height: 100%;
      }
    `,
  ],
})
export class JournalComponent implements OnInit {
  items: any;
  constructor(private journalSvc: JournalCollectionService) {}

  ngOnInit(): void {
    console.log('started');
    // this.items = this.journalSvc.getValueChanges();
    // this.items.subscribe((obs) => console.log(obs));

    // const items = this.journalSvc.getCollection().subscribe((res) => console.log(res));
  }
}
