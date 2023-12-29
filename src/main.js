require("dotenv").config();
var cron = require("cron");
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

function sendFrancheyeMessage(){
    var pointTo;
    client.channels.fetch("1183229887952195595")
        .then(channel => { pointTo = channel })
        .catch(console.error);

    client.channels.fetch("1137750558619488412")
        .then(messageChannel => {
            const embed = new EmbedBuilder()
                .setColor(0x23dfeb)
                .setTitle("__**Bridging The Gap Between Brands And Creators**__")
                .setDescription("https://francheye.com/\n\nHead over to " + pointTo.toString() + " to start Digital Franchising today!")
                .setImage("https://cdn.discordapp.com/attachments/1187876727934955581/1188175394067722250/yumgif.gif?ex=65999191&is=65871c91&hm=6fe2c42b85af999518a68f0527af52fffe101ad1b04bad99ec817ece4170c20a&");
            messageChannel.send({ embeds: [embed] });
			console.log("Message sent!");
        })
        .catch(console.error);
}

let messageManager = new cron.CronJob('00 00 00,06,12,18 * * *', sendFrancheyeMessage);
messageManager.start();

client.on("messageCreate", (msg) => {
    if(msg.content === "!ping"){
        msg.channel.send("pong");
    }
})

client.login(process.env.TOKEN);