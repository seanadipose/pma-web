import { TimeStampType } from 'src/app/core/models/journal.model';

import firebase from 'firebase/app';

const isTimeStamp = (variableToCheck: unknown): variableToCheck is TimeStampType =>
  (variableToCheck as TimeStampType).seconds !== undefined;

const makeDateString = (dateTime: firebase.firestore.Timestamp | Date): string => {
  return dateCollFns.isTimeStamp(dateTime) ? dateTime.toDate().toDateString() : dateTime.toDateString();
};

export const dateCollFns = {
  isTimeStamp,
  makeDateString,
};
