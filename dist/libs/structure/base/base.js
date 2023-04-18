"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class base {
    Embed(color = 'Random', title, desc) {
        const embed = new discord_js_1.EmbedBuilder().setColor(color);
        if (title)
            embed.setTitle(title);
        if (desc)
            embed.setDescription(desc);
        return embed;
    }
    ;
    Error(title, desc) {
        const embed = new discord_js_1.EmbedBuilder().setColor("Red");
        if (title)
            embed.setTitle(title);
        if (desc)
            embed.setDescription(desc);
        return embed;
    }
    ;
    Success(title, desc) {
        const embed = new discord_js_1.EmbedBuilder().setColor("Green");
        if (title)
            embed.setTitle(title);
        if (desc)
            embed.setDescription(desc);
        return embed;
    }
    ;
    Warn(title, desc) {
        const embed = new discord_js_1.EmbedBuilder().setColor('Orange');
        if (title)
            embed.setTitle(title);
        if (desc)
            embed.setDescription(desc);
        return embed;
    }
    ;
}
exports.default = base;
;
