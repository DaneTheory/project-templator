import * as path from 'path'

export function pkgDependencies(pkg: any) {
  const allModuleDependencies: any = [].concat(pkg.dependencies || [], pkg.devDependencies || [])
  return Object.keys(allModuleDependencies)
}



