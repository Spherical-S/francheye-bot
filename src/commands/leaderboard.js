const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    EmbedBuilder,
    ButtonBuilder,
    ActionRowBuilder,
} = require("discord.js");
const getTikTokLeaderboards = require("../utils/getTikTokLeaderboards");
const getYoutubeLeaderboards = require("../utils/getYoutubeLeaderboards");
const organizePages = require("../utils/organizePages");

// async function getYoutubeLeaderboards() {
//     try {
//         const response = await fetch("https://successful-pink-tutu.cyclic.app/api/v1/leaderboard/youtube");
//         const r = await response.json();

//         if (response.status == 200) {
//             return [true, r];
//         } else {
//             return [false, {}];
//         }
//     } catch (error) {
//         return [false, {}];
//     }
// }

// async function getTiktokLeaderboards() {
//     try{
//         const response = await fetch("https://successful-pink-tutu.cyclic.app/api/v1/leaderboard/tiktok");
//         const r = await response.json();

//         if(response.status == 200){
//             return [true, r];
//         } else {
//             return [false, {}];
//         }
//     } catch (error) {
//         return [false, {}];
//     }
// }

// function organizePages(creators, page, r, platform){
//     for(let i = 0, count = 0; i<page[1]; i++){

//         creators.push([]);

//         for(let j = 0; j<10; j++){

//             if(count >= r.length){
//                 break;
//             }

//             let lifeViews = "";
//             let monthViews = "";

//             if(platform == 1){
//                 lifeViews = r[count].analytics.youtube.total.lifeTimeTotalViews + "";
//                 monthViews = r[count].analytics.youtube.total.thirtyDaysViews + "";

//                 if(r[count].analytics.youtube.total.lifeTimeTotalViews > 999999){
//                     lifeViews = (Math.round(r[count].analytics.youtube.total.lifeTimeTotalViews / 100000) / 10) + "Mil";
//                 }

//                 //if(r[count].analytics.youtube.total.thirtyDaysViews > 999999){
//                 //    monthViews = (Math.round(r[count].analytics.youtube.total.thirtyDaysViews / 100000) / 10) + "Mil";
//                 //}
//                 monthViews = "Null";
//             }

//             if(platform == 2){
//                 lifeViews = r[count].analytics.tikTok.total.lifeTimeTotalViews + "";
//                 monthViews = r[count].analytics.tikTok.total.thirtyDays + "";

//                 if(r[count].analytics.tikTok.total.lifeTimeTotalViews > 999999){
//                     lifeViews = (Math.round(r[count].analytics.tikTok.total.lifeTimeTotalViews / 100000) / 10) + "Mil";
//                 }

//                 if(r[count].analytics.tikTok.total.thirtyDays > 999999){
//                     monthViews = (Math.round(r[count].analytics.tikTok.total.thirtyDays / 100000) / 10) + "Mil";
//                 }
//             }

//             let name = `__${count+1}. ${r[count].data.name}__`;
//             let value = "*Lifetime views*: " + lifeViews + "\n*Past 30 days*: "+ monthViews;
//             let inline = true;

//             if(count == 0){
//                 name = `__🥇 ${r[count].data.name}__`;
//             }
//             if(count == 1){
//                 name = `__🥈 ${r[count].data.name}__`;
//             }
//             if(count == 2){
//                 name = `__🥉 ${r[count].data.name}__`;
//             }

//             creators[i].push({
//                 name: name,
//                 value: value,
//                 inline: inline,
//             });
            
//             count++;

//         }
//     }

//     return creators;

// }



module.exports = {
    name: 'leaderboard',
    description: 'Check leaderboards for creators associated with us.',
    options: [
        {
          name: 'platform',
          description: 'The platform you want to fetch the leaderboards for.',
          type: ApplicationCommandOptionType.Integer,
          required: true,
          choices: [
            {
                name: 'youtube',
                value: 1,
            },
            {
                name: 'tiktok',
                value: 2,
            },
          ]
        },
        {
          name: 'amount',
          description: 'The amount of creators to fetch from the leaderboards.',
          type: ApplicationCommandOptionType.Integer,
          required: true,
          choices: [
            {
                name: 'top 10',
                value: 10,
            },
            {
                name: 'top 20',
                value: 20,
            },
            {
                name: 'top 50',
                value: 50,
            },
            {
                name: 'top 100',
                value: 100,
            },
          ]
        },
      ],
    cooldown: 5,
    execute: async (client, interaction) => {

        const platform = interaction.options.get('platform').value;
        const amount = interaction.options.get('amount').value;
        var page = [1,amount/10];
        var creators = [];

        if (platform == 1){

            const leaderboards = await getYoutubeLeaderboards();

            if(!leaderboards[0]){
                interaction.reply({content: 'Something went wrong.', ephemeral: true});
                return;
            }

            const r = leaderboards[1];

            creators = organizePages(creators, page, r, platform);

            const nextButton = new ButtonBuilder()
                .setCustomId("nextYt")
                .setLabel("Next")
                .setStyle("Primary");
            
            const prevButton = new ButtonBuilder()
                .setCustomId("prevYt")
                .setLabel("Previous")
                .setStyle("Primary");

            const row = new ActionRowBuilder()
                .addComponents(prevButton, nextButton);

            const embed = new EmbedBuilder()
                .setColor(0x8abeff)
                .setTitle("__**Top " + amount + " - Youtube**__")
                .setTimestamp()
                .setFooter({ text: "" + page[0] + "/" + page[1] });

            for(let i = 0, count = 1; i<creators[0].length; i++){
                if(count == 3){
                    embed.addFields( {name: '\u200b', value: '\u200b', inline: true} );
                    count = 1;
                    i--;
                }else{
                    embed.addFields(creators[0][i]);
                    count++;
                }
            }
            
            await interaction.reply( {embeds: [embed], components: [row],} );

        }else if (platform == 2){

            const leaderboards = await getTikTokLeaderboards();

            if(!leaderboards[0]){
                interaction.reply({content: 'Something went wrong.', ephemeral: true});
                return;
            }

            const r = leaderboards[1];

            creators = organizePages(creators, page, r, platform);

            const nextButton = new ButtonBuilder()
                .setCustomId("nextTT")
                .setLabel("Next")
                .setStyle("Primary");
            
            const prevButton = new ButtonBuilder()
                .setCustomId("prevTT")
                .setLabel("Previous")
                .setStyle("Primary");

            const row = new ActionRowBuilder()
                .addComponents(prevButton, nextButton);

            const embed = new EmbedBuilder()
                .setColor(0x8abeff)
                .setTitle("__**Top " + amount + " - TikTok**__")
                .setTimestamp()
                .setFooter({ text: "" + page[0] + "/" + page[1] });

            for(let i = 0, count = 1; i<creators[0].length; i++){
                if(count == 3){
                    embed.addFields( {name: '\u200b', value: '\u200b', inline: true} );
                    count = 1;
                    i--;
                }else{
                    embed.addFields(creators[0][i]);
                    count++;
                }
            }
            
            await interaction.reply( {embeds: [embed], components: [row],} );

        }

    },
};