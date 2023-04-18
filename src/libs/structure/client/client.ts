import { Client, GatewayIntentBits, Partials, Collection } from "discord.js";
import Load from "../load";
import { Commands, SubCommands } from "./commands";
import Buttons from "./buttons";
import Modals from "./modals";
import { server, config } from "@Config";


export default class Base extends Client {

    // Grupo de variables de collectiones
    public commands = new Collection<string, Commands>();
    public buttons = new Collection<string, Buttons>();
    public modals = new Collection<string, Modals>();
    public subcommands = new Collection<string, SubCommands>();
    public server = server;
    public config = config;
    public events = new Array<string>();



    constructor() {
        super({
            intents: [
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildModeration
            ],
            partials: [
                Partials.Message,
                Partials.User,
                Partials.GuildMember,
                Partials.Channel,
            ]
        });
        new Load(this);
    };
};