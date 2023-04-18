import Base from "@Client";
import Events from "@clients/events";
import { ActivityType, PresenceData } from "discord.js";

export default class Ready extends Events {
  constructor() {
    super('ready');
  };

  async run(client: Base) {
    console.log('#'.green + ` Bot ${client.user.username} en linea `.gray + '#'.green);
    console.log('');

    if (client.config?.bot_activity) {
      const { status, name, game } = client.config.bot_activity;

      const activity: PresenceData = { activities: [{}], shardId: 0 };

      if (['invisible', 'online', 'idle', 'dnd'].includes(status)) activity.status = status;
      if (name) activity.activities[0].name = name;

      switch (game) {
        case 'Playing':
          activity.activities[0].type = ActivityType.Playing;
          break;
        case 'Streaming':
          activity.activities[0].type = ActivityType.Streaming;
          break;
        case 'Watching':
          activity.activities[0].type = ActivityType.Watching;
          break;
      }


      client.user.setPresence(activity);
    }


    this.load(client);

  };

  load(client: Base) {
    setTimeout(() => {
      const log = (tipo: string, nm: number) => console.log(`[${tipo}]: ${nm} archivos`.cyan);

      setTimeout(() => { client.application.commands.set(client.commands.map((x) => x.toJSON)); }, 10000);
      console.log('# # # # # # # # # # #'.green);
      console.log('#'.green + ' Archivos Cargados '.yellow + '#'.green);
      console.log('# # # # # # # # # # #'.green);
      console.log(' ');

      log('Eventos', client.events.map(x => x).length);
      log('Comandos', client.commands.map(x => x).length);
      log('Buttons', client.buttons.map(x => x).length);
      log('Modals', client.modals.map(x => x).length);



    }, 1000)
  };
};