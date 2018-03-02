"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function normalizePaths(config) {
    const { templatePath, info } = config;
    return (files) => {
        info('normalize template file paths');
        return files.map(fullPath => {
            let file = fullPath;
            if (file.indexOf(templatePath) === 0) {
                file = file.substr(templatePath.length);
            }
            // remove leading path separator
            const filePath = file.replace(/^[\/\\]+/, '');
            const entry = {
                fullTemplatePath: templatePath,
                templatePath: file,
                filePath: filePath
            };
            info('normalized entry', entry);
            return entry;
        });
    };
}
exports.normalizePaths = normalizePaths;
//# sourceMappingURL=normalize-paths.js.map