"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _Config_1 = require("@Config");
const buttons_1 = tslib_1.__importDefault(require("@clients/buttons"));
const discord_html_transcripts_1 = require("discord-html-transcripts");
const discord_js_1 = require("discord.js");
class Delete extends buttons_1.default {
    constructor() {
        super({
            customID: 'ticket-delete'
        });
    }
    ;
    run(client, int) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const channel = int.channel;
            const channel_transcript = client.channels.cache.get(_Config_1.server.tickets.transcripts);
            const json = channel.toJSON();
            const staff = _Config_1.server.tickets.staff;
            const member = int.member;
            let user;
            try {
                user = yield client.users.fetch(json.topic, { force: true });
            }
            catch (e) {
                user = undefined;
            }
            ;
            if (member.roles.cache.find(x => { if (staff.includes(x.id))
                return x; }) || String(json.topic).includes(int.user.id)) {
                int.reply({
                    embeds: [this.Success('Ticket', `El ticket será eliminado <t:${this.number(new Date().toUTCString()) + 11}:R>`)]
                }).then(() => setTimeout(() => channel.delete(), 9300));
                if (user) {
                    try {
                        user.send({
                            embeds: [this.Success('🎫 Ticket').setFields([{ name: '✨ Review', value: "Si deseas dejar tu opinión sobre tu experiencia con el ticket, por favor presiona el botón para dejar una reseña." }])],
                            components: [new discord_js_1.ActionRowBuilder().addComponents([new discord_js_1.ButtonBuilder().setCustomId('ticket-review').setLabel('reseña').setStyle(discord_js_1.ButtonStyle.Success).setEmoji('📝')])]
                        });
                    }
                    catch (_c) {
                    }
                    ;
                }
                ;
                if (channel_transcript) {
                    const text = yield (0, discord_html_transcripts_1.createTranscript)(channel, {
                        filename: `ticket-${json.topic}.html`,
                        limit: 1000
                    });
                    if (channel_transcript.isTextBased()) {
                        channel_transcript.send({ embeds: [this.Success('🎫 Ticket', `El transcript del ticket ${channel.name} corresponde al usuario ${(_b = (_a = client.users.cache.get(json.topic)) === null || _a === void 0 ? void 0 : _a.tag) !== null && _b !== void 0 ? _b : 'desconocido'}.`)] });
                        channel_transcript.send({ files: [text] });
                    }
                }
                ;
            }
            else
                return int.reply({ embeds: [this.Error('Ticket(Error)', 'Lo siento, pero no cuentas con los permisos necesarios o no eres el propietario del ticket.')], ephemeral: true });
        });
    }
    ;
    number(date) {
        const _date = new Date(date);
        const number = Math.floor(_date.getTime() / 1000);
        if (!number)
            return 0;
        if (typeof number == "number")
            return number;
        return 0;
    }
    ;
}
exports.default = Delete;
;
