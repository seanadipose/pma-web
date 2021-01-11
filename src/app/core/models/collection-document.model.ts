import { TimeStampType } from './journal.model';

export interface CollectionDocument {
  id?: string;
  created: Date | TimeStampType;
}
