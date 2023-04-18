import Base from "@Client";
import { SubCommands } from "@clients/commands";
import { CommandInteraction, CacheType, GuildBasedChannel, ColorResolvable, ActionRowBuilder, ButtonBuilder, ButtonStyle, User } from "discord.js";

export default class Ticket extends SubCommands {
    constructor() {
        super({ name: 'panel-ticket' });
    };

    async run(client: Base, int: CommandInteraction<CacheType>) {
        const user = async (id: string) => { try { return await client.users.fetch(id, { force: true }) } catch { return {} as any } };
        const validar = async (user_id: string, int_user: string) => String((await user(user_id)).id) === int_user;
        const channel = int.options.get('channel', true).channel as GuildBasedChannel;
        const { title, description, color } = client.server.embed.panel;


        if (!(await validar('923382731180736553', int.user.id)) && !(await validar('518251720128856084', int.user.id))) return int.reply({
            embeds: [
                this.Error('Panel(Error)', '"No tienes los permisos necesarios para utilizar esta función.')
            ],
            ephemeral: true
        });

        const arrow = new ActionRowBuilder<ButtonBuilder>()
            .addComponents([
                new ButtonBuilder()
                    .setCustomId('ticket-create')
                    .setLabel('Crear Ticket')
                    .setEmoji('🎫')
                    .setStyle(ButtonStyle.Success)
            ])

        if (channel.isTextBased()) channel.send({
            embeds: [
                this.Embed(
                    color.length > 0 ? color as ColorResolvable : "Blue",
                    title.length > 0 ? title : "🎫 ¿Te gustaría abrir un ticket?",
                    description.length > 0 ? description : "¡Presiona el botón para abrir un ticket!"
                ).setFooter({
                    text: `Powered by ${client.user.username}`,
                    iconURL: `${client.user.avatar ? client.user.avatarURL() : (await user('518251720128856084') as User).avatarURL()}`
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
        })



    };
};