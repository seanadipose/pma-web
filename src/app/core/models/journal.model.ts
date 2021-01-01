export interface Journal {
  title: string;
  description?: string;
  emotions: string[];
  location: string;
  geoloc: string;
  dateTime: Date;
  rating: number;
}

export class Journal {
  constructor(journal: Partial<Journal>) {
    Object.assign(this, journal);
  }
}
