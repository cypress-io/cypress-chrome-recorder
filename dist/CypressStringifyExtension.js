/**
    Copyright 2022 Google LLC

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        https://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
 */
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CypressStringifyExtension_instances, _CypressStringifyExtension_appendStepType, _CypressStringifyExtension_appendChangeStep, _CypressStringifyExtension_appendClickStep, _CypressStringifyExtension_appendNavigationStep, _CypressStringifyExtension_appendScrollStep, _CypressStringifyExtension_appendViewportStep;
import { StringifyExtension } from '@puppeteer/replay';
export class CypressStringifyExtension extends StringifyExtension {
    constructor() {
        super(...arguments);
        _CypressStringifyExtension_instances.add(this);
    }
    async beforeAllSteps(out, flow) {
        console.log('🚀 ~ file: CypressStringifyExtension.ts ~ line 23 ~ CypressStringifyExtension ~ beforeAllSteps ~ flow', flow);
        out.appendLine(`describe(${flow.title}, function() {`);
        out.appendLine(`  it(tests ${flow.title}, function() {`).startBlock();
    }
    async afterAllSteps(out, flow) {
        out.appendLine('  });').endBlock();
        out.appendLine('});');
    }
    async stringifyStep(out, step, flow) {
        __classPrivateFieldGet(this, _CypressStringifyExtension_instances, "m", _CypressStringifyExtension_appendStepType).call(this, out, step);
        if (step.assertedEvents) {
            // TODO: handle assertions
        }
    }
}
_CypressStringifyExtension_instances = new WeakSet(), _CypressStringifyExtension_appendStepType = function _CypressStringifyExtension_appendStepType(out, step) {
    switch (step.type) {
        case 'click':
            return __classPrivateFieldGet(this, _CypressStringifyExtension_instances, "m", _CypressStringifyExtension_appendClickStep).call(this, out, step);
        case 'change':
            return __classPrivateFieldGet(this, _CypressStringifyExtension_instances, "m", _CypressStringifyExtension_appendChangeStep).call(this, out, step);
        case 'setViewport':
            return __classPrivateFieldGet(this, _CypressStringifyExtension_instances, "m", _CypressStringifyExtension_appendViewportStep).call(this, out, step);
        case 'scroll':
            return __classPrivateFieldGet(this, _CypressStringifyExtension_instances, "m", _CypressStringifyExtension_appendScrollStep).call(this, out, step);
        case 'navigate':
            return __classPrivateFieldGet(this, _CypressStringifyExtension_instances, "m", _CypressStringifyExtension_appendNavigationStep).call(this, out, step);
        //   case 'customStep':
        //     return; // TODO: implement these
        //   default:
        //     return assertAllStepTypesAreHandled(step);
    }
}, _CypressStringifyExtension_appendChangeStep = function _CypressStringifyExtension_appendChangeStep(out, step) {
    console.log('🚀 ~ file: CypressStringifyExtension.ts ~ line 85 ~ CypressStringifyExtension ~ #appendChangeStep ~ step', step);
    // Handle text entry and form elements that update.
}, _CypressStringifyExtension_appendClickStep = function _CypressStringifyExtension_appendClickStep(out, step) {
    out.appendLine(`cy.get('[${step.selectors[0]}]').click();`);
}, _CypressStringifyExtension_appendNavigationStep = function _CypressStringifyExtension_appendNavigationStep(out, step) {
    out.appendLine(`cy.visit("${step.url}");`);
}, _CypressStringifyExtension_appendScrollStep = function _CypressStringifyExtension_appendScrollStep(out, step) {
    if ('selectors' in step) {
        out.appendLine(`cy.get('[${step.selectors[0]}]').scrollTo(${step.x}, ${step.y});`);
    }
    else {
        out.appendLine(`cy.scrollTo(${step.x}, ${step.y});`);
    }
}, _CypressStringifyExtension_appendViewportStep = function _CypressStringifyExtension_appendViewportStep(out, step) {
    out.appendLine(`cy.viewport(${step.width}, ${step.height})`);
};
