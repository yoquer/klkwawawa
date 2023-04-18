import Base from "@Client";
import { server } from "@Config";
import Buttons from "@clients/buttons";
import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, CacheType, ChannelType, OverwriteType, PermissionsBitField, User, PermissionFlagsBits, OverwriteResolvable } from "discord.js";

export default class Create extends Buttons {
  constructor() {
    super({
      customID: 'ticket-create'
    });
  };

  async run(client: Base, int: ButtonInteraction<CacheType>) {
    const { id } = int.guild;
    const channel_name = this.channel_name(int);
    let { title, description } = server.embed.ticket || {};
    const user = async (id: string) => { try { return await client.users.fetch(id, { force: true }) } catch { return {} as any } };

    const vrf = int.guild.channels.cache.find(s => { const x: any = s.toJSON(); if (s.name === channel_name) return s; if (String(x.topic).includes(int.user.id)) return s; });

    if (vrf) return int.reply({ embeds: [this.Error('Ticket(Error)', `Ya se ha generado un ticket con el nombre de <#${vrf.id}>`)], ephemeral: true });
    if (server.tickets.server !== id) return;

    const { staff, category } = server.tickets;
    const fs: OverwriteResolvable[] = staff.map((x) => { if (int.guild.roles.cache.find((X) => X.id == x)) { return { id: String(x), type: 0, allow: ["ViewChannel", "SendMessages"] } as OverwriteResolvable } else return undefined; }).filter(x => { return x !== undefined });


    const channel = await int.guild.channels.create({
      name: channel_name,
      type: ChannelType.GuildText,
      parent: category.length > 0 ? category : undefined,
      topic: `${int.user.id}`,
      permissionOverwrites: [
        {
          id: id,
          type: 0,
          deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
        },
        {
          id: int.user.id,
          type: 1,
          allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
        }, ...fs
      ],
      reason: `Ticket creado para ${int.user.tag}`,
    });

    if (channel) int.reply({ embeds: [this.Success('Ticket', `Se va a crear un nuevo ticket con el nombre de <#${channel.id}>`)], ephemeral: true });


    const embed = this.Embed('Random', title.length > 0 ? title : '🎫 ticket support', description.length > 0 ? description : '¡Bienvenido al sistema de tickets de soporte! Por favor, espera un momento mientras nuestro equipo de soporte te atiende.').setFooter({
      text: `Powered by ${client.user.username}`,
      iconURL: `${client.user.avatar ? client.user.avatarURL() : (await user('518251720128856084') as User).avatarURL()}`
    });


    const componets = new ActionRowBuilder<ButtonBuilder>().addComponents([
      new ButtonBuilder()
        .setCustomId('ticket-delete')
        .setEmoji('🗑')
        .setLabel('delete')
        .setStyle(ButtonStyle.Danger)
    ]);

    const message = await channel.send({ embeds: [embed], components: [componets] });
    await message.pin();
    await channel.send(` <@${int.user.id}> ${staff.map((x) => `<@&${x}>`).join(', ')} `).then((x) => setTimeout(() => x.delete(), 2000));
  };


  channel_name(int: ButtonInteraction, names?: string) {
    const { tag, id, username } = int.user;
    if (!names) names = server.tickets.nombre;
    let name = names;
    if(!names) name = "🎫┇TICKET-%user_id%";
    if(names.length == 0) name = "🎫┇TICKET-%user_id%";

    if (name.includes("%user_tag%")) name = name.replace("%user_tag%", tag);
    if (name.includes("%user_id%")) name = name.replace("%user_id%", id);
    if (name.includes("%username%")) name = name.replace("%username%", username);
    if (/\%\w+\%/.test(name)) name = this.channel_name(int, name);

    return name;
  };
};