import { Component, Input, OnInit } from '@angular/core';
import { Journal, TimeStampType } from 'src/app/core/models/journal.model';
import { dateCollFns } from '../../../../modules/collections/functions/date.function';
import * as R from 'remeda';

// type CardType = ReturnType<typeof makeCard>;

interface Card {
  title: string;
  subTitle: string;
  body: string;
  footer: string;
}

class Card {}
const pickJournal = (jrnl: Journal) =>
  R.pick(jrnl, ['title', 'place', 'dateTime', 'time', 'emotionsList', 'description', 'id', 'rating', 'geoloc']);

@Component({
  selector: 'pma-journal-card',
  template: `
    <mat-card>
      <mat-card-title-group>
        <mat-card-title>{{ title }}</mat-card-title>
        <mat-card-subtitle>{{ subTitle }}</mat-card-subtitle>
      </mat-card-title-group>

      <mat-card-content>
        <div class="feelings-list">
          <mat-chip-list>
            <ng-container *ngFor="let emotion of emotionsList">
              <mat-chip color="primary">
                {{ emotion | titlecase }}
                <mat-icon matChipTrailingIcon>face</mat-icon>
              </mat-chip>
            </ng-container>
          </mat-chip-list>
        </div>
        <agm-map [latitude]="lat" [longitude]="lng"></agm-map>
      </mat-card-content>
      <mat-card-actions> </mat-card-actions>
      <!-- <mat-card-footer fxLayout="row" fxLayoutAlign="end start">
        <span class="mat-typography" class="accent-text"> {{ footer }}</span>
      </mat-card-footer> -->
      <div fxLayout="row" fxLayoutGap="7px" class="variant-text">
        <mat-icon *ngFor="let rating of ratings">{{ rating }}</mat-icon>
      </div>
    </mat-card>
  `,
  styleUrls: ['./journal-card.component.scss'],
  preserveWhitespaces: false,
})
export class JournalCardComponent extends Card implements OnInit {
  ratings: string[];
  // fields: JournalKeysType[] = ['title', 'place', 'dateTime', 'time', 'emotionsList'];
  lat: number;
  lng: number;
  emotionsList: string[];

  makeCard(jrnl: ReturnType<typeof pickJournal>) {
    const locTupleToLatLong = (locTuple: [number, number]) =>
      locTuple?.length > 0 ? { lat: locTuple[0], lng: locTuple[1] } : { lat: null, long: null };

    const ratingsMap = (rating = 1) => {
      const ratingsIcons = [
        'sentiment_very_dissatisfied',
        'sentiment_very_dissatisfied',
        'sentiment_dissatisfied',
        'sentiment_dissatisfied',
        'sentiment_satisfied',
        'sentiment_very_satisfied',
      ];
      const ratings = R.pipe(
        R.range(1, rating),
        R.map((num) => ratingsIcons[num])
      );
      return ratings;
    };

    const { title = '', description = '', place = '', dateTime, time, id = '', rating, geoloc, emotionsList } = jrnl;
    const { lat, lng } = locTupleToLatLong(geoloc);
    const ratings = ratingsMap(rating);

    Object.assign(this, {
      title,
      subTitle: `${dateCollFns.makeDateString(dateTime)} ${time} - ${place ? place : 'somewhere..'}`,
      body: description,
      footer: '',
      id: id,
      lat,
      lng,
      emotionsList: emotionsList.length > 0 ? emotionsList : ['meh..'],
      ratings,
    });
  }

  @Input('journal') set setJournal(jrnl: Journal) {
    console.log(jrnl);
    this.makeCard(jrnl);

    // this.time = time;
    // this.dateTime = new Date(dateTime.seconds);
  }

  constructor() {
    super();
  }

  ngOnInit(): void {}
}
