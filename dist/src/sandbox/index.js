"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vm2_1 = require("vm2");
const _ = require("powerdash");
const ctx = {};
const fs = require("fs-extra");
const createVm = (options) => {
    const vmOpts = Object.assign({
        timeout: 1000,
        // what to make available inside
        sandbox: {
            ctx,
            _ // powerdash functions
        }
    }, options);
    return new vm2_1.VM(vmOpts);
};
function runSandboxedCodeAt(filePath, options) {
    const { warn } = options;
    if (!fs.pathExistsSync(filePath)) {
        warn(`Unable to read file at ${filePath}`);
        return {};
    }
    const code = fs.readFileSync(filePath, 'utf8');
    return sandboxed({
        code,
        options
    });
}
exports.runSandboxedCodeAt = runSandboxedCodeAt;
function sandboxed(config = {}) {
    let { code, options, vm } = config;
    vm = vm || createVm(options);
    vm.run(code);
    return ctx;
}
exports.sandboxed = sandboxed;
//# sourceMappingURL=index.js.map