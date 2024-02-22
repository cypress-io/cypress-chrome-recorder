import { LineWriter, Schema, StringifyExtension, StepType } from '@puppeteer/replay';

import {
  SupportedRecorderKeysKeys,
  supportedRecorderKeys,
} from './constants.js';


export class CypressStringifyExtension extends StringifyExtension {
  async beforeAllSteps(out: LineWriter, flow: Schema.UserFlow): Promise<void> {
    out.appendLine(`describe(${formatAsJSLiteral(flow.title)}, () => {`).startBlock();
    out
      .appendLine(`it(${formatAsJSLiteral(`tests ${flow.title}`)}, () => {`)
      .startBlock();
  }

  async afterAllSteps(out: LineWriter): Promise<void> {
    out.endBlock().appendLine('});');
    out.endBlock().appendLine('});');
  }

  async stringifyStep(
    out: LineWriter,
    step: Schema.Step,
    flow?: Schema.UserFlow
  ): Promise<void> {
    this.#appendStepType(out, step, flow);

    if (step.assertedEvents) {
      // TODO: handle assertions
    }
  }

  #appendStepType(
    out: LineWriter,
    step: Schema.Step,
    flow?: Schema.UserFlow
  ): void {
    switch (step.type) {
      case StepType.Click:
        return this.#appendClickStep(out, step, flow);
      case StepType.DoubleClick:
        return this.#appendDoubleClickStep(out, step, flow);
      case StepType.Change:
        return this.#appendChangeStep(out, step, flow);
      case StepType.SetViewport:
        return this.#appendViewportStep(out, step);
      case StepType.Scroll:
        return this.#appendScrollStep(out, step, flow);
      case StepType.Navigate:
        return this.#appendNavigationStep(out, step);
      case StepType.KeyDown:
        return this.#appendKeyDownStep(out, step);
      case StepType.Hover:
        return this.#appendHoverStep(out, step, flow);
      case StepType.WaitForElement:
        return this.#appendWaitForElementStep(out, step, flow);
    }
  }

  #appendChangeStep(
    out: LineWriter,
    step: Schema.ChangeStep,
    flow?: Schema.UserFlow
  ): void {
    const cySelector = handleSelectors(step.selectors, flow);

    if (cySelector) {
      out.appendLine(`${cySelector}.type(${formatAsJSLiteral(step.value)});`);
    }
  }

  #appendClickStep(
    out: LineWriter,
    step: Schema.ClickStep,
    flow?: Schema.UserFlow
  ): void {
    const cySelector = handleSelectors(step.selectors, flow);
    const hasRightClick = step.button && step.button === 'secondary';

    if (cySelector) {
      hasRightClick
        ? out.appendLine(`${cySelector}.rightclick();`)
        : out.appendLine(`${cySelector}.click();`);
    } else {
      console.log(
        `Warning: The click on ${step.selectors[0]} was not able to be exported to Cypress. Please adjust your selectors and try again.`
      );
    }

    if (step.assertedEvents) {
      step.assertedEvents.forEach((event) => {
        if (event.type === 'navigation') {
          out.appendLine(`cy.location("href").should("eq", "${event.url}");`);
        }
      });
    }
  }

  #appendDoubleClickStep(
    out: LineWriter,
    step: Schema.DoubleClickStep,
    flow?: Schema.UserFlow
  ): void {
    const cySelector = handleSelectors(step.selectors, flow);

    if (cySelector) {
      out.appendLine(`${cySelector}.dblclick();`);
    } else {
      console.log(
        `Warning: The click on ${step.selectors[0]} was not able to be exported to Cypress. Please adjust your selectors and try again.`
      );
    }
  }

  #appendHoverStep(
    out: LineWriter,
    step: Schema.HoverStep,
    flow?: Schema.UserFlow
  ): void {
    const cySelector = handleSelectors(step.selectors, flow);

    if (cySelector) {
      out.appendLine(`${cySelector}.trigger("mouseover");`);
    }

  }


  #appendWaitForElementStep(
      out: LineWriter,
      step: Schema.WaitForElementStep,
      flow?: Schema.UserFlow
  ): void {
    console.dir(step);
    // Temporary fix because chromes selector list on WaitForElement differs from other events
    // selectors in WaitForElement are string[] instead of string[][]
    const fixedSelectors: string[][] = [];
    for (const selector of step.selectors) {
      fixedSelectors.push([selector.toString()]);
    }
    const cySelector = handleSelectors(fixedSelectors, flow, step.timeout);
    if (cySelector) {
      out.appendLine(`${cySelector}.should('be.visible');`);
    }
  }

  #appendKeyDownStep(out: LineWriter, step: Schema.KeyDownStep): void {
    const pressedKey = step.key.toLowerCase() as SupportedRecorderKeysKeys;

    if (pressedKey in supportedRecorderKeys) {
      const keyValue = supportedRecorderKeys[pressedKey];
      out.appendLine(`cy.type(${formatAsJSLiteral(`{${keyValue}}`)});`);
    }
  }

  #appendNavigationStep(out: LineWriter, step: Schema.NavigateStep): void {
    out.appendLine(`cy.visit(${formatAsJSLiteral(step.url)});`);
  }

  #appendScrollStep(
    out: LineWriter,
    step: Schema.ScrollStep,
    flow?: Schema.UserFlow
  ): void {
    if ('selectors' in step) {
      out.appendLine(
        `${handleSelectors(step.selectors, flow)}.scrollTo(${step.x}, ${
          step.y
        });`
      );
    } else {
      out.appendLine(`cy.scrollTo(${step.x}, ${step.y});`);
    }
  }

  #appendViewportStep(out: LineWriter, step: Schema.SetViewportStep): void {
    out.appendLine(`cy.viewport(${step.width}, ${step.height});`);
  }
}

function formatAsJSLiteral(value: string) {
  return JSON.stringify(value);
}

function filterArrayByString(selectors: Schema.Selector[], value: string) {
  return selectors.filter((selector) =>
    value === 'aria/'
      ? !selector[0].includes(value)
      : selector[0].includes(value)
  );
}

function handleSelectors(
  selectors: Schema.Selector[],
  flow?: Schema.UserFlow,
  timeout?: number
): string | undefined {
  // Remove Aria selectors in favor of DOM selectors
  const nonAriaSelectors = filterArrayByString(selectors, 'aria/');
  let preferredSelector;
  // Give preference to user-specified selectors
  if (flow?.selectorAttribute) {
    preferredSelector = filterArrayByString(
      nonAriaSelectors,
      flow.selectorAttribute
    );
  }

  let selectorAddition = '';
  if (timeout) {
    selectorAddition = `, { timeout: ${timeout} }`
  }
  if (preferredSelector && preferredSelector[0]) {
    return `cy.get(${formatAsJSLiteral(preferredSelector[0][0])}${selectorAddition})`;
  } else {
    return `cy.get(${formatAsJSLiteral(nonAriaSelectors[0][0])}${selectorAddition})`;
  }
}

function assertAllValidStepTypesAreHandled(step: Schema.Step): void {
  console.log(
    `Warning: Cypress does not currently handle migrating steps of type: ${step.type}. Please check the output to see how this might affect your test.`
  );
}
