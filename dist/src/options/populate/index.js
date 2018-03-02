"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const entry_types_1 = require("./entry-types");
const param_defs_1 = require("./param-defs");
const validate_params_1 = require("./validate-params");
function createPopulateEntry(config) {
    const { templatesPath } = config;
    return function populateEntry(entry) {
        const paramDefsPath = path.join(templatesPath, 'template.params.js');
        const paramDefs = param_defs_1.resolveParamDefsAt(paramDefsPath);
        const entryData = entry_types_1.resolveEntryDataAt(entry, {
            filePath: path.join(templatesPath, 'template.data.js')
        });
        validate_params_1.validateParams({
            params: entry.params,
            uses: entryData.params,
            paramDefs
        });
        return entry;
    };
}
exports.createPopulateEntry = createPopulateEntry;
//# sourceMappingURL=index.js.map