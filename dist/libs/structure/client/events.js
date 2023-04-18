"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const base_1 = tslib_1.__importDefault(require("@base/base"));
class Events extends base_1.default {
    constructor(name) {
        super();
        this.name = name;
    }
    ;
    run(client, ...args) { }
}
exports.default = Events;
;
