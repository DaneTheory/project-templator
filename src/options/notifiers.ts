export function createNotifiers(options: any) {
  const {
    warnOn,
    infoOn,
    logger = console
  } = options

  function logErr(msg: string, data?: any) {
    data ? logger.error(msg) : logger.error(msg, data)
  }

  function log(msg: string, data?: any) {
    data ? logger.log(msg) : logger.log(msg, data)
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
