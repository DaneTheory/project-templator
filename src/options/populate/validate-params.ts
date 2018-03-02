export function validateParams(options: any = {}) {
  const {
    params,
    uses,
    paramDefs,
    error,
    validate
  } = options

  function notSet(value: any) {
    return value === undefined || value === null
  }

  const usedParams = Object.keys(params).filter((param: string) => uses.includes(param))
  return usedParams.reduce((acc: any, name: string) => {
    const def = paramDefs[name]
    let param = params[name]

    if (notSet(param) && def.required) {
      error(`Required parameter ${name} not set`)
    }
    if (typeof def.type === 'object') {
      if (!(param instanceof def.type)) {
        error(`Parameter ${name} must be an instance of ${def.type}`)
      }
    }
    if (typeof def.validate === 'string') {
      const validateFnName = def.validate
      const validateFn = validate[validateFnName]
      validateFn(param, {
        msg: 'parameter type error',
        data: { name, value: param }
      })
    }
    // set default value if not set
    if (notSet(param)) {
      param = def.default
    }
    acc[name] = param
    return acc
  }, {})
}

