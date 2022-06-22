import { CypressStringifyExtension } from '../src/CypressStringifyExtension';
import { cypressStringifyChromeRecording } from '../src/main';

export class RecorderPlugin {
  async stringify(recording) {
    return cypressStringifyChromeRecording(recording, null, 2);
  }
  async stringifyStep(step) {
    return CypressStringifyExtension.stringifyStep(step, null, 2);
  }
}

chrome.devtools.recorder.registerRecorderExtensionPlugin(
  new RecorderPlugin(),
  'Cypress Test',
  'application/javascript'
);
