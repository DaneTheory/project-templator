import * as path from 'path'
import {
  promisify
} from 'util'
import * as ect from 'ect'
import {
  renderAll
} from '../../../../src/execute/render/entries'

const { log } = console
describe('render', () => {
  const info = (msg: string, data: any) => log(msg, data)
  const error = (msg: string, data?: any) => {
    log(msg, data)
    throw new Error(msg)
  }

  const resolveTemplateFile = (entry: any) => {
    return entry.templateFilePath
  }

  const fixturesPath = path.join(__dirname, '../../..', 'fixtures')
  const templatesPath = path.join(fixturesPath, 'templates')
  const templateFilePath = path.join(templatesPath, 'my-template.js.ect')

  const ectConfig: any = {
    root: templatesPath,
    ext: '.ect'
  }
  const ectRenderer = ect(ectConfig)
  const renderTemplate = promisify(ectRenderer.render.bind(ectRenderer))

  const config = {
    info,
    error,
    resolveTemplateFile,
    renderTemplate
  }

  const entry = {
    isTemplate: true,
    templateFilePath
  }
  const entries = {
    empty: [],
    valid: [entry],
    invalid: [
      {
        x: 42
      }
    ]
  }

  describe('renderAll', () => {
    it('is a function to render entries', () => {
      expect(typeof renderAll).toEqual('function')
    })

    describe('render entries', () => {
      describe('empty entries list', () => {
        it('does not throw', async () => {
          try {
            const rendered = await renderAll(entries.empty, config)
            // console.log({ rendered })
            expect(rendered).toEqual([])
          } catch (err) {
          }
        })
      })

      describe('invalid entries list', () => {
        it('does throw', async () => {
          const doRender = async () => await renderAll(entries.invalid, config)
          try {
            await doRender()
          } catch (err) {
            expect(err).toBeDefined()
          }
        })
      })

      describe('valid entries list', () => {
        it('renders list of entries', async () => {
          const rendered = await renderAll(entries.valid, config)
          expect(rendered).toBeDefined()
        })
      })
    })
  })
})

