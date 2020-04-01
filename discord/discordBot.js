const Discord = require('discord.js');
const config = require('../config/discord');

// function executed when online

client.on("ready", () => {

    console.log("Discord bot online");
    client.user.setActivity('Nostale beste');
});

client.on("message", async (msg) => {

    if (msg.author.bot) return;
    
    if (msg.content == "Hallo") {

		// WIP

    }
});

client.login(config.token);