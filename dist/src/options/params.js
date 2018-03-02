"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deepmerge = require("deepmerge");
function $resolveParams(keys, options) {
    const { entry, nestedKey, params } = options;
    return keys.reduce((acc, key) => {
        const config = (nestedKey ? params[nestedKey][key] : params[key]) || {};
        const entryKey = (nestedKey ? entry[nestedKey][key] : entry[key]);
        const lookup = config[entryKey];
        const entryParams = (typeof lookup === 'function' ? lookup(entry) : lookup) || {};
        return deepmerge(acc, entryParams);
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
            nestedKey: 'type',
            params
        });
        return deepmerge($params, $typeParams, params.default || {});
    };
}
exports.createResolveParams = createResolveParams;
//# sourceMappingURL=params.js.map