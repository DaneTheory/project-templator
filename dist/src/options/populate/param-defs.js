"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const run_sandboxed_1 = require("run-sandboxed");
const deepmerge = require("deepmerge");
function resolveParamDefs(paramDefs = {}, options = {}) {
    const { validate, info } = options;
    validate && validate.object(paramDefs);
    info && info('resolveParamDefs', {
        paramDefs,
        options
    });
    const keys = Object.keys(paramDefs);
    function resolveData(key) {
        const def = paramDefs[key] || {};
        const inheritKey = def.inherits || def.inherit;
        delete def.inherits;
        delete def.inherit;
        // recursively inherit
        const inheritData = inheritKey ? resolveData(inheritKey) : def;
        return deepmerge(def, inheritData || {});
    }
    function resolveParams(acc, key) {
        acc[key] = resolveData(key);
        return acc;
    }
    return keys.reduce(resolveParams, paramDefs);
}
exports.resolveParamDefs = resolveParamDefs;
function resolveParamDefsAt(filePath, options = {}) {
    const ctx = run_sandboxed_1.runSandboxedCodeAt(filePath, options);
    return resolveParamDefs(ctx.paramDefs, options);
}
exports.resolveParamDefsAt = resolveParamDefsAt;
//# sourceMappingURL=param-defs.js.map