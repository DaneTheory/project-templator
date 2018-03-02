"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fromLocal(parsed, options) {
    let { configFileName, configUtils, utils } = options;
    if (parsed.type !== 'local')
        return false;
    const dest = parsed.path;
    const templatePkg = utils.readPkg(dest);
    configFileName = configUtils.getConfigFileName(configFileName, templatePkg);
    return {
        dest,
        templatePkg,
        configFileName
    };
}
exports.fromLocal = fromLocal;
//# sourceMappingURL=local.js.map