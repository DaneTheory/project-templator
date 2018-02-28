module.exports = function ({
  warningsOn
}) {
  function displayError(msg, data) {
    data ? console.error(msg) : console.error(msg, data)
  }

  function warning(msg) {
    if (!warningsOn) return
    displayError(msg, data)
  }

  function error(msg, data) {
    displayError(msg, data)
    throw new Error(msg)
  }

  return {
    warning,
    error
  }
}
