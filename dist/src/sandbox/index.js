const { VM } = require('vm2');
const _ = require('powerdash');
const ctx = {};
const createVm = (options) => {
    const vmOpts = Object.assign({
        timeout: 1000,
        // what to make available inside
        sandbox: {
            ctx,
            _ // powerdash functions
        }
    }, options);
    return new VM(vmOpts);
};
function runSandboxedCodeAt(filePath) {
    const code = fs.readFileSync(filePath, 'utf8');
    return sandboxed({
        code
    });
}
function sandboxed({ code, options, vm }) {
    vm = vm || createVm(options);
    vm.run(code);
    return ctx;
}
module.exports = {
    runSandboxedCodeAt,
    sandboxed
};
//# sourceMappingURL=index.js.map