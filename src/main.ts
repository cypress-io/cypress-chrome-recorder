import { readFileSync } from 'fs';
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

export async function cypressStringifyChromeRecordings(
  recordings: string[]
): Promise<Promise<string | undefined>[] | undefined> {
  // If no recordings found, log message and return.
  if (recordings.length === 0) {
    console.log(
      'No recordings found. Please create and upload one before trying again.'
    );

    return;
  }

  // Else, parse and stringify recordings
  const stringifiedRecording = recordings.map(async (recording) => {
    const recordingContent = readFileSync(`${recording}`, 'utf8');
    const parsedRecording = parseRecordingContent(recordingContent);

    const cypressStringified = await stringifyParsedRecording(parsedRecording);

    return cypressStringified;
  });

  return stringifiedRecording;
}
