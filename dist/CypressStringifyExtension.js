var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CypressStringifyExtension_instances, _CypressStringifyExtension_appendStepType, _CypressStringifyExtension_appendChangeStep, _CypressStringifyExtension_appendClickStep, _CypressStringifyExtension_appendNavigationStep, _CypressStringifyExtension_appendScrollStep, _CypressStringifyExtension_appendViewportStep;
import { StringifyExtension } from '@puppeteer/replay';
// import { recorderChangeTypes } from './constants.js';
export class CypressStringifyExtension extends StringifyExtension {
    constructor() {
        super(...arguments);
        _CypressStringifyExtension_instances.add(this);
    }
    async beforeAllSteps(out, flow) {
        out.appendLine(`describe(${formatAsJSLiteral(flow.title)}, () => {`);
        out
            .appendLine(`it(${formatAsJSLiteral(`tests ${flow.title}`)}, () => {`)
            .startBlock();
    }
    async afterAllSteps(out) {
        out.appendLine('});').endBlock();
        out.appendLine('});');
    }
    async stringifyStep(out, step, flow) {
        __classPrivateFieldGet(this, _CypressStringifyExtension_instances, "m", _CypressStringifyExtension_appendStepType).call(this, out, step, flow);
        if (step.assertedEvents) {
            // TODO: handle assertions
        }
    }
}
_CypressStringifyExtension_instances = new WeakSet(), _CypressStringifyExtension_appendStepType = function _CypressStringifyExtension_appendStepType(out, step, flow) {
    switch (step.type) {
        case 'click':
            return __classPrivateFieldGet(this, _CypressStringifyExtension_instances, "m", _CypressStringifyExtension_appendClickStep).call(this, out, step, flow);
        case 'change':
            return __classPrivateFieldGet(this, _CypressStringifyExtension_instances, "m", _CypressStringifyExtension_appendChangeStep).call(this, out, step, flow);
        case 'setViewport':
            return __classPrivateFieldGet(this, _CypressStringifyExtension_instances, "m", _CypressStringifyExtension_appendViewportStep).call(this, out, step);
        case 'scroll':
            return __classPrivateFieldGet(this, _CypressStringifyExtension_instances, "m", _CypressStringifyExtension_appendScrollStep).call(this, out, step, flow);
        case 'navigate':
            return __classPrivateFieldGet(this, _CypressStringifyExtension_instances, "m", _CypressStringifyExtension_appendNavigationStep).call(this, out, step);
        default:
            return assertAllValidStepTypesAreHandled(step);
    }
}, _CypressStringifyExtension_appendChangeStep = function _CypressStringifyExtension_appendChangeStep(out, step, flow) {
    const cySelector = handleSelectors(step.selectors, flow);
    if (cySelector) {
        out.appendLine(`${cySelector}.type(${formatAsJSLiteral(step.value)});`);
    }
    out.appendLine('');
}, _CypressStringifyExtension_appendClickStep = function _CypressStringifyExtension_appendClickStep(out, step, flow) {
    const cySelector = handleSelectors(step.selectors, flow);
    if (cySelector) {
        out.appendLine(`${cySelector}.click();`);
    }
    else {
        out.appendLine(' // TODO');
    }
    out.appendLine('');
}, _CypressStringifyExtension_appendNavigationStep = function _CypressStringifyExtension_appendNavigationStep(out, step) {
    out.appendLine(`cy.visit(${formatAsJSLiteral(step.url)});`);
    out.appendLine('');
}, _CypressStringifyExtension_appendScrollStep = function _CypressStringifyExtension_appendScrollStep(out, step, flow) {
    if ('selectors' in step) {
        out.appendLine(`${handleSelectors(step.selectors, flow)}.scrollTo(${step.x}, ${step.y});`);
    }
    else {
        out.appendLine(`cy.scrollTo(${step.x}, ${step.y});`);
    }
    out.appendLine('');
}, _CypressStringifyExtension_appendViewportStep = function _CypressStringifyExtension_appendViewportStep(out, step) {
    out.appendLine(`cy.viewport(${step.width}, ${step.height});`);
    out.appendLine('');
};
function formatAsJSLiteral(value) {
    return JSON.stringify(value);
}
function filterArrayByString(selectors, value) {
    return selectors.filter((selector) => value === 'aria/'
        ? !selector[0].includes(value)
        : selector[0].includes(value));
}
function handleSelectors(selectors, flow) {
    // Remove Aria selectors in favor of DOM selectors
    const nonAriaSelectors = filterArrayByString(selectors, 'aria/');
    let preferredSelector;
    // Give preference to user-specified selectors
    if (flow.selectorAttribute) {
        preferredSelector = filterArrayByString(nonAriaSelectors, flow.selectorAttribute);
    }
    if (preferredSelector && preferredSelector[0]) {
        return `cy.get(${formatAsJSLiteral(preferredSelector[0][0])})`;
    }
    else {
        return `cy.get(${formatAsJSLiteral(nonAriaSelectors[0][0])})`;
    }
}
function assertAllValidStepTypesAreHandled(step) {
    console.log(`Cypress does not currently handle migrating step type: ${step.type}`);
}
