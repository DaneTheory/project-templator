const ect = require('ect');

function createEctTemplateRenderer({
  templatePath
}) {
  const templateRenderer = ect({
    root: templatePath,
    ext: '.ect',
  })
  return promisify(templateRenderer.bind(templateRenderer))
}

module.exports = {
  createEctTemplateRenderer
}
