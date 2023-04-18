"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _Config_1 = require("@Config");
const commands_1 = require("@clients/commands");
const discord_html_transcripts_1 = require("discord-html-transcripts");
const discord_js_1 = require("discord.js");
class Delete extends commands_1.SubCommands {
    constructor() {
        super({ name: "ticket-delete" });
    }
    ;
    run(client, int) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const channel = int.channel;
            const channel_name = this.channel_name(int);
            const { staff } = client.server.tickets;
            const json = channel.toJSON();
            const member = int.member;
            let user;
            try {
                user = yield client.users.fetch(json.topic, { force: true });
            }
            catch (e) {
                user = undefined;
            }
            ;
            if (channel.name != channel_name || !String(json.topic).includes(int.user.id))
                return int.reply({ embeds: [this.Error('Ticket(Error)', 'Disculpa, parece que este canal no es un ticket de soporte válido.')], ephemeral: true });
            if (member.roles.cache.find(x => { if (staff.includes(x.id))
                return x; }) || String(json.topic).includes(int.user.id)) {
                const channel = int.channel;
                const channel_transcript = client.channels.cache.get(client.server.tickets.transcripts);
                const json = channel.toJSON();
                int.reply({
                    embeds: [this.Success('Ticket', `El ticket será eliminado <t:${this.number(new Date().toUTCString()) + 10}:R>`)]
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
    channel_name(int, names = _Config_1.server.tickets.nombre) {
        const { tag, id, username } = int.user;
        let name = names;
        if (name.includes("%user_tag%"))
            name = name.replace("%user_tag%", tag);
        if (name.includes("%user_id%"))
            name = name.replace("%user_id%", id);
        if (name.includes("%username%"))
            name = name.replace("%username%", username);
        if (/\%\w+\%/.test(name))
            name = this.channel_name(int, name);
        return name;
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
