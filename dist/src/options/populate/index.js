"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entry_params_1 = require("./entry-params");
function createPopulateEntry(config) {
    const { templatesPath, } = config;
    return function populateEntry(entry, options = {}) {
        const { info, } = options;
        info && info('populateEntry', {
            templatesPath,
            entry,
            options
        });
        options.templatesPath = options.templatesPath || templatesPath;
        const params = entry_params_1.entryParams(entry, options);
        info && info('entry params', params);
        entry.params = params;
        return entry;
    };
}
exports.createPopulateEntry = createPopulateEntry;
//# sourceMappingURL=index.js.map