"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const filenamify = require("filenamify");
const existing_1 = require("../existing");
const download_repo_1 = require("./download-repo");
function fromRepo(parsed, options = {}) {
    const { configUtils, mustDownload, } = options;
    if (parsed.type !== 'repo')
        return false;
    const folderName = filenamify(`${parsed.user}%%${parsed.name.replace('/', '-')}`);
    const dest = path.join(configUtils.reposDir, folderName);
    const opts = {
        dest
    };
    return mustDownload && download_repo_1.downloadRepo(parsed, opts) || existing_1.fromExistingTemplate(parsed, opts);
}
exports.fromRepo = fromRepo;
//# sourceMappingURL=index.js.map