"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
const npm_1 = require("./npm");
const git_repo_1 = require("./git-repo");
const defaultParsed = {
    type: 'unknown'
};
function parse(template, templatePrefix = true) {
    if (/^[./]|(^[a-zA-Z]:)/.test(template)) {
        return {
            type: 'local',
            path: path.resolve(template)
        };
    }
    const opts = {
        templatePrefix
    };
    return npm_1.explicitNpm(template)
        || npm_1.npmPackage(template, opts)
        || npm_1.npmScopedPackage(template, opts)
        || git_repo_1.gitRepo(template)
        || defaultParsed;
}
exports.parse = parse;
//# sourceMappingURL=index.js.map