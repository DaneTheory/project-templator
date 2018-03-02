import * as escapeRegExp from 'escape-string-regexp'

export function toRegExp(matcher: string | RegExp) {
  return typeof matcher === 'string' ? escapeRegExp(matcher) : matcher
}

export function preFixMissing(str: string, preFix: string) {
  if (!preFix || preFix.length === 0) return str
  return str.substr(0, preFix.length) !== preFix ? ''.concat(preFix).concat(str) : str
}

export function postFixMissing(str: string, postFix: string) {
  if (!postFix || postFix.length === 0) return str
  return str[str.length - postFix.length] !== postFix ? str.concat(postFix) : str
}

export function addMissing(str: string, options: any = {}) {
  const {
    postFix,
    preFix
  } = options
  return postFixMissing(preFixMissing(str, preFix), postFix)
}
