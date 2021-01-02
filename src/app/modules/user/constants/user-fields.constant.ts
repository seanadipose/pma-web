import firebase from 'firebase/app';

type FirebaseUserKeysType = keyof firebase.User;

export const USER_FIELDS: FirebaseUserKeysType[] = [
  'displayName',
  'email',
  'emailVerified',
  'photoURL',
  'phoneNumber',
  'providerId',
  'uid',
];
export type UserFieldsType = typeof USER_FIELDS[number];
export type AppUser = Record<UserFieldsType, string>;
