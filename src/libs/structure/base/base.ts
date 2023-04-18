import { ColorResolvable, EmbedBuilder } from "discord.js";

export default class base {
    Embed(color: ColorResolvable = 'Random', title?: string, desc?: string) {
        const embed = new EmbedBuilder().setColor(color);
        if (title) embed.setTitle(title);
        if (desc) embed.setDescription(desc);
        return embed;
    };

    Error(title?: string, desc?: string) {
        const embed = new EmbedBuilder().setColor("Red");
        if (title) embed.setTitle(title);
        if (desc) embed.setDescription(desc);
        return embed;
    };

    Success(title?: string, desc?: string) {
        const embed = new EmbedBuilder().setColor("Green");
        if (title) embed.setTitle(title);
        if (desc) embed.setDescription(desc);
        return embed;
    };

    Warn(title?: string, desc?: string) {
        const embed = new EmbedBuilder().setColor('Orange');
        if (title) embed.setTitle(title);
        if (desc) embed.setDescription(desc);
        return embed;
    };

};