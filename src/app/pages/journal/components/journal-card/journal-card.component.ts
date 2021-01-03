import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Journal, TimeStampType } from 'src/app/core/models/journal.model';
import { dateCollFns } from '../../../../modules/collections/functions/date.function';
import * as R from 'remeda';
import { MatCard } from '@angular/material/card';

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
    <mat-card #card pmaHover>
      <mat-card-header>
        <div mat-card-avatar class="icon">
          <mat-icon [inline]="true" [color]="colorMap(rating)">{{ iconMap(rating) }}</mat-icon>
        </div>
        <mat-card-title>
          <div fxLayout="row" fxLayoutGap="15px" fxLayoutAlign="start center" [ngClass]="ratingClass">
            <span>{{ title }}</span>
          </div></mat-card-title
        >
        <mat-card-subtitle>{{ subTitle }}</mat-card-subtitle>
      </mat-card-header>

      <div mat-card-image class="trigger-map">
        <agm-map [latitude]="lat" [longitude]="lng" [zoom]="12" [disableDefaultUI]="true">
          <agm-marker [latitude]="lat" [longitude]="lng"></agm-marker>
        </agm-map>
      </div>

      <mat-card-content>
        <div class="feelings-list">
          <mat-chip-list>
            <ng-container *ngFor="let emotion of emotionsList">
              <mat-chip color="accent" selected>
                {{ emotion | titlecase }}
                <mat-icon matChipTrailingIcon>face</mat-icon>
              </mat-chip>
            </ng-container>
          </mat-chip-list>
        </div>
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
  colorMap(rating: number) {
    return rating > 3 ? 'success' : rating === 3 ? 'neutral' : 'unhappy';
  }
  iconMap(rating: number) {
    return this.ratingsIcons[rating];
  }
  ratingClass: string[];

  ratings: string[];
  // fields: JournalKeysType[] = ['title', 'place', 'dateTime', 'time', 'emotionsList'];
  lat: number;
  lng: number;
  rating: number;
  emotionsList: string[];
  ratingsIcons = [
    'sentiment_very_dissatisfied',
    'sentiment_very_dissatisfied',
    'sentiment_dissatisfied',
    'sentiment_dissatisfied',
    'sentiment_satisfied',
    'sentiment_very_satisfied',
  ];

  makeCard(jrnl: ReturnType<typeof pickJournal>) {
    const locTupleToLatLong = (locTuple: [number, number]) =>
      locTuple?.length > 0 ? { lat: locTuple[0], lng: locTuple[1] } : { lat: null, long: null };

    const { title = '', description = '', place = '', dateTime, time, id = '', rating, geoloc, emotionsList } = jrnl;
    const { lat, lng } = locTupleToLatLong(geoloc);

    Object.assign(this, {
      title,
      subTitle: `${dateCollFns.makeDateString(dateTime)} ${time} - ${place ? place : 'somewhere..'}`,
      body: description,
      footer: '',
      id: id,
      lat,
      lng,
      emotionsList: emotionsList.length > 0 ? emotionsList : ['meh..'],
      rating: rating,
      ratingClass: [`mat-${this.colorMap(rating)}`],
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
