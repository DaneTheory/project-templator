"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const escapeRegExp = require("escape-string-regexp");
function createEscRegExp(str) {
    const escaped = escapeRegExp(str);
    return new RegExp(escaped);
}
exports.createEscRegExp = createEscRegExp;
function toRegExp(matcher) {
    if (typeof matcher !== 'string' && !(matcher instanceof RegExp)) {
        throw new Error('Invalid matcher');
    }
    return typeof matcher === 'string' ? createEscRegExp(matcher) : matcher;
}
exports.toRegExp = toRegExp;
function preFixMissing(str, preFix = '') {
    if (typeof preFix !== 'string')
        return str;
    if (!preFix || preFix.length === 0)
        return str;
    return str.substr(0, preFix.length) !== preFix ? ''.concat(preFix).concat(str) : str;
}
exports.preFixMissing = preFixMissing;
function postFixMissing(str, postFix = '') {
    if (typeof postFix !== 'string')
        return str;
    if (!postFix || postFix.length === 0)
        return str;
    return str[str.length - postFix.length] !== postFix ? str.concat(postFix) : str;
}
exports.postFixMissing = postFixMissing;
function addMissing(str, options = {}) {
    const { postfix, prefix } = options;
    const prefixed = preFixMissing(str, prefix);
    return postFixMissing(prefixed, postfix);
}
exports.addMissing = addMissing;
//# sourceMappingURL=util.js.map