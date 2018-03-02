import {
  VM
} from 'vm2'
import * as _ from 'powerdash'
const ctx = {}
import * as fs from 'fs'

const createVm = (options: any) => {
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

export function runSandboxedCodeAt(filePath: string, options?: any): any {
  const code = fs.readFileSync(filePath, 'utf8')
  return sandboxed({
    code,
    options
  })
}

export function sandboxed(config: any = {}) {
  let {
    code,
    options,
    vm
  } = config
  vm = vm || createVm(options)
  vm.run(code)
  return ctx
}
