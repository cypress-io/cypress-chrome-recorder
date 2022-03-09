#!/usr/bin/env node

// Based on https://github.com/reactjs/react-codemod/blob/master/bin/cli.js

import { globbySync } from 'globby';
import inquirer from 'inquirer';
import meow from 'meow';
import chalk from 'chalk';

import { runTransforms } from './transforms.js';

// eslint-disable-next-line @typescript-eslint/no-var-requires
import isGitClean from 'is-git-clean';

// CLI
const cli = meow(
  `
Usage:      npx cypress-chrome-recorder <path> [options]

Examples:   npx cypress-chrome-recorder recording.json
            npx cypress-chrome-recorder recordings/*.json

Options:
  -f, --force       Bypass Git safety checks and force script to run
  -d, --dry         Dry run (no files are output)
  -p, --print       Print transformed files to stdout, useful for development,`,
  {
    importMeta: import.meta,
    flags: {
      force: {
        type: 'boolean',
        alias: 'f',
      },
      dry: {
        type: 'boolean',
        alias: 'd',
      },
      print: {
        type: 'boolean',
        alias: 'p',
      },
    },
  }
);

function checkGitStatus(force: boolean | undefined) {
  let clean = false;
  let errorMessage = 'Unable to determine if git directory is clean';
  try {
    clean = isGitClean.sync(process.cwd());
    errorMessage = 'Git directory is not clean';
  } catch (err: any) {
    if (err && err.stderr && err.stderr.indexOf('Not a git repository') >= 0) {
      clean = true;
    }
  }

  if (!clean) {
    if (force) {
      console.log(`WARNING: ${errorMessage}. Forcibly continuing.`);
    } else {
      console.log('Thank you for using cypress-chrome-recorder.');
      console.log(
        chalk.yellow(
          '\nBefore we continue, please stash or commit your git changes.'
        )
      );
      console.log(
        '\nYou may use the --force flag to override this safety check.'
      );
      process.exit(1);
    }
  }
}

function expandedFilePaths(filesBeforeExpansion: string[]) {
  const shouldExpandFiles = filesBeforeExpansion.some((file: string) =>
    file.includes('*')
  );
  return shouldExpandFiles
    ? globbySync(filesBeforeExpansion)
    : filesBeforeExpansion;
}

if (!cli.flags.dry) {
  checkGitStatus(cli.flags.force);
}

inquirer
  .prompt([
    {
      type: 'input',
      name: 'files',
      message:
        'Which directory or files should be translated from Recorder JSON to Cypress?',
      when: () => !cli.input.length,
      default: '.',
      filter: (files: string) =>
        files
          .trim()
          .split(/\s+/)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .filter((v: any) => v),
    },
  ])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .then((answers: any) => {
    const { files } = answers;

    const filesBeforeExpansion = cli.input.length ? cli.input : files;
    const filesExpanded = expandedFilePaths([filesBeforeExpansion]);

    if (!filesExpanded.length) {
      console.log(`No files found matching ${filesBeforeExpansion.join(' ')}`);
      return null;
    }

    return runTransforms({
      files: filesExpanded,
      flags: cli.flags,
    });
  })
  .catch((errors) => {
    console.log('errors: ', errors);
  });
