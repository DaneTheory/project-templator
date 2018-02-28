const path = require('path')
const fs = require('fs')
const {
  transformTree,
  sandboxed
} = require('.')

const codePath = path.join(__dirname, 'sandboxed.sjs')
const code = fs.readFileSync(codePath, 'utf8')

const ctx = sandboxed({
  code
})

const options = {
  author: 'Kristian',
  username: 'kmandrup',
  name: 'my-project'
}

const result = transformTree({
  treeDef: ctx.treeDef,
  options
})

console.log('transformation', {
  result
})
