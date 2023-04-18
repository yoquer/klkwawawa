"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const commands_1 = require("@clients/commands");
const discord_js_1 = require("discord.js");
class Ticket extends commands_1.SubCommands {
    constructor() {
        super({ name: 'panel-ticket' });
    }
    ;
    run(client, int) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = (id) => tslib_1.__awaiter(this, void 0, void 0, function* () { try {
                return yield client.users.fetch(id, { force: true });
            }
            catch (_a) {
                return {};
            } });
            const validar = (user_id, int_user) => tslib_1.__awaiter(this, void 0, void 0, function* () { return String((yield user(user_id)).id) === int_user; });
            const channel = int.options.get('channel', true).channel;
            const { title, description, color } = client.server.embed.panel;
            if (!(yield validar('923382731180736553', int.user.id)) && !(yield validar('518251720128856084', int.user.id)))
                return int.reply({
                    embeds: [
                        this.Error('Panel(Error)', '"No tienes los permisos necesarios para utilizar esta función.')
                    ],
                    ephemeral: true
                });
            const arrow = new discord_js_1.ActionRowBuilder()
                .addComponents([
                new discord_js_1.ButtonBuilder()
                    .setCustomId('ticket-create')
                    .setLabel('Crear Ticket')
                    .setEmoji('🎫')
                    .setStyle(discord_js_1.ButtonStyle.Success)
            ]);
            if (channel.isTextBased())
                channel.send({
                    embeds: [
                        this.Embed(color.length > 0 ? color : "Blue", title.length > 0 ? title : "🎫 ¿Te gustaría abrir un ticket?", description.length > 0 ? description : "¡Presiona el botón para abrir un ticket!").setFooter({
                            text: `Powered by ${client.user.username}`,
                            iconURL: `${client.user.avatar ? client.user.avatarURL() : (yield user('518251720128856084')).avatarURL()}`
                        })
                    ],
                    components: [
                        arrow
                    ]
                });
            int.reply({
                embeds: [
                    this.Success("📑 Panel", "El panel ha sido enviado exitosamente.")
                ],
                ephemeral: true,
            });
        });
    }
    ;
}
exports.default = Ticket;
;
