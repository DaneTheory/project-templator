const intersection = require('lodash/intersection');
module.exports = function (config = {}) {
    const { error, info } = config;
    return (files) => {
        info('check overlap');
        const templateFiles = files.filter((entry) => entry.isTemplate)
            .map((entry) => entry.filePath);
        const ordinaryFiles = files.filter((entry) => !entry.isTemplate)
            .map((entry) => entry.filePath);
        const invalidFiles = intersection(templateFiles, ordinaryFiles);
        if (invalidFiles.length) {
            error(`The following files are invalid as there are also templates with the same filename: ${invalidFiles.join(', ')}`);
        }
        return files;
    };
};
//# sourceMappingURL=check-overlap.js.map