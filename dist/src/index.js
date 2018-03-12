"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const execute_1 = require("./execute");
exports.execute = execute_1.execute;
exports.chainFactories = execute_1.chainFactories;
const options_1 = require("./options");
const deepmerge = require("deepmerge");
function projectTemplates(tmplMap, options) {
    return Object.keys(tmplMap).map(key => {
        const opts = deepmerge(options, tmplMap[key] || {});
        return projectTemplate(opts);
    });
}
exports.projectTemplates = projectTemplates;
function projectTemplate(config) {
    const options = options_1.createOptions(config);
    Promise.resolve().then(() => {
        execute_1.execute(options);
    });
}
exports.projectTemplate = projectTemplate;
//# sourceMappingURL=index.js.map