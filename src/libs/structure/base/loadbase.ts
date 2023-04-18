import {Commands, SubCommands} from "@clients/commands";
import { lstat, readdirSync } from "fs";
import { join } from "path";
import Client from '@Client';
import Buttons from "@clients/buttons";
import Modals from "@clients/modals";
import Events from "@clients/events";
import { promisify } from 'util';

const lstatAsync = promisify(lstat);

export default class BaseLoad {
    private client: Client;
    constructor(client: Client) {
        this.client = client;
    }

    async load(dir: string) {
        const files = await this.getFiles(dir);
        for (const value of files) {
            const file = join(dir, value);
            
            try {
                const arch = await import(file);
                let archivo: any;
                if (arch.default) {
                    archivo = new arch.default();
                } else {
                    const s = Object.values<any>(arch)[0];
                    archivo = new s();
                };
                
                if (archivo instanceof Commands) {
                    this.client.commands.set(archivo?.name, archivo);
                } else if(archivo instanceof SubCommands ){
                    this.client.subcommands.set(archivo?.name, archivo);
                } else if (archivo instanceof Buttons) {
                    this.client.buttons.set(archivo?.customID, archivo);
                } else if (archivo instanceof Modals) {
                    this.client.modals.set(archivo?.customID, archivo);
                } else if (archivo instanceof Events) {
                    this.client.events.push(archivo.name);
                    this.client.on(archivo?.name, (...args) => archivo?.run(this.client, ...args));
                };
            } catch {
            }
        }
    };

    async getFiles(dir: string): Promise<string[]> {
        let files_array: string[] = [];
        if (dir.includes('../')) dir = __dirname + dir;
        const dir_folder = join(dir);
        const files = readdirSync(dir_folder);
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            try {
                const stats = await lstatAsync(join(dir_folder, file));
                if (stats.isDirectory()) {
                     this.load(join(dir_folder, file));
                } else if (stats.isFile() && (file.endsWith('.js') || file.endsWith('.ts'))) {
                    files_array.push(file);
                }
            } catch (err) {
                console.error(err);
            }
        }
        return files_array;
    };
}
