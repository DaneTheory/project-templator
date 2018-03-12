"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_checker_1 = require("./type-checker");
const deepmerge = require("deepmerge");
function createValidatorFn(type, config) {
    const { error, typeChecker } = config;
    return function (value, options) {
        const defaultErr = {
            msg: 'type error',
            data: {
                value,
                type
            }
        };
        const errData = deepmerge(defaultErr, options || {});
        const typeCheckerFn = typeChecker[type];
        return !value || typeCheckerFn(value) ? value : error(errData);
    };
}
exports.createValidatorFn = createValidatorFn;
const types = [
    'string',
    'function',
    'boolean',
    'object',
    'array'
];
function createValidate(config) {
    const { error } = config;
    return types.reduce((acc, type) => {
        acc[type] = createValidatorFn(type, {
            error,
            typeChecker: type_checker_1.typeChecker
        });
        return acc;
    }, {});
}
exports.createValidate = createValidate;
//# sourceMappingURL=validate.js.map