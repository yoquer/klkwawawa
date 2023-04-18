"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const tslib_1 = require("tslib");
const _Config_1 = require("@Config");
const buttons_1 = tslib_1.__importDefault(require("@clients/buttons"));
const discord_js_1 = require("discord.js");
class Review extends buttons_1.default {
    constructor() {
        super({
            customID: "ticket-review",
        });
    }
    ;
    run(client, int) {
        var _a, _b, _c, _d;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let { title, quests } = { title: ((_a = _Config_1.server === null || _Config_1.server === void 0 ? void 0 : _Config_1.server.quest) === null || _a === void 0 ? void 0 : _a.title) ? (_b = _Config_1.server === null || _Config_1.server === void 0 ? void 0 : _Config_1.server.quest) === null || _b === void 0 ? void 0 : _b.title : "", quests: ((_c = _Config_1.server === null || _Config_1.server === void 0 ? void 0 : _Config_1.server.quest) === null || _c === void 0 ? void 0 : _c.quests) ? (_d = _Config_1.server === null || _Config_1.server === void 0 ? void 0 : _Config_1.server.quest) === null || _d === void 0 ? void 0 : _d.quests : [{ title: "" }] };
            quests = quests.map((x) => { if (!x)
                return undefined; if (!x.title)
                return undefined; if (x.title.length == 0)
                return undefined; return x; }).filter((x) => x !== undefined);
            if (title.length == 0)
                title = 'Ticket review';
            if (!quests[0])
                quests = [{ title: "¿Puedes reseñar el ticket?" }];
            const imputs = [];
            try {
                for (let i = 0; i < quests.length; i++) {
                    const quest = quests[i];
                    if (quest.title.length >= 45) {
                        console.log("[".black + "Error".red + "]".black + ` La pregunta número ${i + 1} no debe tener más de 45 caracteres`.gray);
                        continue;
                    }
                    imputs.push(new discord_js_1.TextInputBuilder()
                        .setLabel(quest.title)
                        .setCustomId(`ticket-quest-${i + 1}`)
                        .setPlaceholder('Escribe aqui')
                        .setMaxLength(930)
                        .setStyle(discord_js_1.TextInputStyle.Paragraph));
                }
                ;
                const modal = new discord_js_1.ModalBuilder()
                    .setTitle(title)
                    .setCustomId('ticket-modal-review')
                    .setComponents(imputs.map((x) => new discord_js_1.ActionRowBuilder().addComponents([x])));
                try {
                    yield int.showModal(modal);
                }
                catch (x) { }
            }
            catch (s) { }
            ;
        });
    }
    ;
}
exports.Review = Review;
;
