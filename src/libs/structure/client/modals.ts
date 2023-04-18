import Base from "@Client";
import base from "@base/base";
import { ModalSubmitInteraction } from "discord.js";

export default class Modals extends base {

    customID: string;

    constructor(json: { customID: string }) {
        super();
        this.customID = json.customID;
    };
    run(client: Base, int: ModalSubmitInteraction): any { }
};