"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Panel = void 0;
const tslib_1 = require("tslib");
const commands_1 = require("@clients/commands");
const discord_js_1 = require("discord.js");
class Panel extends commands_1.Commands {
    constructor() {
        super({
            name: "panel",
            description: "Panel commands",
            defaultMemberPermissions: [discord_js_1.PermissionsBitField.Flags.Administrator, discord_js_1.PermissionsBitField.Flags.ManageGuild],
            options: [
                {
                    name: "ticket",
                    description: "ticket panel",
                    type: discord_js_1.ApplicationCommandOptionType.Subcommand,
                    descriptionLocalizations: {
                        "en-US": "ticket panel",
                        "es-ES": "panel de ticket",
                    },
                    options: [
                        {
                            name: "channel",
                            description: "channel to send ticket",
                            type: discord_js_1.ApplicationCommandOptionType.Channel,
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
    }
    ;
    run(client, int) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.metodo(int, client, "ticket"))
                return;
        });
    }
    ;
    metodo(int, client, tipo) {
        const get = (name) => int.options.data.find((x) => x.name == name);
        if (get(tipo))
            return client.subcommands.get(`panel-${tipo}`).run(client, int);
    }
    ;
}
exports.Panel = Panel;
