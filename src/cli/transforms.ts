import path from 'path';
import fs from 'fs';
import chalk from 'chalk';

import cypressStringifyChromeRecorder from '../main.js';

const __dirname = path.resolve(path.dirname('.'));

// cli flags
type Flags = {
  force?: boolean;
  dry?: boolean;
  print?: boolean;
};

export async function runTransforms({
  files,
  flags,
}: {
  files: string | string[];
  flags: Flags;
}): Promise<Promise<string | void>[] | undefined> {
  const transformPath = path.join(__dirname, '/dist/main.js');
  const outputPath = path.join(__dirname, '/recordings');
  const { dry, print } = flags;
  const args = ['-t', transformPath].concat(files);

  if (dry) {
    args.push('--dry');
  }
  if (print) {
    args.push('--print');
  }

  console.log(
    chalk.green(`Running Cypress Chrome Recorder: ${args.join(' ')}\n`)
  );

  const results = await cypressStringifyChromeRecorder();

  if (!results) {
    return;
  }

  return results.map(async (result) => {
    const testResult = await result;
    const testName = testResult.split('"');
    if (dry) {
      console.log(testResult);
    } else {
      try {
        fs.writeFileSync(
          path.join(outputPath, `/${testName[1]}.spec.js`),
          testResult
        );
      } catch (err) {
        console.log(
          chalk.yellow(
            'There was an issue writing the output to a file. Please try again.'
          )
        );
      }
    }
  });
}
