export interface Journal {
  title: string;
  description?: string;
  emotions: string[];
  place: string;
  geoloc: string;
  dateTime: Date;
  rating: number;
  time: any;
}

export class Journal {
  constructor(journal: Partial<Journal>) {
    Object.assign(this, journal);
  }
}
