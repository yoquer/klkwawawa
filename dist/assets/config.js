"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.config = void 0;
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const path_1 = require("path");
const link = __dirname + '../../../app/';
const js_yaml_1 = tslib_1.__importDefault(require("js-yaml"));
const code = loadData('yaml', 'code');
const cache = [];
const dato_cache = [];
function getData(archivo) {
    var _a, _b, _c, _d, _e;
    const { config, server } = code || {};
    const { token, bot_activity } = getObject(config, 'c') || {};
    const { tickets, embed, quest } = getObject(server, 's') || {};
    const dato_config = {
        token,
        bot_activity: {
            status: bot_activity === null || bot_activity === void 0 ? void 0 : bot_activity.status,
            name: bot_activity === null || bot_activity === void 0 ? void 0 : bot_activity.name,
            game: bot_activity === null || bot_activity === void 0 ? void 0 : bot_activity.game,
        },
    };
    const dato_server = {
        tickets: {
            server: tickets === null || tickets === void 0 ? void 0 : tickets.server,
            nombre: tickets === null || tickets === void 0 ? void 0 : tickets.nombre,
            category: tickets === null || tickets === void 0 ? void 0 : tickets.category,
            review: tickets === null || tickets === void 0 ? void 0 : tickets.review,
            transcripts: tickets === null || tickets === void 0 ? void 0 : tickets.transcripts,
            staff: (tickets === null || tickets === void 0 ? void 0 : tickets.staff) || [],
        },
        embed: {
            ticket: {
                title: (_a = embed === null || embed === void 0 ? void 0 : embed.ticket) === null || _a === void 0 ? void 0 : _a.title,
                description: (_b = embed === null || embed === void 0 ? void 0 : embed.ticket) === null || _b === void 0 ? void 0 : _b.description,
            },
            panel: {
                title: (_c = embed === null || embed === void 0 ? void 0 : embed.panel) === null || _c === void 0 ? void 0 : _c.title,
                description: (_d = embed === null || embed === void 0 ? void 0 : embed.panel) === null || _d === void 0 ? void 0 : _d.description,
                color: (_e = embed === null || embed === void 0 ? void 0 : embed.panel) === null || _e === void 0 ? void 0 : _e.color,
            },
        },
        quest: {
            title: quest === null || quest === void 0 ? void 0 : quest.title,
            quests: (quest === null || quest === void 0 ? void 0 : quest.quests) || [{ title: '' }],
        },
    };
    switch (archivo) {
        case 'config':
            const _config = dato_cache.find(x => { if (x === null || x === void 0 ? void 0 : x.config)
                return x; });
            if (_config) {
                return _config;
            }
            else {
                dato_cache.push({ config: dato_config });
                return dato_config;
            }
        case 'server':
            const _server = dato_cache.find(x => { if (x === null || x === void 0 ? void 0 : x.server)
                return x; });
            if (_server) {
                return _server;
            }
            else {
                dato_cache.push({ server: dato_server });
                return dato_server;
            }
            ;
    }
    ;
}
;
function loadData(format, filename) {
    try {
        const file = (0, fs_1.readFileSync)((0, path_1.join)(link, `${filename}.${format}`), 'utf8');
        return format === 'json' ? JSON.parse(file) : js_yaml_1.default.load(file);
    }
    catch (e) {
        console.error(e.message);
        return {};
    }
}
function getObject(dato, f) {
    let format;
    if (f == 's') {
        format = 'server';
    }
    else if (f == 'c') {
        format = 'config';
    }
    ;
    if (cache.find((s) => s == format))
        return {};
    if (dato.yaml && !dato.json) {
        return loadData('yaml', format);
    }
    else if (dato.json && !dato.yaml) {
        return loadData('json', format);
    }
    else if (dato.yaml && dato.json) {
        cache.push(format);
        console.log('[Error]:'.red + `No se puede usar 2 formatos en ${format}`.gray);
        return {};
    }
    else {
        cache.push(format);
        console.log(`[Error]:`.red + ` No hay ningun formato en ${format}`.gray);
        return {};
    }
}
;
const config = getData('config');
exports.config = config;
const server = getData('server');
exports.server = server;
