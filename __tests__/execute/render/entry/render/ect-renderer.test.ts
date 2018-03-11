import * as path from 'path'
import {
  promisify
} from 'util'
import * as ect from 'ect'

import {
  renderEntry
} from '../../../../../src/execute/render/entry'

const { log } = console

describe('render entry: render', () => {
  const info = (msg: string, data: any) => log(msg, data)
  const error = (msg: string, data?: any) => {
    log(msg, data)
    throw new Error(msg)
  }

  const renderer = ect({ root: __dirname + '/templates', ext: '.ect' });

  const title = 'Hello World'

  const params = {
    title
  }

  describe('pure ect', () => {
    describe('ect render: sync', () => {
      console.log('render ect: sync', {
        params
      })
      const html = renderer.render('page', params);
      expect(html).toMatch(title)
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
