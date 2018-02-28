module.exports = function ({
  warningsOn,
  infosOn,
  logger = console
}) {
  function logErr(msg, data) {
    data ? logger.error(msg) : logger.error(msg, data)
  }

  function log(msg, data) {
    data ? logger.log(msg) : logger.log(msg, data)
  }

  function info(msg) {
    if (!infosOn) return
    log(msg, data)
  }

  function warning(msg) {
    if (!warningsOn) return
    logErr(msg, data)
  }

  function error(msg, data) {
    logErr(msg, data)
    throw new Error(msg)
  }

  return {
    warning,
    error,
    info
  }
}
