"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const download_npm_1 = require("./download-npm");
function fromNpm(parsed, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { utils, } = options;
        let update = false;
        if (parsed.type !== 'npm')
            return false;
        const packageName = parsed.scoped ?
            `@${parsed.user}/${parsed.name}` :
            parsed.name;
        const dest = utils.getPackageTemplatePath(packageName);
        return shouldDownload && download_npm_1.downloadFromNpm() || fromExistingTemplate();
    });
}
exports.fromNpm = fromNpm;
//# sourceMappingURL=index.js.map