const {
  VM
} = require('vm2')
const _ = require('powerdash')
const ctx = {}

const createVm = (options) => {
  const vmOpts = Object.assign({
    timeout: 1000,
    // what to make available inside
    sandbox: {
      ctx,
      _ // powerdash functions
    }
  }, options)
  return new VM(vmOpts)
}

module.exports = {
  sandboxed({
    code,
    options,
    vm
  }) {
    vm = vm || createVm(options)
    vm.run(code)
    return ctx
  }
}
