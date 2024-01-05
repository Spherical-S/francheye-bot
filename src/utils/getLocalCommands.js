const path = require("path");
const getAllFiles = require("./getAllFiles");

module.exports = (exceptions = []) => {
    let localCommands = []

    const commandFiles = getAllFiles(path.join(__dirname, "..", "commands"), false);

    for(const commandFile of commandFiles){
        const command = require(commandFile);

        if(exceptions.includes(command.name)){
            continue;
        }

        localCommands.push(command);
    }

    return localCommands;
};