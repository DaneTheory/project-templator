
import * as mockFs from 'mock-fs'
import * as path from 'path'
import {
  findTemplatesPathFor,
  // findPackagePath
} from '../../../../src/templates/lookup'

import {
  fakeFs
} from './fs'

describe('templates lookup', () => {

  // TODO: use mockFs
  beforeAll(() => {
    mockFs(fakeFs)
  })

  const config = {
    // some config
  }


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


  function createTemplatesPath(filePath: string) {
    return path.join(filePath, 'templates')
  }

  const templatesPath = {
    sister: createTemplatesPath(fakePaths.sister),
    parent: createTemplatesPath(fakePaths.parent)
  }

  describe('findTemplatesPathFor', () => {

    describe('no matching package to be found', () => {
      it('aborts with empty result, ie. found: false', async () => {
        const pkgPath: any = await findTemplatesPathFor(packageName.none, config)
        expect(pkgPath).toBeFalsy()
      })
    })

    describe('matching package in sister folder', () => {
      it('finds matching package', async () => {
        const pkgPath: any = await findTemplatesPathFor(packageName.sister, config)
        expect(pkgPath).toEqual(templatesPath.sister)
      })
    })

    describe('matching package in parent folder', () => {
      it('finds matching package', async () => {
        const pkgPath: any = await findTemplatesPathFor(packageName.parent, config)
        expect(pkgPath).toEqual(templatesPath.parent)
      })
    })
  })
})
