"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const defaults = {
    keep(entry, options = {}) {
        return options.override === 'file' ? !entry.isTemplate : entry.isTemplate;
    }
};
// templates may override non-templates on collision
function filter(entries, filePaths = {}, config = {}) {
    const keep = config.keep || defaults.keep;
    return entries.filter((e) => {
        // filter out any entry that is not a template but is included in list of invalid overlap
        if (filePaths.invalid.includes(e.filePath)) {
            return keep(e);
        }
        else
            return true;
    });
}
exports.filter = filter;
function checkOverlap(config = {}) {
    const { error, info, filter } = config;
    return (entries) => {
        info('check overlap');
        const template = entries.filter((entry) => entry.isTemplate)
            .map((entry) => entry.filePath);
        const ordinary = entries.filter((entry) => !entry.isTemplate)
            .map((entry) => entry.filePath);
        const invalid = lodash_1.intersection(template, ordinary);
        if (invalid.length) {
            const filePaths = invalid.map((e) => e.filePath).join(', ');
            error(`The following entries are invalid as there are also templates with the same filename: ${filePaths}`);
        }
        if (filter) {
            entries = filter(entries, { invalid, template, ordinary }, config);
        }
        return entries;
    };
}
exports.checkOverlap = checkOverlap;
//# sourceMappingURL=check-overlap.js.map