function isStr(value: any) {
  return typeof value === 'string'
}

export function filterFoundPackages(foundPackageNames: string[]) {
  return foundPackageNames.filter((found: string) => isStr(found))[0]
}
