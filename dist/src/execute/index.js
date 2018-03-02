"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create = {
    normalizePaths: require('./normalize-paths'),
    entryDetails: require('./entry-details'),
    checkOverlap: require('./check-overlap'),
    filterIgnore: require('./filter-ignore'),
    renderTemplates: require('./render-templates'),
    writeFile: require('./write-file')
};
const util_1 = require("util");
const recursiveReadDir = util_1.promisify(recursiveReadDirCb);
function execute(config = {}) {
    const chain = Object.keys(create).reduce((acc, name) => {
        acc[name] = create[name](config);
        return acc;
    }, {});
    return recursiveReadDir(config.templatePath)
        .then(chain.normalizePaths)
        .then(chain.entryDetails)
        .then(chain.checkOverlap)
        .then(chain.filterIgnore)
        .then(chain.renderTemplates)
        .then(chain.writeFile);
}
exports.execute = execute;
//# sourceMappingURL=index.js.map