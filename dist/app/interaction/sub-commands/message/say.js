"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Say = void 0;
const tslib_1 = require("tslib");
const commands_1 = require("@clients/commands");
class Say extends commands_1.SubCommands {
    constructor() {
        super({ name: 'message-say' });
    }
    ;
    run(client, int) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const __ = (type) => { try {
                return int.options.get(type, false).value;
            }
            catch (_a) {
                return undefined;
            } };
            const message = __('message');
            const channel = int.options.get('channel', true).channel;
            if (!message)
                return int.reply({
                    embeds: [
                        this.Error('Message(Error)', "No incluiste ninguna información en los datos del mensaje.")
                    ],
                    ephemeral: true
                });
            if (channel.isTextBased())
                channel.send(message);
            int.reply({
                embeds: [
                    this.Success('Message(Success)', "Se envió el mensaje al canal.")
                ], ephemeral: true
            });
        });
    }
    ;
}
exports.Say = Say;
;
