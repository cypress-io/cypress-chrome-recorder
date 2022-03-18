import { readFileSync } from 'fs';
// import { parse, stringify } from '@puppeteer/replay';
// import { CypressStringifyExtension } from './CypressStringifyExtension.js';

export default async function stringifyRecordings(
  filePath: string
): Promise<string | undefined> {
  const recordingContent = readFileSync(`${filePath}`, 'utf8');

  // If no recordings found, log message and return.
  if (!recordingContent) {
    console.log(
      'No recording content found. Please choose another file and try again.'
    );

    return;
  }

  const parsedRecording = JSON.parse(recordingContent);
  console.log(
    '🚀 ~ file: stringifyRecordings.ts ~ line 24 ~ parsedRecording',
    parsedRecording
  );

  // Else, parse and stringify recordings
  // const stringifiedRecording = await stringify(parsedRecording, {
  //   extension: new CypressStringifyExtension(),
  // });

  const stringifiedRecording = undefined;

  return stringifiedRecording;
}
