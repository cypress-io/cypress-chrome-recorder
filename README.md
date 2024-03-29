# @cypress/chrome-recorder

[![npm version](https://img.shields.io/npm/v/@cypress/chrome-recorder)](https://www.npmjs.com/package/@cypress/chrome-recorder) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

This repo provides tools to export Cypress Tests from [Google Chrome DevTools' Recordings](https://goo.gle/devtools-recorder) programmatically.

Install [Cypress Chrome Recorder extension](https://github.com/cypress-io/cypress-recorder-extension) if you want to export the recordings directly from the Chrome DevTools' Recorder UI.

[![Cypress Chrome Recorder Demo](https://img.youtube.com/vi/-RJuZrq-wOk/0.jpg)](https://youtu.be/-RJuZrq-wOk)

## Prerequisites

In order to export JSON files from Chrome DevTools Recorder you will need to be on Chrome 101 or newer.

`dblClick` and `rightclick` require Chrome 103 or newer.

## Installation

```sh
$ npm install -g @cypress/chrome-recorder
```

## Usage

### Via CLI

To use the interactive CLI, run:

```sh
$ npx @cypress/chrome-recorder
```

The CLI will prompt you to enter the path of the directory or file that you would like to modify as well as a path to write the generated Cypress test to.

If you prefer to enter paths via the CLI, you can run the following command to export individual recordings:

```sh
$ npx @cypress/chrome-recorder <relative path to target test file>
```

or for folders containing multiple recordings:

```sh
$ npx @cypress/chrome-recorder <relative path to target test folder>/*.json
```

By default the output will be written to `cypress/integration` with a fallback to `cypress/e2e`. If you do not have those folders, create them manually or install Cypress by running `yarn add -D cypress` or `npm install --save-dev cypress` in your project.

If you prefer a different output directory, specify that via CLI:

```sh
$ npx @cypress/chrome-recorder <relative path to target test folder>/*.json --output=folder-name
```

or via the interactive CLI prompts.

### CLI Options

| Option       | Description                                               |
| ------------ | --------------------------------------------------------- |
| -f, --force  | Bypass Git safety checks and force exporter to run        |
| -d, --dry    | Dry run (no changes are made to files)                    |
| -o, --output | Output location of the files generated by the exporter    |
| -p, --print  | Print transformed files to stdout, useful for development |

### Via Import

```js
import { cypressStringifyChromeRecording } from '@cypress/chrome-recorder';

const stringifiedContent = await cypressStringifyChromeRecording(
  recordingContent
);

return stringifiedContent;
```

## Supported Chrome Recorder Step Types

Below are the step types that are currently supported:

| Type                | Description                                   |
| ------------------- | --------------------------------------------- |
| change              | becomes **cy.get("_element_").type("text")**  |
| click               | becomes **cy.get("_element_").click();**      |
| click (right click) | becomes **cy.get("_element_").rightclick();** |
| doubleClick         | becomes **cy.get("_element_").dblclick();**   |
| hover               | becomes **cy.get("_element_").trigger();**    |
| keyDown             | becomes **cy.type("{key}")**                  |
| keyUp               | _not exported at this time_                   |
| navigate            | becomes **cy.visit("url")**                   |
| setViewport         | becomes **cy.viewport(width, height)**        |
| scroll              | becomes **cy.scrollTo(${step.x}, ${step.y})** |


If a step type is not listed above, then a warning message should be displayed in the CLI.

## License

[![license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/cypress-io/cypress-chrome-recorder/blob/master/LICENSE)

This project is licensed under the terms of the [MIT license](/LICENSE).
