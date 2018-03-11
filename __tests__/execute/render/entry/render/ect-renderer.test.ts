import {
  promisify
} from 'util'
import * as ect from 'ect'

describe('render entry: render', () => {
  const renderer = ect({
    root: __dirname + '/templates',
    ext: '.ect'
  });

  const title = 'Hello World'

  const params = {
    title
  }

  describe('pure ect', () => {
    describe('ect render: sync', () => {
      it('renders', () => {
        const html = renderer.render('page', params);
        expect(html).toMatch(title)
      })
    })

    describe('ect render: callback', () => {
      it('renders', (done) => {
        renderer.render('page', params, (error: any, html: string) => {
          expect(html).toMatch(title)
          done()
        });
      })
    })

    describe('ect render: async', () => {
      it('renders', async () => {
        const renderAsync = promisify(renderer.render)
        const html = await renderAsync('page', { title: 'Hello World' })
        expect(html).toMatch(title)
      })
    })
  })
})
