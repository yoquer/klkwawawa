import Base from "@Client";
import base from "@base/base";
import { ButtonInteraction } from "discord.js";

export default class Buttons extends base {

    customID: string;

    constructor(json: { customID: string }) {
        super();
        this.customID = json.customID;
    };
    run(client: Base, int: ButtonInteraction): any { }
};