"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
function resolveLocations(config = {}) {
    let { templateSrc, destPath, validate, defaults, info, error } = config;
    // set templateSrc.filePath
    info('resolveLocations', config);
    defaults = defaults || {};
    templateSrc = templateSrc || {};
    if (!validate.string(destPath)) {
        error('resolveLocations: missing destPath', {
            config
        });
    }
    let defaultPath = path.join(process.cwd(), 'templates');
    defaultPath = defaults.templatesFilePath ? defaults.templatesFilePath(config) : defaultPath;
    templateSrc.filePath = templateSrc.filePath || defaultPath;
    // validate that templateSrc.filePath is a string
    if (validate && validate.nonEmpty) {
        validate.nonEmpty.string(templateSrc.filePath);
        // validate that destPath is a string
        validate.nonEmpty.string(destPath);
    }
    return {
        templateSrc,
        destPath
    };
}
exports.resolveLocations = resolveLocations;
//# sourceMappingURL=locations.js.map