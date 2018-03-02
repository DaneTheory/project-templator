"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function gitRepo(template) {
    // git repo
    if (!/.+\/.+/.test(template))
        return false;
    const matches = /([^/]+)\/([^#]+)(?:#(.+))?$/.exec(template);
    if (!matches)
        return {
            type: 'invalid'
        };
    const [, user, name, version] = matches;
    return {
        type: 'repo',
        user,
        name,
        version
    };
}
exports.gitRepo = gitRepo;
//# sourceMappingURL=git-repo.js.map