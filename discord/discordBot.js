const Discord = require('discord.js');
const config = require('./config');

const client = new Discord.Client();
const beafowlId = "196394798146519051";
const afkChannelId = "148079564650840065";

// function executed when online

client.on("ready", () => {

    console.log("Discord bot online");
    client.user.setActivity('Nostale beste');
});

client.on("message", async (msg) => {

    if (msg.author.bot) return;
    
    if (msg.content == "Hallo") {

        const afkChannel = await client.channels.fetch(afkChannelId);

        client.

        console.log(msg.member);

    }
});

client.login(config.token);