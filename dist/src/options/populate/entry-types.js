"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const run_sandboxed_1 = require("run-sandboxed");
const deepmerge = require('deepmerge');
const $defaults = {
    entryTypes: ['folder', 'entity', 'name', 'filePath']
};
function resolveEntryData(entry, entryDataSrc = {}, options = {}) {
    let { entryTypes, defaults, info } = options;
    defaults = defaults || $defaults;
    entryTypes = entryTypes || defaults.entryTypes;
    info && info('resolveEntryData', {
        entryTypes,
        entryDataSrc
    });
    function resolveEntryAt(entryData, key) {
        const data = entryDataSrc[key] || {};
        const entryKey = entry[key] || entry.type[key];
        const keyData = data[entryKey] || {};
        info && info('resolveEntryAt', {
            key,
            data,
            entryKey,
            keyData
        });
        return deepmerge(entryData, keyData);
    }
    return entryTypes.reduce(resolveEntryAt, {});
}
exports.resolveEntryData = resolveEntryData;
function resolveEntryDataAt(filePath, entry, options) {
    const ctx = run_sandboxed_1.runSandboxedCodeAt(filePath, options);
    const { entryData } = ctx;
    const params = resolveEntryData(entry, entryData.type, options);
    return {
        params,
        uses: entryData.uses
    };
}
exports.resolveEntryDataAt = resolveEntryDataAt;
//# sourceMappingURL=entry-types.js.map