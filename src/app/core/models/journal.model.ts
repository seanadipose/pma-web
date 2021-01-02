import * as R from 'remeda';

export interface Journal {
  title: string;
  description?: string;
  emotions?: string[];
  place: string;
  geoloc: string;
  dateTime: Date;
  rating: number;
  time: any;
  emotionsList?: string[];
}

export class Journal {
  constructor(journal: Partial<Journal>) {
    Object.assign(this, R.omit(journal, ['emotions']));
  }

  get value() {
    return R.pick(this, Object.keys(this).filter((key) => key !== 'emotions') as any);
  }
}
