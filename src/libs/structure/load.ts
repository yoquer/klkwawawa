import base_load from "@base/loadbase";
import Client from '@Client';

export default class Load extends base_load {

    constructor(client: Client) {
        super(client);
        const link = '../../../../app';
        this.Commands(link);
        this.Buttons(link);
        this.Modals(link);
        this.Events(link);
    };

    Commands(dir: string) {
        this.load(dir + "/interaction/commands");
        this.load(dir + '/interaction/sub-commands')
    };

    Buttons(dir: string) {
        this.load(dir + "/interaction/buttons");
    };

    Modals(dir: string) {
        this.load(dir + "/interaction/modals");
    };

    Events(dir: string) {
        this.load(dir + "/events");
    };
};