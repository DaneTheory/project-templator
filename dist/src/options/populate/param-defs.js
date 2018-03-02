"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sandbox_1 = require("../../sandbox");
const deepmerge = require("deepmerge");
function resolveParamDefs(paramDefs = {}) {
    const keys = Object.keys(paramDefs);
    return keys.reduce((acc, key) => {
        const def = paramDefs[key] || {};
        // recursively inherit
        const inheritData = def.inherits ? resolveParamDefs(paramDefs[def.inherits]) : def;
        acc[key] = deepmerge(def, inheritData || {});
        return acc;
    }, paramDefs);
}
function resolveParamDefsAt(filePath) {
    const ctx = sandbox_1.runSandboxedCodeAt(filePath);
    return resolveParamDefs(ctx.paramDefs);
}
exports.resolveParamDefsAt = resolveParamDefsAt;
//# sourceMappingURL=param-defs.js.map