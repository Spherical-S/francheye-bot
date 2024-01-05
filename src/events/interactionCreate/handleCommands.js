require("dotenv").config();
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = async (client, interaction) => {
    if(!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands();

    try{
        const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName);

        if(!commandObject) return;

        await commandObject.execute(client, interaction);

    }catch (err){
        console.log(err);
    }
};