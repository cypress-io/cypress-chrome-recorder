import path from 'path';
import fs, { readFileSync } from 'fs';
import chalk from 'chalk';

import { cypressStringifyChromeRecording } from '../main.js';

const __dirname = path.resolve(path.dirname('.'));

// cli flags
type Flags = {
  force?: boolean;
  dry?: boolean;
  path?: string;
};

interface FileToExport {
  stringifiedFile: string;
  testName: string;
  outputFolder: string;
  outputPath: string;
}

async function exportFileToFolder({
  stringifiedFile,
  testName,
  outputFolder,
  outputPath,
}: FileToExport) {
  fs.writeFile(
    path.join(outputFolder, `/${testName}.spec.js`),
    stringifiedFile as string,
    (err: any) => {
      if (!err) {
        console.log(
          chalk.green(
            `\n${testName}.json exported to ${outputPath}/${testName}.spec.js\n`
          )
        );
      }

      if (err) {
        if (err?.path?.includes('cypress/integration')) {
          const outputFolder = path.join(__dirname, 'cypress/e2e');
          const outputPath = 'cypress/e2e';

          exportFileToFolder({
            stringifiedFile,
            testName,
            outputFolder,
            outputPath,
          });
        } else {
          console.log(
            chalk.yellow(
              `\nThere was an issue writing the output to ${outputPath}. Please check that it exists and try again.`
            )
          );
        }
      }
    }
  );
}

export async function runTransforms({
  files,
  outputPath,
  flags,
}: {
  files: string[];
  outputPath: string;
  flags: Flags;
}): Promise<Promise<string | void>[] | undefined> {
  const transformPath = path.join(__dirname, '/dist/main.js');
  const outputFolder = path.join(__dirname, outputPath);
  const { dry } = flags;
  const args = ['-t', transformPath].concat(files);

  if (dry) {
    args.push('--dry');
  }

  return files.map(async (file) => {
    console.log(chalk.green(`Running Cypress Chrome Recorder on ${file}\n`));

    const recordingContent = readFileSync(`${file}`, 'utf8');
    const stringifiedFile = await cypressStringifyChromeRecording(
      recordingContent
    );

    if (!stringifiedFile) {
      return;
    }

    const fileName = file.split('/').pop();
    const testName = fileName ? fileName.replace('.json', '') : undefined;

    if (dry) {
      console.log(stringifiedFile);
    } else if (!testName) {
      console.log(
        chalk.red('No file or folder was found to export. Please try again.')
      );
    } else {
      exportFileToFolder({
        stringifiedFile,
        testName,
        outputFolder,
        outputPath,
      });
    }
  });
}
