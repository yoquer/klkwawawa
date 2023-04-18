import Base from "@Client";
import base from "@base/base"
import { ApplicationCommandData, CommandInteraction } from "discord.js";

export class Commands extends base {

    name: string;
    toJSON: ApplicationCommandData;

    constructor(json: ApplicationCommandData) {
        super();
        this.name = json.name;
        this.toJSON = json;
    };
    run(client: Base, int: CommandInteraction): any { }
};

export class SubCommands extends base {

    name: string;

    constructor(json: { name: string }) {
        super();
        this.name = json.name;
    };

    run(client: Base, int: CommandInteraction): any { };
}