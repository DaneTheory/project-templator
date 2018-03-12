"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deepmerge = require("deepmerge");
function resolveNested(object, key, categoryKey) {
    const value = categoryKey ? object[categoryKey] : object[key];
    return value || {};
}
function $resolveParams(keys, options) {
    const { entry, category, params } = options;
    return keys.reduce((acc, key) => {
        const config = resolveNested(params, category, key);
        const entryKey = resolveNested(entry, category, key);
        const lookup = config[entryKey] || {};
        const entryParams = typeof lookup === 'function' ? lookup(entry) : lookup;
        return deepmerge(acc, entryParams || {});
    }, {});
}
function createResolveParams(config) {
    return function (entry) {
        const { params } = entry;
        const $params = $resolveParams(['filePath', 'name', 'ext'], {
            entry,
            params
        });
        const $typeParams = $resolveParams(['file', 'entity', 'folder'], {
            entry,
            category: 'type',
            params
        });
        return deepmerge($params, $typeParams, params.default || {});
    };
}
exports.createResolveParams = createResolveParams;
//# sourceMappingURL=params.js.map