"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const ect = require("ect");
function createEctTemplateRenderer(config = {}) {
    const { templatePath, defaults } = config;
    const $ectConfig = ((defaults || {}).templates || {}).ect || {};
    const ext = ($ectConfig || {}).ext || '.ect';
    const ectConfig = Object.assign($ectConfig, {
        ext
    });
    if (templatePath) {
        ectConfig.root = templatePath;
    }
    const templateRenderer = ect(ectConfig);
    return {
        render: util_1.promisify(templateRenderer.render.bind(templateRenderer)),
        config: ectConfig
    };
}
exports.createEctTemplateRenderer = createEctTemplateRenderer;
//# sourceMappingURL=templates.js.map