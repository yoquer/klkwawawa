import Base from "@Client";
import Events from "@clients/events";
import { Interaction } from "discord.js";

export default class interactionCreate extends Events {

    constructor() {
        super('interactionCreate');
    };

    async run(client: Base, int: Interaction) {

        if (int.isButton()) {
            const id = int.customId;
            const button = client.buttons.get(id);
            if (button) return button?.run(client, int);
            if (!button) return int.reply({ embeds: [this.Error('Buttons(Error)', 'este boton no existe.')], ephemeral: true });
        } else if (int.isCommand()) {
            const id = int.commandName;
            const command = client.commands.get(id);
            if (command) return command?.run(client, int);
            if (!command) return int.reply({ embeds: [this.Error('Commands(Error)', 'este comando no existe.')], ephemeral: true });
        } else if (int.isModalSubmit()) {
            const id = int.customId;
            const modals = client.modals.get(id);
            if (modals)  return modals?.run(client, int)
            if (!modals) return int.reply({ embeds: [this.Error('Modals(Error)', 'este modal no existe.')], ephemeral: true });
        } else {
            if (int.isRepliable()) return int.reply({ embeds: [this.Error('Interaction(Error)', 'este tipo de interación no existe.')], ephemeral: true });
        }

    };
};