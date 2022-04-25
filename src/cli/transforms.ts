import path from 'path';
import fs, { readFileSync } from 'fs';
import chalk from 'chalk';

import { cypressStringifyChromeRecording } from '../main.js';

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

  if (dry) {
    args.push('--dry');
  }
  if (print) {
    args.push('--print');
  }

  console.log(chalk.green(`Running Cypress Chrome Recorder: ${files}\n`));

  return files.map(async (file) => {
    const recordingContent = readFileSync(`${file}`, 'utf8');
    const stringifiedFile = await cypressStringifyChromeRecording(
      recordingContent
    );

    if (!stringifiedFile) {
      return;
    }

    const fileName = file.split('/').pop();
    console.log(
      '🚀 ~ file: transforms.ts ~ line 49 ~ returnfiles.map ~ fileName',
      fileName
    );
    const testName = fileName ? fileName.replace('.json', '') : undefined;
    console.log(
      '🚀 ~ file: transforms.ts ~ line 51 ~ returnfiles.map ~ testName',
      testName
    );

    if (dry) {
      console.log(stringifiedFile);
    } else if (!testName) {
      console.log(
        chalk.red('No file or folder was found to export. Please try again.')
      );
    } else {
      try {
        fs.writeFileSync(
          path.join(outputPath, `/${testName}.spec.js`),
          stringifiedFile as string
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
