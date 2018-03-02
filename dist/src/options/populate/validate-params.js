"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateParams(options = {}) {
    const { params, uses, paramDefs, error, validate } = options;
    function notSet(value) {
        return value === undefined || value === null;
    }
    const usedParams = Object.keys(params).filter((param) => uses.includes(param));
    return usedParams.reduce((acc, name) => {
        const def = paramDefs[name];
        let param = params[name];
        if (notSet(param) && def.required) {
            error(`Required parameter ${name} not set`);
        }
        if (typeof def.type === 'object') {
            if (!(param instanceof def.type)) {
                error(`Parameter ${name} must be an instance of ${def.type}`);
            }
        }
        if (typeof def.validate === 'string') {
            const validateFnName = def.validate;
            const validateFn = validate[validateFnName];
            validateFn(param, {
                msg: 'parameter type error',
                data: { name, value: param }
            });
        }
        // set default value if not set
        if (notSet(param)) {
            param = def.default;
        }
        acc[name] = param;
        return acc;
    }, {});
}
exports.validateParams = validateParams;
//# sourceMappingURL=validate-params.js.map