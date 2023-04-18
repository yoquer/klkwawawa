"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const loadbase_1 = tslib_1.__importDefault(require("@base/loadbase"));
class Load extends loadbase_1.default {
    constructor(client) {
        super(client);
        const link = '../../../../app';
        this.Commands(link);
        this.Buttons(link);
        this.Modals(link);
        this.Events(link);
    }
    ;
    Commands(dir) {
        this.load(dir + "/interaction/commands");
        this.load(dir + '/interaction/sub-commands');
    }
    ;
    Buttons(dir) {
        this.load(dir + "/interaction/buttons");
    }
    ;
    Modals(dir) {
        this.load(dir + "/interaction/modals");
    }
    ;
    Events(dir) {
        this.load(dir + "/events");
    }
    ;
}
exports.default = Load;
;
