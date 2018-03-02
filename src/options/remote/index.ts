import {
  parse
} from './parse'
import {
  retrieveTemplates
} from './strategies'

export async function resolveTemplates(templateUri: string) {
  const parsed = parse(templateUri)
  return await retrieveTemplates(parsed)
}
