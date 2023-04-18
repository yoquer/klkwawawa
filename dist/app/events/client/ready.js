"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const events_1 = tslib_1.__importDefault(require("@clients/events"));
const discord_js_1 = require("discord.js");
class Ready extends events_1.default {
    constructor() {
        super('ready');
    }
    ;
    run(client) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('#'.green + ` Bot ${client.user.username} en linea `.gray + '#'.green);
            console.log('');
            if ((_a = client.config) === null || _a === void 0 ? void 0 : _a.bot_activity) {
                const { status, name, game } = client.config.bot_activity;
                const activity = { activities: [{}], shardId: 0 };
                if (['invisible', 'online', 'idle', 'dnd'].includes(status))
                    activity.status = status;
                if (name)
                    activity.activities[0].name = name;
                switch (game) {
                    case 'Playing':
                        activity.activities[0].type = discord_js_1.ActivityType.Playing;
                        break;
                    case 'Streaming':
                        activity.activities[0].type = discord_js_1.ActivityType.Streaming;
                        break;
                    case 'Watching':
                        activity.activities[0].type = discord_js_1.ActivityType.Watching;
                        break;
                }
                client.user.setPresence(activity);
            }
            this.load(client);
        });
    }
    ;
    load(client) {
        setTimeout(() => {
            const log = (tipo, nm) => console.log(`[${tipo}]: ${nm} archivos`.cyan);
            setTimeout(() => { client.application.commands.set(client.commands.map((x) => x.toJSON)); }, 10000);
            console.log('# # # # # # # # # # #'.green);
            console.log('#'.green + ' Archivos Cargados '.yellow + '#'.green);
            console.log('# # # # # # # # # # #'.green);
            console.log(' ');
            log('Eventos', client.events.map(x => x).length);
            log('Comandos', client.commands.map(x => x).length);
            log('Buttons', client.buttons.map(x => x).length);
            log('Modals', client.modals.map(x => x).length);
        }, 1000);
    }
    ;
}
exports.default = Ready;
;
