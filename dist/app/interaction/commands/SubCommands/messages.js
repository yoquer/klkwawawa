"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messages = void 0;
const tslib_1 = require("tslib");
const commands_1 = require("@clients/commands");
const discord_js_1 = require("discord.js");
class Messages extends commands_1.Commands {
    constructor() {
        super({
            name: "message",
            description: "Send a message to a channel.",
            defaultMemberPermissions: [discord_js_1.PermissionsBitField.Flags.Administrator, discord_js_1.PermissionsBitField.Flags.ManageGuild],
            options: [
                {
                    name: "embed",
                    description: "Send a message embed to a channel.",
                    descriptionLocalizations: {
                        "en-US": "Send a message embed to a channel.",
                        "es-ES": "Enviar un mensaje embed a un canal."
                    },
                    type: discord_js_1.ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "channel",
                            description: "The channel to send the message to.",
                            type: discord_js_1.ApplicationCommandOptionType.Channel,
                            descriptionLocalizations: {
                                "en-US": "The channel to send the message to.",
                                "es-ES": "El canal a enviar el mensaje."
                            },
                            required: true,
                        },
                        {
                            name: "title",
                            description: "The title of the embed.",
                            type: discord_js_1.ApplicationCommandOptionType.String,
                            descriptionLocalizations: {
                                "en-US": "The title of the embed.",
                                "es-ES": "El título del embed."
                            },
                            maxLength: 1000
                        },
                        {
                            name: "description",
                            description: "The description of the embed.",
                            type: discord_js_1.ApplicationCommandOptionType.String,
                            descriptionLocalizations: {
                                "en-US": "The description of the embed.",
                                "es-ES": "La descripción del embed."
                            },
                            max_length: 1000
                        },
                        {
                            name: "color",
                            description: "The color of the embed.",
                            type: discord_js_1.ApplicationCommandOptionType.String,
                            descriptionLocalizations: {
                                "en-US": "The color of the embed.",
                                "es-ES": "El color del embed."
                            },
                        },
                    ]
                },
                {
                    name: "say",
                    description: "Send a message to a channel.",
                    descriptionLocalizations: {
                        "en-US": "Send a message to a channel.",
                        "es-ES": "Enviar un mensaje a un canal."
                    },
                    type: discord_js_1.ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "channel",
                            description: "The channel to send the message to.",
                            type: discord_js_1.ApplicationCommandOptionType.Channel,
                            descriptionLocalizations: {
                                "en-US": "The channel to send the message to.",
                                "es-ES": "El canal a enviar el mensaje."
                            },
                            required: true,
                        },
                        {
                            name: "message",
                            description: "The message to send.",
                            type: discord_js_1.ApplicationCommandOptionType.String,
                            descriptionLocalizations: {
                                "en-US": "The message to send.",
                                "es-ES": "El mensaje a enviar."
                            },
                            max_length: 1400
                        }
                    ]
                }
            ]
        });
    }
    ;
    run(client, int) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.metodo(int, client, "embed"))
                return;
            if (this.metodo(int, client, "say"))
                return;
        });
    }
    ;
    metodo(int, client, tipo) {
        const get = (name) => int.options.data.find((x) => x.name == name);
        if (get(tipo))
            return client.subcommands.get(`message-${tipo}`).run(client, int);
    }
    ;
}
exports.Messages = Messages;
;
