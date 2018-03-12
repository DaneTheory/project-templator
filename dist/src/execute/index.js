"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const normalize_paths_1 = require("./normalize-paths");
const recursiveReadDirCb = require("recursive-readdir");
const entry_details_1 = require("./entry-details");
const check_overlap_1 = require("./check-overlap");
const filter_ignore_1 = require("./filter-ignore");
const collect_entries_1 = require("./collect-entries");
const render_1 = require("./render");
const write_file_1 = require("./write-file");
const validate_1 = require("./validate");
const create = {
    collectEntries: collect_entries_1.collectEntries,
    normalizePaths: normalize_paths_1.normalizePaths,
    entryDetails: entry_details_1.entryDetails,
    checkOverlap: check_overlap_1.checkOverlap,
    filterIgnore: filter_ignore_1.filterIgnore,
    templateRenderer: render_1.templateRenderer,
    writeToFile: write_file_1.writeToFile,
    validate: validate_1.validate
};
exports.create = create;
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
        .then(chain.writeToFile)
        .then(chain.validate);
}
exports.execute = execute;
//# sourceMappingURL=index.js.map