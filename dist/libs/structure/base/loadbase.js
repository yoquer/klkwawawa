"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const commands_1 = require("@clients/commands");
const fs_1 = require("fs");
const path_1 = require("path");
const buttons_1 = tslib_1.__importDefault(require("@clients/buttons"));
const modals_1 = tslib_1.__importDefault(require("@clients/modals"));
const events_1 = tslib_1.__importDefault(require("@clients/events"));
const util_1 = require("util");
const lstatAsync = (0, util_1.promisify)(fs_1.lstat);
class BaseLoad {
    constructor(client) {
        this.client = client;
    }
    load(dir) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            const files = yield this.getFiles(dir);
            for (const value of files) {
                const file = (0, path_1.join)(dir, value);
                try {
                    const arch = yield (_a = file, Promise.resolve().then(() => tslib_1.__importStar(require(_a))));
                    let archivo;
                    if (arch.default) {
                        archivo = new arch.default();
                    }
                    else {
                        const s = Object.values(arch)[0];
                        archivo = new s();
                    }
                    ;
                    if (archivo instanceof commands_1.Commands) {
                        this.client.commands.set(archivo === null || archivo === void 0 ? void 0 : archivo.name, archivo);
                    }
                    else if (archivo instanceof commands_1.SubCommands) {
                        this.client.subcommands.set(archivo === null || archivo === void 0 ? void 0 : archivo.name, archivo);
                    }
                    else if (archivo instanceof buttons_1.default) {
                        this.client.buttons.set(archivo === null || archivo === void 0 ? void 0 : archivo.customID, archivo);
                    }
                    else if (archivo instanceof modals_1.default) {
                        this.client.modals.set(archivo === null || archivo === void 0 ? void 0 : archivo.customID, archivo);
                    }
                    else if (archivo instanceof events_1.default) {
                        this.client.events.push(archivo.name);
                        this.client.on(archivo === null || archivo === void 0 ? void 0 : archivo.name, (...args) => archivo === null || archivo === void 0 ? void 0 : archivo.run(this.client, ...args));
                    }
                    ;
                }
                catch (_b) {
                }
            }
        });
    }
    ;
    getFiles(dir) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let files_array = [];
            if (dir.includes('../'))
                dir = __dirname + dir;
            const dir_folder = (0, path_1.join)(dir);
            const files = (0, fs_1.readdirSync)(dir_folder);
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                try {
                    const stats = yield lstatAsync((0, path_1.join)(dir_folder, file));
                    if (stats.isDirectory()) {
                        this.load((0, path_1.join)(dir_folder, file));
                    }
                    else if (stats.isFile() && (file.endsWith('.js') || file.endsWith('.ts'))) {
                        files_array.push(file);
                    }
                }
                catch (err) {
                    console.error(err);
                }
            }
            return files_array;
        });
    }
    ;
}
exports.default = BaseLoad;
