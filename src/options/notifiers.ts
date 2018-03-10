export function createNotifiers(options: any) {
  const {
    warnOn,
    infoOn,
    errorOn = true,
    logger = console
  } = options

  function logErr(msg: string, data?: any) {
    if (!errorOn) return
    data ? logger.error(msg, data) : logger.error(msg)
  }

  function log(msg: string, data?: any) {
    data ? logger.log(msg, data) : logger.log(msg)
  }

  function info(msg: string, data?: any) {
    if (!infoOn) return
    log(msg, data)
  }

  function warn(msg: string, data?: any) {
    if (!warnOn) return
    logErr(msg)
  }

  function error(msg: string, data?: any) {
    logErr(msg, data)
    throw new Error(msg)
  }

  return {
    warn,
    error,
    info
  }
}
