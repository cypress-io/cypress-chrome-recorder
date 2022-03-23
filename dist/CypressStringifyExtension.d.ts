import { LineWriter, Schema, StringifyExtension } from '@puppeteer/replay';
export declare class CypressStringifyExtension extends StringifyExtension {
    #private;
    beforeAllSteps(out: LineWriter, flow: Schema.UserFlow): Promise<void>;
    afterAllSteps(out: LineWriter): Promise<void>;
    stringifyStep(out: LineWriter, step: Schema.Step, flow: Schema.UserFlow): Promise<void>;
}
