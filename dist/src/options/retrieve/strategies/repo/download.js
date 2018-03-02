"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const downloadRepo = require("download-git-repo");
function download(repo, dest, options = {}) {
    return new Promise((resolve, reject) => {
        downloadRepo(repo, dest, options, (err) => {
            if (err)
                return reject(err);
            resolve(dest);
        });
    });
}
function repo(parsed, dest, options = {}) {
    return fs.remove(dest).then(() => {
        const repo = `${parsed.user}/${parsed.name}${parsed.version ? `#${parsed.version}` : ''}`;
        return download(repo, dest, options);
    });
}
exports.repo = repo;
//# sourceMappingURL=download.js.map