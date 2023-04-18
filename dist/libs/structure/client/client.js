"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const load_1 = tslib_1.__importDefault(require("../load"));
const _Config_1 = require("@Config");
class Base extends discord_js_1.Client {
    constructor() {
        super({
            intents: [
                discord_js_1.GatewayIntentBits.GuildMembers,
                discord_js_1.GatewayIntentBits.DirectMessages,
                discord_js_1.GatewayIntentBits.MessageContent,
                discord_js_1.GatewayIntentBits.GuildMessages,
                discord_js_1.GatewayIntentBits.GuildMembers,
                discord_js_1.GatewayIntentBits.Guilds,
                discord_js_1.GatewayIntentBits.GuildModeration
            ],
            partials: [
                discord_js_1.Partials.Message,
                discord_js_1.Partials.User,
                discord_js_1.Partials.GuildMember,
                discord_js_1.Partials.Channel,
            ]
        });
        // Grupo de variables de collectiones
        this.commands = new discord_js_1.Collection();
        this.buttons = new discord_js_1.Collection();
        this.modals = new discord_js_1.Collection();
        this.subcommands = new discord_js_1.Collection();
        this.server = _Config_1.server;
        this.config = _Config_1.config;
        this.events = new Array();
        new load_1.default(this);
    }
    ;
}
exports.default = Base;
;
