import { readdirSync, readFileSync } from 'fs';
import { parse, stringify, Schema } from '@puppeteer/replay';
import { CypressStringifyExtension } from './CypressStringifyExtension.js';

const recordingDirectory = './recordings';

function parseRecording(recording: string): Schema.UserFlow {
  const recordingContent = readFileSync(
    `${recordingDirectory}/${recording}`,
    'utf8'
  );

  return parse(JSON.parse(recordingContent));
}

export default async function stringifyRecordings(): Promise<
  Promise<string>[] | undefined
> {
  const recordings = readdirSync(recordingDirectory);
  // If no recordings found, log message and return.
  if (recordings.length === 0) {
    console.log(
      'No recordings found. Please create and upload one before trying again.'
    );

    return;
  }

  // Else, parse and stringify recordings
  const stringifiedRecording = recordings.map(async (recording) => {
    const parsedRecording = parseRecording(recording);

    const cypressStringified = await stringify(parsedRecording, {
      extension: new CypressStringifyExtension(),
    });

    return cypressStringified;
  });

  return stringifiedRecording;
}
