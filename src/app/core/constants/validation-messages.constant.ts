export const VALIDATION_MESSAGES = {
  required: `{{1}} is required.`,
  // sin: `Invalid SIN`,
  // alpha: 'Only alphabelts are allowed.',
  // alphaNumeric: 'Only alphabet and numbers are allowed.',
  // compare: 'inputs are not matched.',
  // contains: 'value is not contains in the input',
  // creditcard: 'creditcard number is not correct',
  // digit: 'Only digit are allowed',
  email: 'Email must be in the format "example@mail.com',
  // greaterThanEqualTo: 'please enter greater than or equal to the joining age',
  // greaterThan: 'please enter greater than to the joining age',
  // hexColor: 'please enter hex code',
  // json: 'please enter valid json',
  // lessThanEqualTo: 'please enter less than or equal to the current experience',
  // lessThan: 'please enter less than or equal to {{1}}',
  // lowerCase: 'Only lowercase is allowed',
  // maxLength: 'maximum length is {{1}} digit',
  // maxNumber: 'enter value less than equal to {{1}}',
  // minNumber: 'enter value greater than equal to {{1}}',
  // password: 'please enter valid password',
  // pattern: 'invalid format',
  // range: 'please enter age between 18 to 60',
  // required: 'This field is required',
  // time: 'Only time format is allowed',
  // upperCase: 'Only uppercase is allowed',
  // url: 'Only url format is allowed',
  // zipCode: 'enter valid zip code',
  // minLength: 'minimum length is {{1}} digits',
  // requiredTrue: "You must confirm you' seen the ID.",
  // invalidSin: 'Invalid SIN',
  // noneOf: 'Invalid selection',
  // maxDate: `Date too far in the future.`,
  // minDate: `Date too far in the past.`,
  // matDatepickerMin: `Date too far in the past.`,
  // matDatepickerMax: `Date too far in the future.`,
} as const;

export type ValidationMessagesType = typeof VALIDATION_MESSAGES;