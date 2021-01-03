import { Component, Input, OnInit } from '@angular/core';
import { Journal } from 'src/app/core/models/journal.model';
import * as R from 'remeda';

type JournalKeysType = keyof Journal;

const fields: JournalKeysType[] = ['title', 'place', 'dateTime', 'time', 'emotionsList'];

const pickJournal = (jrnl: Journal) =>
  R.pick(jrnl, ['title', 'place', 'dateTime', 'time', 'emotionsList', 'description', 'id']);

// const makeDate(date: TimeStamp)

const makeCard = (jrnl: ReturnType<typeof pickJournal>) => ({
  title: jrnl.title,
  subTitle: jrnl.place,
  body: jrnl.description,
  footer: `${new Date(jrnl.dateTime)} ${jrnl.time}`,
});

type CardType = ReturnType<typeof makeCard>;

@Component({
  selector: 'pma-journal-card',
  template: `
    <mat-card>
      <mat-card-title-group>
        <mat-card-title>{{ data.title }} </mat-card-title>
        <mat-card-subtitle>{{ data.subTitle }}</mat-card-subtitle>
      </mat-card-title-group>
      <mat-card-content>{{ data.body }}</mat-card-content>
      <mat-card-actions></mat-card-actions>
      <mat-card-footer fxLayout="row" fxLayoutAlign="end start">
        <span> {{ data.footer }}</span>
      </mat-card-footer>
    </mat-card>
  `,
  styleUrls: ['./journal-card.component.scss'],
})
export class JournalCardComponent implements OnInit {
  data: CardType;
  time: any;
  dateTime: Date;

  @Input('journal') set setJournal(jrnl: Journal) {
    console.log('🚀 -------------------------------------------------------------------------------------------');
    console.log('🚀 ~ file: journal-card.component.ts ~ line 41 ~ JournalCardComponent ~ @Input ~ jrnl', jrnl);
    console.log('🚀 -------------------------------------------------------------------------------------------');
    console.log(jrnl);

    this.data = makeCard(pickJournal(jrnl));
    const { time, dateTime } = jrnl as any;

    this.time = time;
    this.dateTime = new Date(dateTime.seconds);

    // console.log('🚀 -----------------------------------------------------------------------------------------------');
    // console.log('🚀 ~ file: journal-card.component.ts ~ line 23 ~ JournalCardComponent ~ @Input ~ picked', this.data);
    // console.log('🚀 -----------------------------------------------------------------------------------------------');
  }

  constructor() {}

  ngOnInit(): void {}
}
