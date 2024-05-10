import { assert } from 'chai';
import { stringifyStep, stringify } from '@puppeteer/replay';
import { CypressStringifyExtension } from '../src/CypressStringifyExtension.js';
import {
  SupportedRecorderKeysKeys,
  supportedRecorderKeys,
} from '../src/constants.js';
import { Schema, StepType, AssertedEventType } from '@puppeteer/replay';

describe('CypressStringifyExtension', function () {
  const extension = new CypressStringifyExtension();

  it('correctly stringifies an entier recording', async function () {
    const flow = { title: 'click step', steps: [{
      type: StepType.Click as const,
      target: 'main',
      selectors: [['aria/Test'], ['#test']],
      offsetX: 1,
      offsetY: 1,
    }, {
      type: StepType.Navigate as const,
      assertedEvents: [
        {
          type: AssertedEventType.Navigation as const,
          url: 'https://learn.cypress.io/',
          title: 'Coffee cart',
        },
      ],
      url: 'https://learn.cypress.io/',
    }] };

    const result = await stringify(flow, {
      extension,
    });

    assert.equal(result.toString(), `
describe("click step", () => {
  it("tests click step", () => {
    cy.get("#test").click();
    cy.visit("https://learn.cypress.io/");
  });
});
//# recorderSourceMap=BCBDB
`.trimStart());
  });

  it('correctly exports Chrome Recorder click step', async function () {
    const step = {
      type: StepType.Click as const,
      target: 'main',
      selectors: [['aria/Test'], ['#test']],
      offsetX: 1,
      offsetY: 1,
    };
    const result = await stringifyStep(step, {
      extension,
    });

    assert.equal(result.toString(), 'cy.get("#test").click();\n');
  });

  it('correctly exports Chrome Recorder doubleClick step', async function () {
    const step = {
      type: StepType.DoubleClick as const,
      target: 'main',
      selectors: [['aria/Test'], ['#test']],
      offsetX: 1,
      offsetY: 1,
    };
    const result = await stringifyStep(step, {
      extension,
    });

    assert.equal(result.toString(), 'cy.get("#test").dblclick();\n');
  });

  it('correctly exports Chrome Recorder click step with right click', async function () {
    const step = {
      type: StepType.Click as const,
      target: 'main',
      selectors: [['aria/Test'], ['#test']],
      button: 'secondary' as const,
      offsetX: 1,
      offsetY: 1,
    };
    const result = await stringifyStep(step, {
      extension,
    });

    assert.equal(result.toString(), 'cy.get("#test").rightclick();\n');
  });

  it('correctly exports Chrome Recorder navigate step', async function () {
    const step = {
      type: StepType.Navigate as const,
      assertedEvents: [
        {
          type: AssertedEventType.Navigation as const,
          url: 'https://learn.cypress.io/',
          title: 'Coffee cart',
        },
      ],
      url: 'https://learn.cypress.io/',
    };
    const result = await stringifyStep(step, {
      extension,
    });

    assert.equal(result.toString(),
      'cy.visit("https://learn.cypress.io/");\n'
    );
  });

  it('correctly handles Chrome Recorder click step with asserted navigation', async function () {
    const step = {
      type: StepType.Click as const,
      target: 'main',
      selectors: [['aria/Test'], ['#test']],
      assertedEvents: [
        {
          type: AssertedEventType.Navigation as const,
          url: 'https://learn.cypress.io/',
          title: 'Coffee cart',
        },
      ],
      offsetX: 1,
      offsetY: 1,
    };
    const result = await stringifyStep(step, {
      extension,
    });

    assert.equal(result.toString(), 'cy.get("#test").click();\ncy.location("href").should("eq", "https://learn.cypress.io/");\n');
  });

  it('correctly exports Chrome Recorder scroll step', async function () {
    const step = {
      type: StepType.Scroll as const,
      target: 'main',
      x: 0,
      y: 805,
    };
    const result = await stringifyStep(step, {
      extension,
    });
    assert.equal(result.toString(), 'cy.scrollTo(0, 805);\n');
  });

  it('correctly exports Chrome Recorder setViewport step', async function () {
    const step = {
      type: StepType.SetViewport as const,
      width: 843,
      height: 1041,
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      isLandscape: false,
    };
    const result = await stringifyStep(step, {
      extension,
    });
    assert.equal(result.toString(), 'cy.viewport(843, 1041);\n');
  });

  it('correctly exports Chrome Recorder change step', async function () {
    
    const step = {
      type: StepType.Change as const,
      target: 'main',
      selectors: [['aria/Name'], ['#name']],
      value: 'jane',
    };
    const result = await stringifyStep(step, {
      extension,
    });
    assert.equal(result.toString(), 'cy.get("#name").type("jane");\n');
  });

  it('correctly handles keyDown step type', async function () {
    const step = {
      type: StepType.KeyDown as const,
      target: 'main',
      key: 'Meta' as const,
    };
    const result = await stringifyStep(step, {
      extension,
    });
    assert.equal(result.toString(), '\n');
  });

  it('correctly handles keyDown step types that are supported', async function () {
    Object.keys(supportedRecorderKeys).map(async (key) => {
      const step = {
        type: StepType.KeyDown as const,
        target: 'main',
        key: supportedRecorderKeys[
          key as SupportedRecorderKeysKeys
        ].toUpperCase() as Schema.Key,
      };
      const result = await stringifyStep(step, {
        extension,
      });
      assert.equal(result.toString(), `cy.type("{${key}}");\n`);
    });
  });

  it('correctly handles keyDown step type that are not supported', async function () {
    const step = {
      type: StepType.KeyDown as const,
      target: 'main',
      key: 'Meta' as const,
    };
    const result = await stringifyStep(step, {
      extension,
    });
    assert.equal(result.toString(), '\n');
  });

  it('correctly handles keyUp step type by ignoring it for now', async function () {
    const step = {
      type: StepType.KeyUp as const,
      target: 'main',
      key: 'Meta' as const,
    };
    const result = await stringifyStep(step, {
      extension,
    });
    assert.equal(result.toString(), '\n');
  });

  it('correctly handles Chrome Recorder hover step', async function () {
    const step = {
      type: StepType.Hover as const,
      target: 'main',
      selectors: [['aria/Test'], ['#test']],
    };
    const result = await stringifyStep(step, {
      extension,
    });
    assert.equal(result.toString(), `cy.get("#test").trigger("mouseover");\n`);
  });

  it('correctly handle when there are a unique selector on a any kind of event', async function () {
    const step = {
      type: StepType.Click as const,
      target: 'main',
      selectors: ['div:nth-of-type(1)'],
      offsetX: 1,
      offsetY: 1,
    };

    const result = await stringifyStep(step, {
      extension,
    });

    assert.equal(result.toString(), `cy.get("div:nth-of-type(1)").click();\n`);
  });

  it('correctly skip aria selectors when there are an array of selectors on any kind of event', async function () {
    const step = {
      type: StepType.Click as const,
      target: 'main',
      selectors: [
        "aria/npm install cypress",
        "main button",
      ],
      offsetX: 1,
      offsetY: 1,
    };

    const result = await stringifyStep(step, {
      extension,
    });

    assert.equal(result.toString(), `cy.get("main button").click();\n`);
  });
});
