"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const util_1 = require("util");
const readFile = util_1.promisify(fs.readFile);
function renderTemplates(config = {}) {
    const { resolveTemplateFile, templatePath, renderTemplate, info } = config;
    return (files) => {
        info('render templates');
        return Promise.all(files.map((entry) => {
            const { params, isTemplate } = entry;
            const templateFile = resolveTemplateFile(entry);
            function renderIt() {
                info('render', {
                    templateFile,
                    params
                });
                return renderTemplate(templateFile, params, entry);
            }
            function readIt() {
                const filePath = path.join(templatePath, templateFile);
                info('read', {
                    filePath,
                });
                return readFile(filePath, 'utf8');
            }
            const doTemplate = isTemplate ? renderIt : readIt;
            doTemplate().then((data) => {
                entry.data = data;
                return entry;
            });
        }));
    };
}
exports.renderTemplates = renderTemplates;
//# sourceMappingURL=render-templates.js.map