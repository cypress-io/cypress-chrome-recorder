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

export type SupportedRecorderKeysKeys =
  | 'backspace'
  | 'enter'
  | 'arrowUp'
  | 'arrowDown'
  | 'arrowLeft'
  | 'arrowRight'
  | 'escape'
  | 'pageUp'
  | 'pageDown'
  | 'end'
  | 'home'
  | 'insert';

type SupportedRecorderKeysValues =
  | 'backspace'
  | 'enter'
  | 'upArrow'
  | 'downArrow'
  | 'leftArrow'
  | 'rightArrow'
  | 'esc'
  | 'pageUp'
  | 'pageDown'
  | 'end'
  | 'home'
  | 'insert';

type SupportedRecorderKeys = {
  [key in SupportedRecorderKeysKeys]: SupportedRecorderKeysValues;
};

export const supportedRecorderKeys: SupportedRecorderKeys = {
  backspace: 'backspace',
  enter: 'enter',
  arrowUp: 'upArrow',
  arrowDown: 'downArrow',
  arrowLeft: 'leftArrow',
  arrowRight: 'rightArrow',
  escape: 'esc',
  pageUp: 'pageUp',
  pageDown: 'pageDown',
  end: 'end',
  home: 'home',
  insert: 'insert',
};

export const defaultOutputFolder = 'cypress/integration';
