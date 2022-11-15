import { assert } from 'chai';
import { LineWriterImpl } from './LineWriterImpl.js';
import { CypressStringifyExtension } from '../src/CypressStringifyExtension.js';
import {
  SupportedRecorderKeysKeys,
  supportedRecorderKeys,
} from '../src/constants.js';
import { Schema, StepType, AssertedEventType } from '@puppeteer/replay';

describe('CypressStringifyExtension', function () {
  it('correctly exports Chrome Recorder click step', async function () {
    const ext = new CypressStringifyExtension();
    const step = {
      type: StepType.Click as const,
      target: 'main',
      selectors: [['aria/Test'], ['#test']],
      offsetX: 1,
      offsetY: 1,
    };
    const flow = { title: 'click step', steps: [step] };
    const writer = new LineWriterImpl('  ');

    await ext.stringifyStep(writer, step, flow);

    assert.equal(writer.toString(), 'cy.get("#test").click();\n');
  });

  it('correctly exports Chrome Recorder doubleClick step', async function () {
    const ext = new CypressStringifyExtension();
    const step = {
      type: StepType.DoubleClick as const,
      target: 'main',
      selectors: [['aria/Test'], ['#test']],
      offsetX: 1,
      offsetY: 1,
    };
    const flow = { title: 'click step', steps: [step] };
    const writer = new LineWriterImpl('  ');

    await ext.stringifyStep(writer, step, flow);

    assert.equal(writer.toString(), 'cy.get("#test").dblclick();\n');
  });

  it('correctly exports Chrome Recorder click step with right click', async function () {
    const ext = new CypressStringifyExtension();
    const step = {
      type: StepType.Click as const,
      target: 'main',
      selectors: [['aria/Test'], ['#test']],
      button: 'secondary' as const,
      offsetX: 1,
      offsetY: 1,
    };
    const flow = { title: 'click step', steps: [step] };
    const writer = new LineWriterImpl('  ');

    await ext.stringifyStep(writer, step, flow);

    assert.equal(writer.toString(), 'cy.get("#test").rightclick();\n');
  });

  it('correctly exports Chrome Recorder navigate step', async function () {
    const ext = new CypressStringifyExtension();
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
    const flow = { title: 'navigate step', steps: [step] };
    const writer = new LineWriterImpl('  ');

    await ext.stringifyStep(writer, step, flow);

    assert.equal(
      writer.toString(),
      'cy.visit("https://learn.cypress.io/");\n'
    );
  });

  it('correctly handles Chrome Recorder click step with asserted navigation', async function () {
    const ext = new CypressStringifyExtension();
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
    const flow = { title: 'click step', steps: [step] };
    const writer = new LineWriterImpl('  ');

    await ext.stringifyStep(writer, step, flow);

    assert.equal(writer.toString(), 'cy.get("#test").click();\ncy.location("href").should("eq", "https://learn.cypress.io/");\n');
  });

  it('correctly exports Chrome Recorder scroll step', async function () {
    const ext = new CypressStringifyExtension();
    const step = {
      type: StepType.Scroll as const,
      target: 'main',
      x: 0,
      y: 805,
    };
    const flow = { title: 'scroll step', steps: [step] };
    const writer = new LineWriterImpl('  ');

    await ext.stringifyStep(writer, step, flow);

    assert.equal(writer.toString(), 'cy.scrollTo(0, 805);\n');
  });

  it('correctly exports Chrome Recorder setViewport step', async function () {
    const ext = new CypressStringifyExtension();
    const step = {
      type: StepType.SetViewport as const,
      width: 843,
      height: 1041,
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      isLandscape: false,
    };
    const flow = { title: 'setViewport step', steps: [step] };
    const writer = new LineWriterImpl('  ');

    await ext.stringifyStep(writer, step, flow);

    assert.equal(writer.toString(), 'cy.viewport(843, 1041);\n');
  });

  it('correctly exports Chrome Recorder change step', async function () {
    const ext = new CypressStringifyExtension();
    const step = {
      type: StepType.Change as const,
      target: 'main',
      selectors: [['aria/Name'], ['#name']],
      value: 'jane',
    };
    const flow = { title: 'change step', steps: [step] };
    const writer = new LineWriterImpl('  ');

    await ext.stringifyStep(writer, step, flow);

    assert.equal(writer.toString(), 'cy.get("#name").type("jane");\n');
  });

  it('correctly handles keyDown step type', async function () {
    const ext = new CypressStringifyExtension();
    const step = {
      type: StepType.KeyDown as const,
      target: 'main',
      key: 'Meta' as const,
    };
    const flow = { title: 'keyDown step', steps: [step] };
    const writer = new LineWriterImpl('  ');

    await ext.stringifyStep(writer, step, flow);

    assert.equal(writer.toString(), '');
  });

  it('correctly handles keyDown step types that are supported', async function () {
    Object.keys(supportedRecorderKeys).map(async (key) => {
      const ext = new CypressStringifyExtension();
      const step = {
        type: StepType.KeyDown as const,
        target: 'main',
        key: supportedRecorderKeys[
          key as SupportedRecorderKeysKeys
        ].toUpperCase() as Schema.Key,
      };
      const flow = { title: 'keyUp step', steps: [step] };
      const writer = new LineWriterImpl('  ');

      await ext.stringifyStep(writer, step, flow);

      assert.equal(writer.toString(), `cy.type("{${key}}");\n`);
    });
  });

  it('correctly handles keyDown step type that are not supported', async function () {
    const ext = new CypressStringifyExtension();
    const step = {
      type: StepType.KeyDown as const,
      target: 'main',
      key: 'Meta' as const,
    };
    const flow = { title: 'keyUp step', steps: [step] };
    const writer = new LineWriterImpl('  ');

    await ext.stringifyStep(writer, step, flow);

    assert.equal(writer.toString(), '');
  });

  it('correctly handles keyUp step type by ignoring it for now', async function () {
    const ext = new CypressStringifyExtension();
    const step = {
      type: StepType.KeyUp as const,
      target: 'main',
      key: 'Meta' as const,
    };
    const flow = { title: 'keyUp step', steps: [step] };
    const writer = new LineWriterImpl('  ');

    await ext.stringifyStep(writer, step, flow);

    assert.equal(writer.toString(), '');
  });

  it('correctly handles Chrome Recorder hover step', async function () {
    const ext = new CypressStringifyExtension();
    const step = {
      type: StepType.Hover as const,
      target: 'main',
      selectors: [['aria/Test'], ['#test']],
    };
    const flow = { title: 'hover step', steps: [step] };
    const writer = new LineWriterImpl('  ');

    await ext.stringifyStep(writer, step, flow);

    assert.equal(writer.toString(), `cy.get("#test").trigger("mouseover");\n`);
  });
});
