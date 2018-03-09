export function validateParams(options: any = {}) {
  let {
    params,
    uses,
    paramDefs,
    error,
    info,
    validate
  } = options

  uses = uses || []

  function notSet(value: any) {
    return value === undefined || value === null
  }

  const usedParams = Object.keys(params).filter((param: string) => uses.includes(param))

  info && info('validateParams: ', {
    params,
    usedParams,
    paramDefs
  })
  return usedParams.reduce((acc: any, name: string) => {
    info(`validate and set param: ${name}`)
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
    info(`param ${name} = ${param}`)

    acc[name] = param
    return acc
  }, {})
}

