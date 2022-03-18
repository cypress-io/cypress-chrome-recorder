import path from 'path';
import fs from 'fs';
import chalk from 'chalk';

import cypressStringifyChromeRecorder from '../main.js';
import { stdout } from 'process';

const __dirname = path.resolve(path.dirname(''));
export const transformDirectory = path.join(__dirname, '../');

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
  const transformPath = path.join(__dirname, '../main.js');
  console.log(
    '🚀 ~ file: transforms.ts ~ line 26 ~ transformPath',
    transformPath
  );
  const { dry, print } = flags;

  const args = ['-t', transformPath].concat(files);
  // console.log('🚀 ~ file: transforms.ts ~ line 28 ~ args', args);

  if (dry) {
    args.push('--dry');
  }
  if (print) {
    args.push('--print');
  }

  console.log(`Running Cypress Chrome Recorder: ${args.join(' ')}\n`);

  const results = await cypressStringifyChromeRecorder();

  if (!results) {
    return;
  }

  return results.map(async (result) => {
    if (dry) {
      console.log(await result);
    } else {
      try {
        // TODO: write to correct file with correct file name
        // fs.writeFileSync(
        //   path.join(writePath, '../../test.spec.js'),
        //   await result
        // );
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
