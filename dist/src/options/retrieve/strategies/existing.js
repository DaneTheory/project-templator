"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fromExistingTemplate(parsed, options = {}) {
    let { configFileName, utils, configUtils, dest } = options;
    // Get template pkg and config file name from existing template
    const templatePkg = utils.readPkg(dest);
    configFileName = configUtils.getConfigFileName(configFileName, templatePkg);
}
exports.fromExistingTemplate = fromExistingTemplate;
//# sourceMappingURL=existing.js.map