const { Client, Interaction } = require("discord.js");

module.exports = {
    name: 'ping',
    description: 'Check if the bot is alive.',
    cooldown: 5,
    execute: async (client, interaction) => {
        interaction.reply({content: 'Pong.', empheral: true});
    },
};