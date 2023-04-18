import Base from "@Client";
import { Commands } from "@clients/commands";
import { ApplicationCommandOptionType, CacheType, CommandInteraction, PermissionsBitField } from "discord.js";

export class Panel extends Commands {
    constructor() {
        super({
            name: "panel",
            description: "Panel commands",
            defaultMemberPermissions: [PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.ManageGuild],
            options: [
                {
                    name: "ticket",
                    description: "ticket panel",
                    type: ApplicationCommandOptionType.Subcommand,
                    descriptionLocalizations: {
                        "en-US": "ticket panel",
                        "es-ES": "panel de ticket",
                    },
                    options: [
                        {
                            name: "channel",
                            description: "channel to send ticket",
                            type: ApplicationCommandOptionType.Channel,
                            descriptionLocalizations: {
                                "en-US": "channel to send ticket",
                                "es-ES": "canal para enviar ticket",
                            },
                            required: true
                        }
                    ]
                }
            ]
        });
    };

    async run(client: Base, int: CommandInteraction<CacheType>) {
        if (this.metodo(int, client, "ticket")) return;
    };

    metodo(int: CommandInteraction, client: Base, tipo: string) {
        const get = (name: string) => int.options.data.find((x) => x.name == name);
        if (get(tipo)) return client.subcommands.get(`panel-${tipo}`).run(client, int);
    };
}