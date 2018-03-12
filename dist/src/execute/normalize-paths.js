"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
function normalizePaths(config) {
    const { templatesPath, info, validate } = config;
    return (entries) => {
        info('normalize template file paths');
        return entries.map((entry) => {
            entry = typeof entry === 'string' ? { filePath: entry } : entry;
            validate && validate.object(entry);
            let file = entry.filePath;
            const templatePath = entry.templatePath || templatesPath;
            if (file.indexOf(templatePath) === 0) {
                file = file.substr(templatePath.length);
            }
            // remove leading path separator
            const filePath = file.replace(/^[\/\\]+/, '');
            const templateDir = path.basename(templatePath, filePath);
            entry.templatePath = templatePath;
            entry.templateDir = templateDir;
            entry.filePath = filePath;
            info('normalized entry', entry);
            return entry;
        });
    };
}
exports.normalizePaths = normalizePaths;
//# sourceMappingURL=normalize-paths.js.map