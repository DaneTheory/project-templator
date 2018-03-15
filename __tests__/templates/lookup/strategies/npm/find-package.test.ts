
import * as mockFs from 'mock-fs'
import * as path from 'path'
import {
  npmFindPackagePath
} from '../../../../../src/templates/lookup/strategies/npm'

import {
  fakeFs
} from '../fs'

describe('npm traverse', () => {

  // TODO: use mockFs
  beforeAll(() => {
    mockFs(fakeFs)
  })

  const config = {
    // some config
  }

  // const fixturesPath = path.join(__dirname, '../../', 'fixtures')
  // const projectPath = path.join(fixturesPath, 'project')
  // const packagesPath = path.join(projectPath, 'packages')
  // const mainPackagePath = path.join(packagesPath, 'main-templates')
  // const sisterPackagePath = path.resolve(path.join(packagesPath, 'sister-templates'))
  // const parentPackagePath = path.resolve(path.join(projectPath, 'node_modules', 'parent-templates'))

  const fakePaths: any = {
  }
  fakePaths.project = 'project'
  fakePaths.packages = path.join(fakePaths.project, 'packages')

  const packageName: any = {
    none: 'unknown',
    main: 'main',
    // put in fixtures parent folder (package.json and node_modules)
    parent: 'parent-templates',
    // put in fixtures sibling folder (same package.json and node_modules)
    sister: 'sister-templates',
    stepsister: 'stepsister-templates'
  }

  fakePaths.main = path.join(fakePaths.packages, packageName.main)
  fakePaths.sister = path.join(fakePaths.packages, packageName.sister)
  fakePaths.stepsister = path.join(fakePaths.sister, 'node_modules', packageName.stepsister)

  // npmFindPackage(packageName: string, config: any = {}): Promise<IPackageFindResult>
  describe('npmFindPackage', () => {

    describe('no matching package to be found', () => {
      it('aborts with empty result, ie. found: false', async () => {
        const pkgPath: any = await npmFindPackagePath(packageName.none, config)
        expect(pkgPath).toBeFalsy()
      })
    })

    describe('matching package in sister folder', () => {
      it('finds matching package', async () => {
        const pkgPath: any = await npmFindPackagePath(packageName.sister, config)
        expect(pkgPath).toEqual(fakePaths.sister)
      })
    })

    describe('matching package in parent folder', () => {
      it('finds matching package', async () => {
        const pkgPath: any = await npmFindPackagePath(packageName.parent, config)
        expect(pkgPath).toEqual(fakePaths.parent)
      })
    })
  })
})
