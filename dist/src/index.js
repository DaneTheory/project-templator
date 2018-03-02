"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const execute_1 = require("./execute");
const options_1 = require("./options");
const deepmerge = require("deepmerge");
function projectTemplates(tmplMap, options) {
    return Object.keys(tmplMap).map(key => {
        const opts = deepmerge(options, tmplMap[key] || {});
        return projectTemplate(opts);
    });
}
function projectTemplate(config) {
    const { templateSrc, resolve = {}, maps, destPath, ignoreFiles = [], warningOn, infoOn, transformFileData, prependWith = {}, appendWith = {}, opts = {}, } = config;
    const options = options_1.createOptions(config);
    Promise.resolve().then(() => {
        execute_1.execute(options);
    });
    const { transformTree, sandboxed } = require('./transformers');
    module.exports = {
        projectTemplate,
        projectTemplates,
        transformTree,
        sandboxed
    };
}
//# sourceMappingURL=index.js.map