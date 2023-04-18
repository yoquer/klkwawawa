"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Embed = void 0;
const tslib_1 = require("tslib");
const commands_1 = require("@clients/commands");
class Embed extends commands_1.SubCommands {
    constructor() {
        super({
            name: 'message-embed'
        });
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
            let title = __('title');
            let description = __('description');
            let color = __('color');
            const channel = int.options.get('channel', true).channel;
            const embed = this.Embed();
            if (title)
                embed.setTitle(title);
            if (description)
                embed.setDescription(description);
            if (color)
                try {
                    embed.setColor(color);
                }
                catch (e) {
                    return int.reply({ embeds: [this.Error('Message(Error)', 'El código de color especificado no es válido.').setFields([{ name: "formatos", value: 'Los colores hexadecimales se representan con un símbolo "#" seguido de 6 caracteres alfanuméricos.' }])], ephemeral: true });
                }
            ;
            try {
                if (channel.isTextBased())
                    yield channel.send({
                        embeds: [embed]
                    });
                int.reply({
                    embeds: [
                        this.Success('Message', 'El mensaje ha sido enviado exitosamente.')
                    ],
                    ephemeral: true
                });
            }
            catch (e) {
                int.reply({
                    embeds: [
                        this.Error('Message(Error)', 'Se produjo un error al enviar el mensaje. Por favor, verifica los detalles y vuelve a intentarlo.')
                    ],
                    ephemeral: true
                });
            }
            ;
        });
    }
    ;
}
exports.Embed = Embed;
;
