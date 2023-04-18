"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("./paths");
const _Client_1 = tslib_1.__importDefault(require("@Client"));
const colors_1 = tslib_1.__importDefault(require("colors"));
const client = new _Client_1.default();
const { token } = (_a = client.config) !== null && _a !== void 0 ? _a : {};
if (token) {
    console.log(colors_1.default.green('# # # # # # # # # #'));
    console.log('#'.green + ' Cofigo Prendido'.blue + ' #'.green);
    console.log('# # # # # # # # # #'.green);
    console.log(' ');
    client.login(token).catch(e => {
        if (e.code.includes('TokenInvalid')) {
            console.log('[TokenInvalido]: '.red + 'El token proporcionado no es valido o es incorrecto'.gray);
        }
    });
}
else {
    console.log('[Error]:'.red + ' No se proporciono un token en app/config'.gray);
    process.exit(1);
}
