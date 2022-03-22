import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import cypressStringifyChromeRecorder from '../main.js';
const __dirname = path.resolve(path.dirname('.'));
export async function runTransforms({ files, flags, }) {
    const transformPath = path.join(__dirname, '/dist/main.js');
    const outputPath = path.join(__dirname, '/recordings');
    const { dry, print } = flags;
    const args = ['-t', transformPath].concat(files);
    console.log('🚀 ~ file: transforms.ts ~ line 27 ~ files', files);
    if (dry) {
        args.push('--dry');
    }
    if (print) {
        args.push('--print');
    }
    console.log(chalk.green(`Running Cypress Chrome Recorder: ${files}\n`));
    const stringifiedResults = await cypressStringifyChromeRecorder(files);
    if (!stringifiedResults) {
        return;
    }
    return stringifiedResults.map(async (stringifiedResult) => {
        const testResult = await stringifiedResult;
        if (!testResult) {
            return;
        }
        const testName = testResult.split('"');
        if (dry) {
            console.log(testResult);
        }
        else {
            try {
                fs.writeFileSync(path.join(outputPath, `/${testName[1]}.spec.js`), testResult);
            }
            catch (err) {
                console.log(chalk.yellow('There was an issue writing the output to a file. Please try again.'));
            }
        }
    });
}
