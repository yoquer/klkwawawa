import base from "@base/base";
import { ClientEvents } from "discord.js";
import Client from '@Client';

export default class Events extends base {

    name: string;

    constructor(name: keyof ClientEvents) {
        super();
        this.name = name;
    };
    run(client: Client, ...args: any[]): any { }
};