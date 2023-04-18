"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _Config_1 = require("@Config");
const buttons_1 = tslib_1.__importDefault(require("@clients/buttons"));
const discord_js_1 = require("discord.js");
class Create extends buttons_1.default {
    constructor() {
        super({
            customID: 'ticket-create'
        });
    }
    ;
    run(client, int) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { id } = int.guild;
            const channel_name = this.channel_name(int);
            let { title, description } = _Config_1.server.embed.ticket || {};
            const user = (id) => tslib_1.__awaiter(this, void 0, void 0, function* () { try {
                return yield client.users.fetch(id, { force: true });
            }
            catch (_a) {
                return {};
            } });
            const vrf = int.guild.channels.cache.find(s => { const x = s.toJSON(); if (s.name === channel_name)
                return s; if (String(x.topic).includes(int.user.id))
                return s; });
            if (vrf)
                return int.reply({ embeds: [this.Error('Ticket(Error)', `Ya se ha generado un ticket con el nombre de <#${vrf.id}>`)], ephemeral: true });
            if (_Config_1.server.tickets.server !== id)
                return;
            const { staff, category } = _Config_1.server.tickets;
            const fs = staff.map((x) => { if (int.guild.roles.cache.find((X) => X.id == x)) {
                return { id: String(x), type: 0, allow: ["ViewChannel", "SendMessages"] };
            }
            else
                return undefined; }).filter(x => { return x !== undefined; });
            const channel = yield int.guild.channels.create({
                name: channel_name,
                type: discord_js_1.ChannelType.GuildText,
                parent: category.length > 0 ? category : undefined,
                topic: `${int.user.id}`,
                permissionOverwrites: [
                    {
                        id: id,
                        type: 0,
                        deny: [discord_js_1.PermissionFlagsBits.ViewChannel, discord_js_1.PermissionFlagsBits.SendMessages],
                    },
                    {
                        id: int.user.id,
                        type: 1,
                        allow: [discord_js_1.PermissionFlagsBits.ViewChannel, discord_js_1.PermissionFlagsBits.SendMessages],
                    }, ...fs
                ],
                reason: `Ticket creado para ${int.user.tag}`,
            });
            if (channel)
                int.reply({ embeds: [this.Success('Ticket', `Se va a crear un nuevo ticket con el nombre de <#${channel.id}>`)], ephemeral: true });
            const embed = this.Embed('Random', title.length > 0 ? title : '🎫 ticket support', description.length > 0 ? description : '¡Bienvenido al sistema de tickets de soporte! Por favor, espera un momento mientras nuestro equipo de soporte te atiende.').setFooter({
                text: `Powered by ${client.user.username}`,
                iconURL: `${client.user.avatar ? client.user.avatarURL() : (yield user('518251720128856084')).avatarURL()}`
            });
            const componets = new discord_js_1.ActionRowBuilder().addComponents([
                new discord_js_1.ButtonBuilder()
                    .setCustomId('ticket-delete')
                    .setEmoji('🗑')
                    .setLabel('delete')
                    .setStyle(discord_js_1.ButtonStyle.Danger)
            ]);
            const message = yield channel.send({ embeds: [embed], components: [componets] });
            yield message.pin();
            yield channel.send(` <@${int.user.id}> ${staff.map((x) => `<@&${x}>`).join(', ')} `).then((x) => setTimeout(() => x.delete(), 2000));
        });
    }
    ;
    channel_name(int, names) {
        const { tag, id, username } = int.user;
        if (!names)
            names = _Config_1.server.tickets.nombre;
        let name = names;
        if (!names)
            name = "🎫┇TICKET-%user_id%";
        if (names.length == 0)
            name = "🎫┇TICKET-%user_id%";
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
}
exports.default = Create;
;
