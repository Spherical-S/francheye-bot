const {Client, Interaction, EmbedBuilder, ButtonBuilder, ActionRowBuilder,} = require("discord.js");
require("dotenv").config();
require("../../commands/leaderboard");

module.exports = async (client, interaction) => {
    if(!interaction.isButton()) return;

    var embed = {};
    var pageStr = [];
    var page = [];
    var creators = {};

    if(interaction.customId === "nextYt"){
        embed = interaction.message.embeds[0];
        pageStr = embed.footer.text.split("/");
        page[0] = parseInt(pageStr[0]);
        page[1] = parseInt(pageStr[1]);

        if(page[0] == page[1]){
            await interaction.reply( {content: "You're on the last page!", ephemeral: true} );
            return;
        }

        const leaderboards = await getYoutubeLeaderboards();

        if(!leaderboards[0]){
            interaction.reply({content: 'Something went wrong.', ephemeral: true});
            return;
        }

        const r = leaderboards[1];
        creators = organizePages(creators, page, r);

        page[0] = page[0] + 1;

        const embedNew = new EmbedBuilder()
            .setColor(0x8abeff)
            .setTitle("__**Top " + amount + " - Youtube**__")
            .setTimestamp()
            .setFooter({ text: "" + page[0] + "/" + page[1] });
        
        for(let i = 0, count = 1; i<creators[page[0]-1].length; i++){
            if(count == 3){
                embedNew.addFields( {name: '\u200b', value: '\u200b', inline: true} );
                count = 1;
                i--;
            }else{
                embedNew.addFields(creators[0][i]);
                count++;
            }
        }

        interaction.editReply( {embeds: [embedNew] } );

    }
    
    if(interaction.customId === "prevYt"){
        embed = interaction.message.embeds[0];
        pageStr = embed.footer.text.split("/");
        page[0] = parseInt(pageStr[0]);
        page[1] = parseInt(pageStr[1]);

        if(page[0] == 1){
            await interaction.reply( {content: "You're on the first page!", ephemeral: true} );
            return;
        }

        const leaderboards = await getYoutubeLeaderboards();

        if(!leaderboards[0]){
            interaction.reply({content: 'Something went wrong.', ephemeral: true});
            return;
        }

        const r = leaderboards[1];
        creators = organizePages(creators, page, r);

        page[0] = page[0] - 1;

        const embedNew = new EmbedBuilder()
            .setColor(0x8abeff)
            .setTitle("__**Top " + amount + " - Youtube**__")
            .setTimestamp()
            .setFooter({ text: "" + page[0] + "/" + page[1] });
        
        for(let i = 0, count = 1; i<creators[page[0]-1].length; i++){
            if(count == 3){
                embedNew.addFields( {name: '\u200b', value: '\u200b', inline: true} );
                count = 1;
                i--;
            }else{
                embedNew.addFields(creators[0][i]);
                count++;
            }
        }

        interaction.editReply( {embeds: [embedNew] } );

    }
}