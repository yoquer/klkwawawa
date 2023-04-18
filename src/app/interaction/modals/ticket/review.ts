import Base from "@Client";
import Modals from "@clients/modals";
import { Channel, EmbedField } from "discord.js";
import { TextInputModalData } from "discord.js";
import { ModalSubmitInteraction, CacheType } from "discord.js";

export class Review extends Modals{
    constructor(){
        super({
            customID: 'ticket-modal-review'
        });
    };
    async run(client: Base, int: ModalSubmitInteraction<CacheType>) {
        int.message.delete();
        let { title, quests } = client.server.quest;
        let { review } = client.server.tickets

        const components = int.components[0].components;
        const fileds: EmbedField[] = [];
        let channel : Channel;

        quests = quests.map((x)=>{if(!x)return undefined; if(!x.title) return undefined;if(x.title.length > 0) return undefined; return x; }).filter((x)=> x !== undefined);


        if( title.length == 0 ) title = 'Ticket review';
        if( !quests[0] ) quests = [ { title: "¿Puedes reseñar el ticket?" } ];
        if( review.length == 0 ) review = undefined;

        const embed = this.Embed('Random', title, `User: **${int.user.tag}**(${int.user.id})`).setThumbnail(int.user.avatar? int.user.avatarURL({extension: "png"}) : "https://i.imgur.com/WYZZLmj.png");
 

        
        
        for (let index = 0; index < components.length; index++) {
            const quest = quests[index].title;
            const result = (components[index] as TextInputModalData).value;
            fileds.push({
                name: quest,
                value: result,
                inline: false
            });
        };

        if(review){
            try{
                channel = await client.channels.fetch(review);
            }catch{

            };
        };

        if(channel) if(channel.isTextBased()) channel.send({ embeds: [embed.setFields(fileds)] });

        int.reply({
            embeds: [this.Success("Review", 'Tu reseña ha sido enviada con éxito.')],
            ephemeral: true 
        })
        
        
    };
};