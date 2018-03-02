const intersection = require('lodash/intersection');
module.exports = function ({ error, info }) {
    const checkOverlap = (files) => {
        info('check overlap');
        const templateFiles = files.filter(({ isTemplate }) => entry.isTemplate)
            .map(({ filePath }) => filePath);
        const ordinaryFiles = files.filter(({ filePath, isTemplate }) => !isTemplate)
            .map(({ filePath }) => filePath);
        const invalidFiles = intersection(templateFiles, ordinaryFiles);
        if (invalidFiles.length) {
            error(`The following files are invalid as there are also templates with the same filename: ${invalidFiles.join(', ')}`);
        }
        return files;
    };
    return checkOverlap;
};
//# sourceMappingURL=check-overlap.js.map