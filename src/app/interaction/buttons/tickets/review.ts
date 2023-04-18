import Base from "@Client";
import { server } from "@Config";
import Buttons from "@clients/buttons";
import { ActionRowBuilder, ButtonInteraction, CacheType, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

export class Review extends Buttons{
    constructor(){
        super({
            customID: "ticket-review",
        });
    };

    async run(client: Base, int: ButtonInteraction<CacheType>) {
        let { title, quests } = { title: server?.quest?.title ? server?.quest?.title : "" , quests: server?.quest?.quests ? server?.quest?.quests : [ { title: "" }] };

        quests = quests.map((x)=>{if(!x)return undefined; if(!x.title) return undefined;if(x.title.length == 0) return undefined; return x; }).filter((x)=> x !== undefined);

        if( title.length == 0 ) title = 'Ticket review';
        if( !quests[0] ) quests = [ { title: "¿Puedes reseñar el ticket?" } ];




        const imputs: TextInputBuilder[] = [];

try {
    for(let i = 0; i < quests.length; i++){
        const quest = quests[i];

        if(quest.title.length >= 45) { console.log("[".black + "Error".red +"]".black +` La pregunta número ${i + 1} no debe tener más de 45 caracteres`.gray); continue }

            imputs.push(
                new TextInputBuilder()
                .setLabel(quest.title)
                .setCustomId(`ticket-quest-${i+1}`)
                .setPlaceholder('Escribe aqui')
                .setMaxLength(930)
                .setStyle(TextInputStyle.Paragraph)
            );

    };

    const modal = new ModalBuilder()
    .setTitle(title)
    .setCustomId('ticket-modal-review')
    .setComponents(imputs.map((x)=> new ActionRowBuilder<TextInputBuilder>().addComponents([x])));


    try{await int.showModal(modal)}catch(x){}

} catch(s){};
        
        
    };
};