"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const base_1 = tslib_1.__importDefault(require("@base/base"));
class Modals extends base_1.default {
    constructor(json) {
        super();
        this.customID = json.customID;
    }
    ;
    run(client, int) { }
}
exports.default = Modals;
;
