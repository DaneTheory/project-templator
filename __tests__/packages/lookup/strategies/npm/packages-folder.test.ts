import * as mockFs from 'mock-fs'
import * as path from 'path'
import {
  npmFindPackageViaPackagesFolder
} from '../../../../../src/packages/lookup/strategies/npm/packages-folder'

import {
  fakeFs
} from '../../../../fixtures/fs'

describe('npm traverse', () => {

  // TODO: use mockFs
  beforeAll(() => {
    mockFs(fakeFs)
  })

  const config = {
    // some config
  }

  const fixturesPath = path.join(__dirname, '../../', 'fixtures')

  const projectPath = path.join(fixturesPath, 'project')
  const packagesPath = path.join(projectPath, 'packages')
  const mainPackagePath = path.join(packagesPath, 'main-templates')

  const packageName: any = {
    none: 'unknown',
    // put in fixtures parent folder (package.json and node_modules)
    parent: 'parent-templates',
    // put in fixtures sibling folder (same package.json and node_modules)
    sister: 'sister-templates'
  }

  const sisterPackagePath = path.resolve(path.join(packagesPath, 'sister-templates'))
  const parentPackagePath = path.resolve(path.join(projectPath, 'node_modules', 'parent-templates'))

  function createTemplatesPath(filePath: string) {
    return path.join(filePath, 'templates')
  }

  const expectedPath = {
    sister: createTemplatesPath(sisterPackagePath),
    parent: createTemplatesPath(parentPackagePath)
  }



  // npmFindPackageViaPackagesFolder(packageName: string, config: any = {}): Promise<string>
  describe('npmFindTemplatesPackagePath', () => {
    describe('no matching package to be found', () => {
      it('aborts with no package path', async () => {
        const packagePath: string = await npmFindPackageViaPackagesFolder(packageName.none, config)
        expect(packagePath).toBeFalsy()
      })
    })

    describe('parent package', () => {
      it('can not be found via packages folder strategy', async () => {
        const packagePath: string = await npmFindPackageViaPackagesFolder(packageName.parent, config)
        expect(packagePath).toBeFalsy()
      })
    })

    describe('matching package in packages folder', () => {
      it('finds matching package path', async () => {
        const packagePath: string = await npmFindPackageViaPackagesFolder(packageName.sister, config)
        expect(packagePath).toBeTruthy()
      })
    })
  })
})
