import * as mockFs from 'mock-fs'
import * as path from 'path'
// async function cacheLookup(packageName: string, options: any): Promise<string>
import {
  cacheLookup
} from '../../../../../src/packages/lookup/strategies/cache'

// Uses conventions from sao (or package-retriever) to locate package in "global" cache

import {
  fakeFs
} from '../../../../fixtures/fs'

describe('cache lookup', () => {

  // TODO: use mockFs
  beforeAll(() => {
    mockFs(fakeFs)
  })

  const config = {
    // some config
  }

  // const fixturesPath = path.join(__dirname, '../../', 'fixtures')
  // const projectPath = path.join(fixturesPath, 'project')
  // const cachePath = path.join(projectPath, '.cache')
  // const cachedReposPath = path.join(cachePath, 'repos')
  // const cachedPackagesPath = path.join(cachePath, 'packages')

  const fakePaths: any = {
  }
  fakePaths.project = 'project'
  fakePaths.cache = path.join(fakePaths.project, '.cache')
  fakePaths.repos = path.join(fakePaths.cache, 'repos')
  fakePaths.packages = path.join(fakePaths.cache, 'packages')

  const packageName: any = {
    none: 'unknown',
    // put in fixtures parent folder (package.json and node_modules)
    cachedRepo: 'cached-repo',
    // put in fixtures sibling folder (same package.json and node_modules)
    cachedPackage: 'cached-package',
  }

  function createCachedPath(container: string, packageName: string) {
    return path.join(fakePaths.cache, container, packageName)
  }

  function createCachedTemplatesPath(container: string, packageName: string) {
    return path.join(createCachedPath(container, packageName), 'templates')
  }

  const expectedPath = {
    cachedRepo: createCachedTemplatesPath('repos', 'cached-repo'),
    cachedPackage: createCachedTemplatesPath('repos', 'cached-repo')
  }

  // npmFindPackage(packageName: string, config: any = {}): Promise<IPackageFindResult>
  describe('cacheLookup', () => {

    describe('no matching package to be found', () => {
      it('aborts with empty result, ie. found: false', async () => {
        const pkgPath: any = await cacheLookup(packageName.none, config)
        expect(pkgPath).toBeFalsy()
      })
    })

    describe('matching package in cached packages folder', () => {
      it('finds matching package', async () => {
        const pkgPath: any = await cacheLookup(packageName.cachedPackage, config)
        expect(pkgPath).toEqual(expectedPath.cachedPackage)
      })
    })

    describe('matching package in cached repos folder', () => {
      it('finds matching package', async () => {
        const pkgPath: any = await cacheLookup(packageName.cachedRepo, config)
        expect(pkgPath).toEqual(expectedPath.cachedRepo)
      })
    })
  })
})
