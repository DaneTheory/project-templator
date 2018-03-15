// import * as mockFs from 'mock-fs'
import * as path from 'path'
import {
  npmFindPackage,
  npmFindTemplatesPackagePath
} from '../../../src/extends/strategies/npm-traverse'

describe('npm traverse', () => {

  // TODO: use mockFs
  beforeAll(() => {
    // mockFs(fakeFs)
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

  // npmFindPackage(packageName: string, config: any = {}): Promise<IPackageFindResult>
  describe('npmFindPackage', () => {

    describe('no matching package to be found', () => {
      it('aborts with empty result, ie. found: false', async () => {
        const searchResult: any = await npmFindPackage(packageName.none, config)
        expect(searchResult.found).toBeFalsy()
      })
    })

    describe('matching package in sister folder', () => {
      it('finds matching package', async () => {
        const searchResult: any = await npmFindPackage(packageName.sister, config)
        expect(searchResult.found).toBeFalsy()
        expect(searchResult.packagePath).toEqual(sisterPackagePath)
      })
    })

    describe('matching package in parent folder', () => {
      it('finds matching package', async () => {
        const searchResult: any = await npmFindPackage(packageName.parent, config)
        expect(searchResult.found).toBeFalsy()
        expect(searchResult.packagePath).toEqual(parentPackagePath)
      })
    })
  })

  // npmFindTemplatesPackagePath(packageName: string, config: any = {}): Promise<string>
  describe('npmFindTemplatesPackagePath', () => {
    describe('no matching package to be found', () => {
      it('aborts with no package path', async () => {
        const packagePath: string = await npmFindTemplatesPackagePath(packageName.none, config)
        expect(packagePath).toBeFalsy()
      })
    })

    describe('matching package in sister folder', () => {
      it('finds matching package path', async () => {
        const packagePath: string = await npmFindTemplatesPackagePath(packageName.sister, config)
        expect(packagePath).toBe(expectedPath.sister)
      })
    })

    describe('matching package in parent folder', () => {
      it('finds matching package path', async () => {
        const packagePath: string = await npmFindTemplatesPackagePath(packageName.parent, config)
        expect(packagePath).toBeFalsy()
      })
    })
  })
})
