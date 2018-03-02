function toRegExp(matcher) {
  return typeof matcher === 'string' ? escapeRegExp(matcher) : matcher
}

function preFixMissing(str, preFix) {
  if (!preFix || preFix.length === 0) return str
  return str.substr(0, preFix.length) !== preFix ? ''.concat(preFix).concat(str) : str
}

function postFixMissing(str, postFix) {
  if (!postFix || postFix.length === 0) return str
  return str[str.length - postFix.length] !== postFix ? str.concat(postFix) : str
}

function addMissing(str, {
  postFix,
  preFix
}) {
  return postFixMissing(preFixMissing(str, preFix), postFix)
}


module.exports = {
  toRegExp,
  postFixMissing,
  preFixMissing,
  addMissing
}
