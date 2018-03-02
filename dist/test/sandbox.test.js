const path = require('path');
const fs = require('fs');
const { transformTree, sandboxed } = require('..');
const filePath = path.join(__dirname, 'sandboxed.sjs');
const ctx = runSandboxedCodeAt(filePath);
const options = {
    author: 'Kristian',
    username: 'kmandrup',
    name: 'my-project'
};
const result = transformTree(ctx.treeDef, options);
console.log('transformation', {
    result
});
//# sourceMappingURL=sandbox.test.js.map