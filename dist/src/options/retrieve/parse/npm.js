"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ensurePackageName = (name) => name.replace(/^(template-)?/, 'template-');
const _1 = require(".");
// Explict npm name
function explicitNpm(template) {
    if (!template.startsWith('npm:'))
        return false;
    return _1.parse(template.replace(/^npm:/, ''), false);
}
exports.explicitNpm = explicitNpm;
// npm package
function npmPackage(template, options) {
    const { templatePrefix } = options;
    if (/\//.test(template))
        return false;
    const matches = /([^@]+)(?:@(.+))?$/.exec(template);
    if (!matches)
        return {
            type: 'invalid'
        };
    const [, name, version] = matches;
    return {
        type: 'npm',
        name: templatePrefix ? ensurePackageName(name) : name,
        version
    };
}
exports.npmPackage = npmPackage;
// npm scoped package
function npmScopedPackage(template, options) {
    const { templatePrefix } = options;
    if (!template.startsWith('@'))
        return false;
    const matches = /^@([^/]+)\/([^@]+)(?:@(.+))?$/.exec(template);
    if (!matches)
        return {
            type: 'invalid'
        };
    const [, user, name, version] = matches;
    return {
        type: 'npm',
        scoped: true,
        user,
        name: templatePrefix ? ensurePackageName(name) : name,
        version
    };
}
exports.npmScopedPackage = npmScopedPackage;
//# sourceMappingURL=npm.js.map