"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const commands_1 = require("@clients/commands");
const discord_js_1 = require("discord.js");
class create extends commands_1.Commands {
    constructor() {
        super({
            name: "ticket",
            description: "Sub grupo de comandos",
            options: [
                {
                    name: 'create',
                    description: 'create a support ticket',
                    type: discord_js_1.ApplicationCommandOptionType.Subcommand,
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
                            type: discord_js_1.ApplicationCommandOptionType.String,
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
                    type: discord_js_1.ApplicationCommandOptionType.Subcommand,
                    descriptionLocalizations: {
                        "en-US": "delete a support ticket",
                        "es-ES": "eliminar un ticket de soporte",
                    },
                },
            ],
        });
    }
    ;
    run(client, int) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.metodo(int, client, "create"))
                return;
            if (this.metodo(int, client, "delete"))
                return;
        });
    }
    ;
    metodo(int, client, tipo) {
        const get = (name) => int.options.data.find((x) => x.name == name);
        if (get(tipo))
            return client.subcommands.get(`ticket-${tipo}`).run(client, int);
    }
    ;
}
exports.default = create;
;
