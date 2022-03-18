import path from 'path';
import fs from 'fs';

import cypressStringifyChromeRecorder from '../main.js';

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
    if (!dry) {
      try {
        // TODO: write to correct file with correct file name
        // fs.writeFileSync(
        //   path.join(writePath, '../../test.spec.js'),
        //   await result
        // );
      } catch (err) {
        console.log(`File werr);
      }
    } else {
      return result;
    }
  });
}
