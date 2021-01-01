import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pma-journal',
  template: `
    <mat-toolbar color="accent">
      <span>Journals</span>
      <div class="toolbar-spacer"></div>
      <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Example icon-button with a menu">
        <mat-icon>menu</mat-icon>
      </button>
    </mat-toolbar>

    <router-outlet></router-outlet>
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
  styles: [],
})
export class JournalComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('started');
  }
}
