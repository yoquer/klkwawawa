import Base from "@Client";
import { SubCommands } from "@clients/commands";
import { CommandInteraction, CacheType, GuildChannel } from "discord.js";

export class Say extends SubCommands{
    constructor(){
        super({ name: 'message-say' });
    };

   async run(client: Base, int: CommandInteraction<CacheType>) {
    const __ = (type: string) => {try{return int.options.get(type, false).value as string; } catch{ return undefined; }};
    const message = __('message');
    const channel = int.options.get('channel', true).channel as GuildChannel;

    if(!message) return int.reply({
        embeds: [
            this.Error('Message(Error)', "No incluiste ninguna información en los datos del mensaje.")
        ],
        ephemeral: true
    });

    if(channel.isTextBased()) channel.send(message);

    int.reply({
        embeds: [
            this.Success('Message(Success)', "Se envió el mensaje al canal.")
            ], ephemeral: true
    });


    };
};