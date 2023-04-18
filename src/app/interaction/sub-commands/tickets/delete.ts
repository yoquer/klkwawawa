import Base from "@Client";
import { server } from "@Config";
import { SubCommands } from "@clients/commands";
import { createTranscript } from "discord-html-transcripts";
import { ActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle, Channel, CommandInteraction, GuildMemberRoleManager, ModalBuilder, TextInputBuilder, TextInputStyle, User } from "discord.js"

export default class Delete extends SubCommands {
    constructor() {
        super({ name: "ticket-delete" });
    };

    async run(client: Base, int: CommandInteraction) {
        const channel = int.channel;
        const channel_name = this.channel_name(int);
        const { staff } = client.server.tickets;
        const json: any = channel.toJSON();
        const member = int.member;
        let user: User | undefined;
        try {
            user = await client.users.fetch(json.topic, { force: true });
        } catch (e) {
            user = undefined;
        };

        if (channel.name != channel_name || !String(json.topic).includes(int.user.id)) return int.reply({ embeds: [this.Error('Ticket(Error)', 'Disculpa, parece que este canal no es un ticket de soporte válido.')], ephemeral: true });



        if ((member.roles as GuildMemberRoleManager).cache.find(x => { if (staff.includes(x.id)) return x; }) || String(json.topic).includes(int.user.id)) {
            const channel = int.channel
            const channel_transcript = client.channels.cache.get(client.server.tickets.transcripts) as Channel | undefined;
            const json: any = channel.toJSON();

            int.reply({
                embeds: [this.Success('Ticket', `El ticket será eliminado <t:${this.number(new Date().toUTCString()) + 10}:R>`)]
            }).then(() => setTimeout(() => channel.delete(), 9300));


            if (user) {
                try {
                    user.send({
                        embeds: [this.Success('🎫 Ticket').setFields([{ name: '✨ Review', value: "Si deseas dejar tu opinión sobre tu experiencia con el ticket, por favor presiona el botón para dejar una reseña." }])],
                        components: [new ActionRowBuilder<ButtonBuilder>().addComponents([new ButtonBuilder().setCustomId('ticket-review').setLabel('reseña').setStyle(ButtonStyle.Success).setEmoji('📝')])]
                    })
                } catch{
                    
                };
        };


            if (channel_transcript) {

                const text = await createTranscript(channel, {
                    filename: `ticket-${json.topic}.html`,
                    limit: 1000
                });

                if (channel_transcript.isTextBased()) {
                    channel_transcript.send({ embeds: [this.Success('🎫 Ticket', `El transcript del ticket ${channel.name} corresponde al usuario ${client.users.cache.get(json.topic)?.tag ?? 'desconocido'}.`)] });
                    channel_transcript.send({ files: [text] });
                }
            };
        } else return int.reply({ embeds: [this.Error('Ticket(Error)', 'Lo siento, pero no cuentas con los permisos necesarios o no eres el propietario del ticket.')], ephemeral: true });
    };

    channel_name(int: CommandInteraction, names = server.tickets.nombre) {
        const { tag, id, username } = int.user;
        let name = names;

        if (name.includes("%user_tag%")) name = name.replace("%user_tag%", tag);
        if (name.includes("%user_id%")) name = name.replace("%user_id%", id);
        if (name.includes("%username%")) name = name.replace("%username%", username);
        if (/\%\w+\%/.test(name)) name = this.channel_name(int, name);

        return name;
    };

    number(date: string) {
        const _date = new Date(date);

        const number = Math.floor(_date.getTime() / 1000);

        if (!number) return 0;

        if (typeof number == "number") return number;

        return 0;
    };
};