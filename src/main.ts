import { parse, stringify, Schema } from '@puppeteer/replay';
import { CypressStringifyExtension } from './CypressStringifyExtension.js';

export function parseRecordingContent(
  recordingContent: string
): Schema.UserFlow {
  return parse(JSON.parse(recordingContent));
}

export async function stringifyParsedRecording(
  parsedRecording: Schema.UserFlow
): Promise<Promise<string> | undefined> {
  return await stringify(parsedRecording, {
    extension: new CypressStringifyExtension(),
  });
}

export async function cypressStringifyChromeRecording(
  recording: string
): Promise<string | undefined> {
  // If no recordings found, log message and return.
  if (recording.length === 0) {
    console.log(
      'No recordings found. Please create and upload one before trying again.'
    );

    return;
  }

  const parsedRecording = parseRecordingContent(recording);

  const cypressStringified = await stringifyParsedRecording(parsedRecording);

  return cypressStringified;
}
