import Base from "@Client";
import { Commands } from "@clients/commands";
import { CommandInteraction, CacheType, ApplicationCommandOptionType } from "discord.js";

export default class create extends Commands {
    constructor() {
        super({
            name: "ticket",
            description: "Sub grupo de comandos",
            options: [
                {
                    name: 'create',
                    description: 'create a support ticket',
                    type: ApplicationCommandOptionType.Subcommand,
                    descriptionLocalizations: {
                        "en-US": "create a support ticket",
                        "es-ES": "crear un ticket de soporte",
                    },
                    options: [
                        {
                            name: 'reason',
                            nameLocalizations: {
                                "en-US": "reason",
                                "es-ES": "motivo",
                            },
                            description: 'reason for the ticket',
                            type: ApplicationCommandOptionType.String,
                            descriptionLocalizations: {
                                "en-US": "reason for the ticket",
                                "es-ES": "motivo para el ticket",
                            },
                        },
                    ],
                },
                {
                    name: "delete",
                    description: "delete a support ticket",
                    type: ApplicationCommandOptionType.Subcommand,
                    descriptionLocalizations: {
                        "en-US": "delete a support ticket",
                        "es-ES": "eliminar un ticket de soporte",
                    },
                },
            ],
        });
    };

    async run(client: Base, int: CommandInteraction<CacheType>) {
        if (this.metodo(int, client, "create")) return;
        if (this.metodo(int, client, "delete")) return;
    };

    metodo(int: CommandInteraction, client: Base, tipo: string) {
        const get = (name: string) => int.options.data.find((x) => x.name == name);
        if (get(tipo)) return client.subcommands.get(`ticket-${tipo}`).run(client, int);
    };
};