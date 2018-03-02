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
const yarnInstall = require("yarn-install");
const tildify = require("tildify");
function downloadFromNpm(parsed, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const { packageName, configUtils, event, dest, forceNpm, utils, log, exists } = options;
        let { configFileName } = options;
        yield configUtils.ensurePackages();
        const pm = yarnInstall.getPm({
            respectNpm5: forceNpm
        });
        event.emit('install-template:start', packageName, pm);
        const version = parsed.version ? `@${parsed.version}` : '';
        const proc = yarnInstall([`${packageName}${version}`], {
            stdio: 'pipe',
            cwd: configUtils.packagesDir,
            respectNpm5: forceNpm
        });
        // Now template is downloaded
        // Read the template pkg and config file name
        const templatePkg = utils.readPkg(dest);
        configFileName = configUtils.getConfigFileName(configFileName, templatePkg);
        if (proc.status !== 0) {
            const msg = 'Error occurs during installing package:\n' +
                proc.stderr.toString().trim();
            if (exists) {
                log.error(msg);
                log.warn(`Using cached npm package at ${tildify(dest)}`);
            }
            else {
                throw new Error(msg);
            }
        }
    });
}
exports.downloadFromNpm = downloadFromNpm;
//# sourceMappingURL=download-npm.js.map