import * as escapeRegExp from 'escape-string-regexp'

export function createEscRegExp(str: string) {
  const escaped = escapeRegExp(str)
  return new RegExp(escaped)
}

export function toRegExp(matcher: string | RegExp) {
  if (typeof matcher !== 'string' && !(matcher instanceof RegExp)) {
    throw new Error('Invalid matcher')
  }
  return typeof matcher === 'string' ? createEscRegExp(matcher) : matcher
}

export function preFixMissing(str: string, preFix: string = '') {
  if (typeof preFix !== 'string') return str
  if (!preFix || preFix.length === 0) return str
  return str.substr(0, preFix.length) !== preFix ? ''.concat(preFix).concat(str) : str
}

export function postFixMissing(str: string, postFix: string = '') {
  if (typeof postFix !== 'string') return str
  if (!postFix || postFix.length === 0) return str
  return str[str.length - postFix.length] !== postFix ? str.concat(postFix) : str
}

export function addMissing(str: string, options: any = {}) {
  const {
    postfix,
    prefix
  } = options
  const prefixed = preFixMissing(str, prefix)
  return postFixMissing(prefixed, postfix)
}
