"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sandbox_1 = require("../../sandbox");
const deepmerge = require('deepmerge');
function resolveEntryData(entry, entryDataSrc = {}) {
    const entries = ['folder', 'entity', 'name', 'filePath'];
    return entries.reduce((entryData, key) => {
        const data = entryDataSrc[key] || {};
        const entryKey = entry[key];
        const keyData = data[entryKey];
        return deepmerge(entryData, keyData);
    }, entryDataSrc);
}
function resolveEntryDataAt(entry, options) {
    const { entryFilePath } = options;
    const ctx = sandbox_1.runSandboxedCodeAt(entryFilePath);
    return resolveEntryData(entry, ctx.entryData);
}
exports.resolveEntryDataAt = resolveEntryDataAt;
//# sourceMappingURL=entry-types.js.map