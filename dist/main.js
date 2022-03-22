import { readFileSync } from 'fs';
import { parse, stringify } from '@puppeteer/replay';
import { CypressStringifyExtension } from './CypressStringifyExtension.js';
function parseRecording(recordingContent) {
    return parse(JSON.parse(recordingContent));
}
export async function stringifyRecording(parsedRecording) {
    return await stringify(parsedRecording, {
        extension: new CypressStringifyExtension(),
    });
}
export default async function cypressStringifyChromeRecorder(recordings) {
    // If no recordings found, log message and return.
    if (recordings.length === 0) {
        console.log('No recordings found. Please create and upload one before trying again.');
        return;
    }
    // Else, parse and stringify recordings
    const stringifiedRecording = recordings.map(async (recording) => {
        const recordingContent = readFileSync(`${recording}`, 'utf8');
        const parsedRecording = parseRecording(recordingContent);
        const cypressStringified = await stringifyRecording(parsedRecording);
        return cypressStringified;
    });
    return stringifiedRecording;
}
