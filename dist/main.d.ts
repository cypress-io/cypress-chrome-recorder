import { Schema } from '@puppeteer/replay';
export declare function stringifyRecording(parsedRecording: Schema.UserFlow): Promise<Promise<string> | undefined>;
export default function cypressStringifyChromeRecorder(recordings: string[]): Promise<Promise<string | undefined>[] | undefined>;
