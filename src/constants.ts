export type RecorderChangeTypes =
  | 'textarea'
  | 'select-one'
  | 'text'
  | 'url'
  | 'tel'
  | 'search'
  | 'password'
  | 'number'
  | 'email';

export const recorderChangeTypes: RecorderChangeTypes[] = [
  'textarea',
  'select-one',
  'text',
  'url',
  'tel',
  'search',
  'password',
  'number',
  'email',
];

export const defaultOutputFolder = 'cypress/integration';
