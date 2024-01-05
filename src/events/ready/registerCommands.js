require('dotenv').config();
const getLocalCommands = require("../../utils/getLocalCommands");
const getApplicationCommands = require("../../utils/getApplicationCommands");

module.exports = async (client) => {
    try{
        const localCommands = getLocalCommands();
        const applicationCommands = await getApplicationCommands(client, process.env.GUILD_ID);

        for(const localCommand of localCommands){
            const { name, description, options } = localCommand;

            const existingCommand = await applicationCommands.cache.find((cmd) => cmd.name === name);

            if(existingCommand){
                await applicationCommands.delete(existingCommand.id);
            }

            await applicationCommands.create({
                name,
                description,
                options,
            });

            console.log(`Registered command ${name}`);

        }
    }catch(err){
        console.log(err);
    }
};