"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
function createIgnore(config) {
    let { ignore, ignoreFiles, validate, defaults } = config;
    defaults = defaults || {};
    ignoreFiles = ignoreFiles || [];
    // if ignoreFiles present, use it to create default ignore template function
    if (ignoreFiles) {
        validate && validate.array(ignoreFiles);
        ignoreFiles.every((file) => validate && validate.string(file));
        config.fileMatchers = ignoreFiles.map(util_1.toRegExp);
        defaults.ignore = defaults.ignoreFileMatcher || defaults.ignore;
    }
    // set ignore function used to ignore certain templates
    return ignore ? ignore : defaults.ignore;
}
exports.createIgnore = createIgnore;
//# sourceMappingURL=ignore.js.map