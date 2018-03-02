"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const ect = require("ect");
function createEctTemplateRenderer(config = {}) {
    const { templatePath } = config;
    const templateRenderer = ect({
        root: templatePath,
        ext: '.ect',
    });
    return util_1.promisify(templateRenderer.bind(templateRenderer));
}
exports.createEctTemplateRenderer = createEctTemplateRenderer;
//# sourceMappingURL=templates.js.map