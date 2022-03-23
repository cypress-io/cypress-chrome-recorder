import { LineWriter, StringifyExtension } from '@puppeteer/replay';
import {
  ChangeStep,
  ClickStep,
  NavigateStep,
  ScrollStep,
  SetViewportStep,
  Selector,
  Step,
  UserFlow,
} from '@puppeteer/replay/lib/Schema';

// import { recorderChangeTypes } from './constants.js';

export class CypressStringifyExtension extends StringifyExtension {
  async beforeAllSteps(out: LineWriter, flow: UserFlow): Promise<void> {
    out.appendLine(`describe(${formatAsJSLiteral(flow.title)}, () => {`);
    out
      .appendLine(`it(${formatAsJSLiteral(`tests ${flow.title}`)}, () => {`)
      .startBlock();
  }

  async afterAllSteps(out: LineWriter): Promise<void> {
    out.appendLine('});').endBlock();
    out.appendLine('});');
  }

  async stringifyStep(
    out: LineWriter,
    step: Step,
    flow: UserFlow
  ): Promise<void> {
    this.#appendStepType(out, step, flow);

    if (step.assertedEvents) {
      // TODO: handle assertions
    }
  }

  #appendStepType(out: LineWriter, step: Step, flow: UserFlow): void {
    switch (step.type) {
      case 'click':
        return this.#appendClickStep(out, step, flow);
      case 'change':
        return this.#appendChangeStep(out, step, flow);
      case 'setViewport':
        return this.#appendViewportStep(out, step);
      case 'scroll':
        return this.#appendScrollStep(out, step, flow);
      case 'navigate':
        return this.#appendNavigationStep(out, step);
      default:
        return assertAllValidStepTypesAreHandled(step);
    }
  }

  #appendChangeStep(out: LineWriter, step: ChangeStep, flow: UserFlow): void {
    const cySelector = handleSelectors(step.selectors, flow);

    if (cySelector) {
      // handleChangeStep(step);
      out.appendLine(`${cySelector}.type(${formatAsJSLiteral(step.value)});`);
    }

    out.appendLine('');
    // Handle text entry and form elements that update.
  }

  #appendClickStep(out: LineWriter, step: ClickStep, flow: UserFlow): void {
    const cySelector = handleSelectors(step.selectors, flow);

    if (cySelector) {
      out.appendLine(`${cySelector}.click();`);
    } else {
      out.appendLine(' // TODO');
    }

    out.appendLine('');
  }

  #appendNavigationStep(out: LineWriter, step: NavigateStep): void {
    out.appendLine(`cy.visit(${formatAsJSLiteral(step.url)});`);
    out.appendLine('');
  }

  #appendScrollStep(out: LineWriter, step: ScrollStep, flow: UserFlow): void {
    if ('selectors' in step) {
      out.appendLine(
        `${handleSelectors(step.selectors, flow)}.scrollTo(${step.x}, ${
          step.y
        });`
      );
    } else {
      out.appendLine(`cy.scrollTo(${step.x}, ${step.y});`);
    }
    out.appendLine('');
  }

  #appendViewportStep(out: LineWriter, step: SetViewportStep): void {
    out.appendLine(`cy.viewport(${step.width}, ${step.height})`);
    out.appendLine('');
  }
}

function formatAsJSLiteral(value: string) {
  return JSON.stringify(value);
}

function filterArrayByString(selectors: Selector[], value: string) {
  return selectors.filter((selector) =>
    value === 'aria/'
      ? !selector[0].includes(value)
      : selector[0].includes(value)
  );
}

function handleSelectors(
  selectors: Selector[],
  flow: UserFlow
): string | undefined {
  // Remove Aria selectors in favor of DOM selectors
  const nonAriaSelectors = filterArrayByString(selectors, 'aria/');
  let preferredSelector;

  // Give preference to user-specified selectors
  if (flow.selectorAttribute) {
    preferredSelector = filterArrayByString(
      nonAriaSelectors,
      flow.selectorAttribute
    );
  }
  if (preferredSelector && preferredSelector[0]) {
    return `cy.get(${formatAsJSLiteral(preferredSelector[0][0])})`;
  } else {
    return `cy.get(${formatAsJSLiteral(nonAriaSelectors[0][0])})`;
  }
}

function assertAllValidStepTypesAreHandled(step: Step): void {
  console.log(
    `Cypress does not currently handle migrating step type: ${step.type}`
  );
}
