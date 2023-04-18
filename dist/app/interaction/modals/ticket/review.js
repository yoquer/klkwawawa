"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const tslib_1 = require("tslib");
const modals_1 = tslib_1.__importDefault(require("@clients/modals"));
class Review extends modals_1.default {
    constructor() {
        super({
            customID: 'ticket-modal-review'
        });
    }
    ;
    run(client, int) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            int.message.delete();
            let { title, quests } = client.server.quest;
            let { review } = client.server.tickets;
            const components = int.components[0].components;
            const fileds = [];
            let channel;
            quests = quests.map((x) => { if (!x)
                return undefined; if (!x.title)
                return undefined; if (x.title.length > 0)
                return undefined; return x; }).filter((x) => x !== undefined);
            if (title.length == 0)
                title = 'Ticket review';
            if (!quests[0])
                quests = [{ title: "¿Puedes reseñar el ticket?" }];
            if (review.length == 0)
                review = undefined;
            const embed = this.Embed('Random', title, `User: **${int.user.tag}**(${int.user.id})`).setThumbnail(int.user.avatar ? int.user.avatarURL({ extension: "png" }) : "https://i.imgur.com/WYZZLmj.png");
            for (let index = 0; index < components.length; index++) {
                const quest = quests[index].title;
                const result = components[index].value;
                fileds.push({
                    name: quest,
                    value: result,
                    inline: false
                });
            }
            ;
            if (review) {
                try {
                    channel = yield client.channels.fetch(review);
                }
                catch (_a) {
                }
                ;
            }
            ;
            if (channel)
                if (channel.isTextBased())
                    channel.send({ embeds: [embed.setFields(fileds)] });
            int.reply({
                embeds: [this.Success("Review", 'Tu reseña ha sido enviada con éxito.')],
                ephemeral: true
            });
        });
    }
    ;
}
exports.Review = Review;
;
