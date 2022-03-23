import { LineWriter, StringifyExtension } from '@puppeteer/replay';
import { Step, UserFlow } from '@puppeteer/replay/lib/Schema';
export declare class CypressStringifyExtension extends StringifyExtension {
    #private;
    beforeAllSteps(out: LineWriter, flow: UserFlow): Promise<void>;
    afterAllSteps(out: LineWriter): Promise<void>;
    stringifyStep(out: LineWriter, step: Step, flow: UserFlow): Promise<void>;
}
