import Base from "@Client";
import { Commands } from "@clients/commands";
import { ApplicationCommandOptionType, CacheType, CommandInteraction, PermissionsBitField } from "discord.js";

export class Messages extends Commands {
    constructor() {
        super({
            name: "message",
            description: "Send a message to a channel.",
            defaultMemberPermissions: [PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.ManageGuild],
            options: [

                {
                    name: "embed",
                    description: "Send a message embed to a channel.",
                    descriptionLocalizations: {
                        "en-US": "Send a message embed to a channel.",
                        "es-ES": "Enviar un mensaje embed a un canal."
                    },
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "channel",
                            description: "The channel to send the message to.",
                            type: ApplicationCommandOptionType.Channel,
                            descriptionLocalizations: {
                                "en-US": "The channel to send the message to.",
                                "es-ES": "El canal a enviar el mensaje."
                            },
                            required: true,
                        },
                        {
                            name: "title",
                            description: "The title of the embed.",
                            type: ApplicationCommandOptionType.String,
                            descriptionLocalizations: {
                                "en-US": "The title of the embed.",
                                "es-ES": "El título del embed."
                            },
                            maxLength: 1000
                        },
                        {
                            name: "description",
                            description: "The description of the embed.",
                            type: ApplicationCommandOptionType.String,
                            descriptionLocalizations: {
                                "en-US": "The description of the embed.",
                                "es-ES": "La descripción del embed."
                            },
                            max_length: 1000
                        },
                        {
                            name: "color",
                            description: "The color of the embed.",
                            type: ApplicationCommandOptionType.String,
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
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "channel",
                            description: "The channel to send the message to.",
                            type: ApplicationCommandOptionType.Channel,
                            descriptionLocalizations: {
                                "en-US": "The channel to send the message to.",
                                "es-ES": "El canal a enviar el mensaje."
                            },
                            required: true,
                        },
                        {
                            name: "message",
                            description: "The message to send.",
                            type: ApplicationCommandOptionType.String,
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
    };

    async run(client: Base, int: CommandInteraction<CacheType>) {
        if (this.metodo(int, client, "embed")) return;
        if (this.metodo(int, client, "say")) return;
    };

    metodo(int: CommandInteraction, client: Base, tipo: string) {
        const get = (name: string) => int.options.data.find((x) => x.name == name);
        if (get(tipo)) return client.subcommands.get(`message-${tipo}`).run(client, int);
    };
};