import { assert } from 'chai';
import { LineWriterImpl } from './LineWriterImpl.js';
import { CypressStringifyExtension } from '../src/CypressStringifyExtension.js';

describe('CypressStringifyExtension', function () {
  it('correctly exports Chrome Recorder click step', async function () {
    const ext = new CypressStringifyExtension();
    const step = {
      type: 'click' as const,
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

  it('correctly exports Chrome Recorder navigate step', async function () {
    const ext = new CypressStringifyExtension();
    const step = {
      type: 'navigate' as const,
      assertedEvents: [
        {
          type: 'navigation' as const,
          url: 'https://coffee-cart.netlify.app/',
          title: 'Coffee cart',
        },
      ],
      url: 'https://coffee-cart.netlify.app/',
    };
    const flow = { title: 'navigate step', steps: [step] };
    const writer = new LineWriterImpl('  ');

    await ext.stringifyStep(writer, step, flow);

    assert.equal(
      writer.toString(),
      'cy.visit("https://coffee-cart.netlify.app/");\n'
    );
  });

  it('correctly exports Chrome Recorder scroll step', async function () {
    const ext = new CypressStringifyExtension();
    const step = {
      type: 'scroll' as const,
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
      type: 'setViewport' as const,
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
      type: 'change' as const,
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
      type: 'keyDown' as const,
      target: 'main',
      key: 'Meta' as const,
    };
    const flow = { title: 'keyDown step', steps: [step] };
    const writer = new LineWriterImpl('  ');

    await ext.stringifyStep(writer, step, flow);

    assert.equal(writer.toString(), '');
  });

  it('correctly handles keyUp step type', async function () {
    const ext = new CypressStringifyExtension();
    const step = {
      type: 'keyUp' as const,
      target: 'main',
      key: 'Meta' as const,
    };
    const flow = { title: 'keyUp step', steps: [step] };
    const writer = new LineWriterImpl('  ');

    await ext.stringifyStep(writer, step, flow);

    assert.equal(writer.toString(), '');
  });
});
