"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const escapeRegExp = require("escape-string-regexp");
function toRegExp(matcher) {
    return typeof matcher === 'string' ? escapeRegExp(matcher) : matcher;
}
exports.toRegExp = toRegExp;
function preFixMissing(str, preFix) {
    if (!preFix || preFix.length === 0)
        return str;
    return str.substr(0, preFix.length) !== preFix ? ''.concat(preFix).concat(str) : str;
}
exports.preFixMissing = preFixMissing;
function postFixMissing(str, postFix) {
    if (!postFix || postFix.length === 0)
        return str;
    return str[str.length - postFix.length] !== postFix ? str.concat(postFix) : str;
}
exports.postFixMissing = postFixMissing;
function addMissing(str, options = {}) {
    const { postFix, preFix } = options;
    return postFixMissing(preFixMissing(str, preFix), postFix);
}
exports.addMissing = addMissing;
//# sourceMappingURL=util.js.map