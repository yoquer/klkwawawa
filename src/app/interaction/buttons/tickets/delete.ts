import Base from "@Client";
import { server } from "@Config";
import Buttons from "@clients/buttons";
import { createTranscript } from "discord-html-transcripts";
import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, CacheType, Channel, GuildMemberFlagsBitField, GuildMemberRoleManager, PermissionFlagsBits, PermissionsBitField, User } from "discord.js";

export default class Delete extends Buttons {
    constructor() {
        super({
            customID: 'ticket-delete'
        });
    };

    async run(client: Base, int: ButtonInteraction<CacheType>) {
        const channel = int.channel
        const channel_transcript = client.channels.cache.get(server.tickets.transcripts) as Channel | undefined;
        const json: any = channel.toJSON();
        const staff = server.tickets.staff;
        const member = int.member;
        let user: User | undefined;
        try {
            user = await client.users.fetch(json.topic, { force: true });
        } catch (e) {
            user = undefined;
        };

        if ((member.roles as GuildMemberRoleManager).cache.find(x=>{if(staff.includes(x.id)) return x;}) || String(json.topic).includes(int.user.id)) {
        int.reply({
            embeds: [this.Success('Ticket', `El ticket será eliminado <t:${this.number(new Date().toUTCString()) + 11}:R>`)]
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
                channel_transcript.send({ embeds: [ this.Success('🎫 Ticket', `El transcript del ticket ${channel.name} corresponde al usuario ${client.users.cache.get(json.topic)?.tag ?? 'desconocido'}.`) ] } );
                channel_transcript.send( { files: [text] } );
            }
        };
    } else return int.reply( { embeds: [ this.Error('Ticket(Error)', 'Lo siento, pero no cuentas con los permisos necesarios o no eres el propietario del ticket.') ] , ephemeral: true} );

    };
    number(date: string) {
        const _date = new Date(date);

        const number = Math.floor(_date.getTime() / 1000);

        if (!number) return 0;

        if (typeof number == "number") return number;

        return 0;
    };
};