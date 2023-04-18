import { readFileSync } from 'fs';
import { join } from 'path';
const link = __dirname + '../../../app/';
import yaml from 'js-yaml';

const code = loadData<{ config: { json: boolean, yaml: boolean }, server: { json: boolean, yaml: boolean } }>('yaml', 'code');
type Format = 'yaml' | 'json';
const cache: Array<string> = [];
const dato_cache: Array<{ server?: objects['server'], config?: objects['config'] }> = [];



function getData<T extends keyof objects>(archivo: T): objects[T] {
    const { config, server } = code || {};
    const { token, bot_activity } = getObject<objects["config"]>(config, 'c') || {};
    const { tickets, embed, quest } = getObject<objects["server"]>(server, 's') || {};

    const dato_config = {
        token,
        bot_activity: {
            status: bot_activity?.status,
            name: bot_activity?.name,
            game: bot_activity?.game,
        },
    };
    const dato_server = {
        tickets: {
            server: tickets?.server,
            nombre: tickets?.nombre,
            category: tickets?.category,
            review: tickets?.review,
            transcripts: tickets?.transcripts,
            staff: tickets?.staff || [],
        },
        embed: {
            ticket: {
                title: embed?.ticket?.title,
                description: embed?.ticket?.description,
            },
            panel: {
                title: embed?.panel?.title,
                description: embed?.panel?.description,
                color: embed?.panel?.color,
            },
        },
        quest: {
            title: quest?.title,
            quests: quest?.quests || [{ title: '' }],
        },
    };

    switch (archivo) {
        case 'config':
            const _config = dato_cache.find(x => { if (x?.config) return x; });
            if (_config) {
                return _config as objects[T]
            } else {
                dato_cache.push({ config: dato_config });
                return dato_config as objects[T];
            }

        case 'server':
            const _server = dato_cache.find(x => { if (x?.server) return x; });
            if (_server) {
                return _server as objects[T]
            } else {
                dato_cache.push({ server: dato_server });
                return dato_server as objects[T];
            };
    };
};





function loadData<T = any>(format: Format, filename: string): T {
    try {
        const file = readFileSync(join(link, `${filename}.${format}`), 'utf8');
        return format === 'json' ? JSON.parse(file) : yaml.load(file);
    } catch (e) {
        console.error(e.message);
        return {} as T;
    }
}

function getObject<T = any>(dato: any, f?: 's' | 'c'): T {

    let format: string;
    if (f == 's') { format = 'server' } else
        if (f == 'c') { format = 'config' };
    if (cache.find((s) => s == format)) return {} as T;

    if (dato.yaml && !dato.json) {
        return loadData('yaml', format);
    } else
        if (dato.json && !dato.yaml) {
            return loadData('json', format);
        } else
            if (dato.yaml && dato.json) {
                cache.push(format);
                console.log('[Error]:'.red+ `No se puede usar 2 formatos en ${format}`.gray);
                return {} as T;
            }
            else {
                cache.push(format);
                console.log(`[Error]:`.red + ` No hay ningun formato en ${format}`.gray);
                return {} as T;
            }
};

const config = getData('config');
const server = getData('server');

export {
    config,
    server
};


interface objects {
    config: {
        token: string,
        bot_activity: {
            status: 'invisible' | 'online' | 'idle' | 'dnd',
            name: string,
            game: string
        },
    },
    server: {
        tickets: {
            server: string,
            nombre: string,
            category: string,
            review: string,
            transcripts: string,
            staff: Array<string>
        },
        embed: {
            ticket: {
                title: string,
                description: string,
            },
            panel: {
                title: string,
                description: string,
                color: string
            }
        },
        quest: {
            title: string,
            quests: Array<{ title: string }>
        }

    },
}