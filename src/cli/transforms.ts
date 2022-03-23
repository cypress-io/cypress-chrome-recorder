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
  files: string[];
  flags: Flags;
}): Promise<Promise<string | void>[] | undefined> {
  const transformPath = path.join(__dirname, '/dist/main.js');
  // TODO: make this an input via CLI
  const outputPath = path.join(__dirname, '/cypress/integration');
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
    } else {
      try {
        fs.writeFileSync(
          path.join(outputPath, `/${testName[1]}.spec.js`),
          testResult as string
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
