import * as path from 'path'
import { IParseResult } from '.'

export function local(template: string, options?: any): IParseResult | false {

  // local filePath must start with a ./
  if (!/^[./]|(^[a-zA-Z]:)/.test(template)) return false
  return {
    type: 'local',
    path: path.resolve(template)
  }
}
