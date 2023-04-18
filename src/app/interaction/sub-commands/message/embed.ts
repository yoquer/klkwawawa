import Base from "@Client";
import { SubCommands } from "@clients/commands";
import { CommandInteraction, CacheType, GuildChannel, ColorResolvable } from "discord.js";

export class Embed extends SubCommands {
    constructor() {
        super({
            name: 'message-embed'
        });
    };

    async run(client: Base, int: CommandInteraction<CacheType>) {
        const __ = (type: string) => { try { return int.options.get(type, false).value as string; } catch { return undefined; } };
        let title = __('title');
        let description = __('description');
        let color = __('color') as ColorResolvable;
        const channel = int.options.get('channel', true).channel as GuildChannel;


        const embed = this.Embed();

        if (title) embed.setTitle(title);
        if (description) embed.setDescription(description);
        if (color) try { embed.setColor(color) } catch (e) { return int.reply({ embeds: [this.Error('Message(Error)', 'El código de color especificado no es válido.').setFields([{ name: "formatos", value: 'Los colores hexadecimales se representan con un símbolo "#" seguido de 6 caracteres alfanuméricos.' }])], ephemeral: true }) };

        try {
            if (channel.isTextBased()) await channel.send({
                embeds: [embed]
            });
            int.reply({
                embeds: [
                    this.Success('Message', 'El mensaje ha sido enviado exitosamente.')
                ],
                ephemeral: true
            })
        } catch (e) {
            int.reply({
                embeds: [
                    this.Error('Message(Error)', 'Se produjo un error al enviar el mensaje. Por favor, verifica los detalles y vuelve a intentarlo.')
                ],
                ephemeral: true
            })
        }; 
    };
};