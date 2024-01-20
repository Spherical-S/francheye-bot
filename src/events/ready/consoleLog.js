const { ActivityType } = require("discord.js");

module.exports = (client) => {
    console.log(`${client.user.tag} is online!`);
	
	client.user.setPresence({
		activities: [{
			type: ActivityType.Watching,
			name: "www.francheye.com",
			url: 'www.francheye.com'
		}],
		status: "online"
	})
};