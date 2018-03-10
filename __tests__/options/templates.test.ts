import {
  createEctTemplateRenderer
} from '../../src/options/templates';

describe('templates', () => {
  describe('createEctTemplateRenderer', () => {
    describe('creates ect template renderer', () => {

      it('works using default config', () => {
        const config = {
        }
        const renderer = createEctTemplateRenderer(config)
        expect(renderer.config).toEqual({
          ext: '.ect' // default
        })
        expect(typeof renderer.render).toBe('function')
      })

      it('works using templatePath option', () => {
        const config = {
          templatePath: './my/templates'
        }
        const renderer = createEctTemplateRenderer(config)
        expect(renderer.config).toEqual({
          root: config.templatePath,
          ext: '.ect' // default
        })
        expect(typeof renderer.render).toBe('function')
      })

      it('works using defaults with templateExt', () => {
        const defaults = {
          templates: {
            ect: {
              root: './my/basic/templates',
              ext: '.ECT'
            }
          }
        }

        const config = {
          templatePath: './my/templates',
          defaults
        }
        const renderer = createEctTemplateRenderer(config)
        expect(renderer.config).toEqual({
          root: config.templatePath,
          ext: '.ECT'
        })
        expect(typeof renderer.render).toBe('function')
      })
    })
  })
})
