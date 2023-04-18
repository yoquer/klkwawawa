"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCommands = exports.Commands = void 0;
const tslib_1 = require("tslib");
const base_1 = tslib_1.__importDefault(require("@base/base"));
class Commands extends base_1.default {
    constructor(json) {
        super();
        this.name = json.name;
        this.toJSON = json;
    }
    ;
    run(client, int) { }
}
exports.Commands = Commands;
;
class SubCommands extends base_1.default {
    constructor(json) {
        super();
        this.name = json.name;
    }
    ;
    run(client, int) { }
    ;
}
exports.SubCommands = SubCommands;
