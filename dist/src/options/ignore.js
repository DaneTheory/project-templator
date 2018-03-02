"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createIgnore(config) {
    const { ignore, ignoreFiles, validate, defaults } = config;
    // if ignoreFiles present, use it to create default ignore template function
    if (ignoreFiles) {
        validate.array(ignoreFiles);
        ignoreFiles.every((file) => validate.string(file));
        config.fileMatchers = ignoreFiles.map(toRegExp);
        defaults.ignore = defaults.ignoreFileMatcher;
    }
    // set ignore function used to ignore certain templates
    return ignore ? ignore : defaults.ignore;
}
exports.createIgnore = createIgnore;
//# sourceMappingURL=ignore.js.map