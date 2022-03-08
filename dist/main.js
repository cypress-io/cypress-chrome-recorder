import { readdirSync, readFileSync } from 'fs';
import { parse, stringify } from '@puppeteer/replay';
import { CypressStringifyExtension } from './CypressStringifyExtension.js';
const recordingDirectory = './recordings';
function parseRecording(recording) {
    const recordingContent = readFileSync(`${recordingDirectory}/${recording}`, 'utf8');
    return parse(JSON.parse(recordingContent));
}
async function stringifyRecordings() {
    const recordings = readdirSync(recordingDirectory);
    // If no recordings found, log message and return.
    if (recordings.length === 0) {
        console.log('No recordings found. Please create and upload one before trying again.');
        return;
    }
    // Else, parse and stringify recordings
    recordings.map(async (recording) => {
        const parsedRecording = parseRecording(recording);
        const cypressStringified = await stringify(parsedRecording, {
            extension: new CypressStringifyExtension(),
        });
        console.log('🚀 ~ file: main.ts ~ line 38 ~ recordings.forEach ~ cypressStringified', cypressStringified);
        return cypressStringified;
    });
}
stringifyRecordings();
