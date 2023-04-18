"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const events_1 = tslib_1.__importDefault(require("@clients/events"));
class interactionCreate extends events_1.default {
    constructor() {
        super('interactionCreate');
    }
    ;
    run(client, int) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (int.isButton()) {
                const id = int.customId;
                const button = client.buttons.get(id);
                if (button)
                    return button === null || button === void 0 ? void 0 : button.run(client, int);
                if (!button)
                    return int.reply({ embeds: [this.Error('Buttons(Error)', 'este boton no existe.')], ephemeral: true });
            }
            else if (int.isCommand()) {
                const id = int.commandName;
                const command = client.commands.get(id);
                if (command)
                    return command === null || command === void 0 ? void 0 : command.run(client, int);
                if (!command)
                    return int.reply({ embeds: [this.Error('Commands(Error)', 'este comando no existe.')], ephemeral: true });
            }
            else if (int.isModalSubmit()) {
                const id = int.customId;
                const modals = client.modals.get(id);
                if (modals)
                    return modals === null || modals === void 0 ? void 0 : modals.run(client, int);
                if (!modals)
                    return int.reply({ embeds: [this.Error('Modals(Error)', 'este modal no existe.')], ephemeral: true });
            }
            else {
                if (int.isRepliable())
                    return int.reply({ embeds: [this.Error('Interaction(Error)', 'este tipo de interación no existe.')], ephemeral: true });
            }
        });
    }
    ;
}
exports.default = interactionCreate;
;
