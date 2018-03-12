"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function filterIgnore(config = {}) {
    const { info, ignore } = config;
    return (entries) => {
        info && info('filter template entries to ignore');
        return entries.filter(entry => {
            // by default keeps all
            return ignore ? !ignore(entry) : true;
        });
    };
}
exports.filterIgnore = filterIgnore;
//# sourceMappingURL=filter-ignore.js.map