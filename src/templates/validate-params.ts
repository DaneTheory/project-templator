export function validateParams(config: any, options: any = {}) {
  let {
    params,
    uses, // the params used by the template, ie. template.uses
    paramDefs
  } = config
  const {
    error,
    info,
    validate
  } = options

  info && info('validateParams', {
    params,
    uses,
    paramDefs
  })

  const objs = {
    params,
    paramDefs
  }

  Object.keys(objs).map(name => {
    const val = objs[name]
    validate && validate.object(val, name)
  })

  uses = uses || Object.keys(params || {})

  function notSet(value: any) {
    return value === undefined || value === null
  }

  const usedParams = Object.keys(params).filter((param: string) => uses.includes(param))

  info && info('validateParams', {
    usedParams
  })
  return usedParams.reduce((acc: any, name: string) => {
    const def = paramDefs[name]
    let param = params[name]

    info && info(`validate and set param: ${name}`, {
      def,
      param,
      params
    })

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
      info && info(`use default value ${def.default}`, {
        name,
        param
      })
      param = def.default
    }
    info && info(`param ${name} = ${param}`)

    acc[name] = param
    return acc
  }, {})
}

