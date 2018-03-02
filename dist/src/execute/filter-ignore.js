"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function filterIgnore(config = {}) {
    const { info, ignore } = config;
    return (files) => {
        info('filter template files to ignore');
        return files.filter(entry => !ignore(entry));
    };
}
exports.filterIgnore = filterIgnore;
//# sourceMappingURL=filter-ignore.js.map