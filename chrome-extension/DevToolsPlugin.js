export class RecorderPlugin {
  async stringify(recording) {
    return JSON.stringify(recording, null, 2);
  }
  async stringifyStep(step) {
    return JSON.stringify(step, null, 2);
  }
}

/* eslint-disable no-undef */
chrome.devtools.registerRecorderExtensionPlugin(
  new RecorderPlugin(),
  /* name=*/ 'Cypress Test',
  /* mediaType=*/ 'application/javascript'
);
