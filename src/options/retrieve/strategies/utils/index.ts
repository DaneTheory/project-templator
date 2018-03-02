import * as fs from 'fs-extra'
import * as path from 'path'
import * as home from 'user-home'
import * as co from 'co'
import * as EventEmitter from 'events'

const configDir = path.join(home, '.sao')
const packagesDir = path.join(configDir, 'packages')


export const event = new EventEmitter()
export const reposDir = path.join(configDir, 'repos')

export function getPackageTemplatePath(name: string) {
  return path.join(packagesDir, 'node_modules', name)
}

export function readPkg(dir: string) {
  try {
    return require(path.join(dir, 'package.json'))
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return null
    }
    throw err
  }
}

export const ensurePackages = co.wrap(function* () {
  const packagesDirExists = yield fs.pathExists(packagesDir)
  if (!packagesDirExists) {
    yield fs.ensureDir(packagesDir)
    yield fs.writeFile(
      path.join(packagesDir, 'package.json'),
      JSON.stringify({
        name: 'sao-package-templates',
        version: '0.0.0',
        private: true,
        license: 'MIT',
        dependencies: {}
      }),
      'utf8'
    )
  }
})

export const ensureRepos = () => fs.ensureDir(reposDir)
