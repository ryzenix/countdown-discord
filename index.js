require('dotenv').config();

const { Client, GatewayIntentBits, ChannelType } = require("discord.js");
const { formatDuration } = require('./util/Util')
const list = require('./schedule.json')

const schedule = require('node-schedule');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    if (!list.length) return;

    for (const item of list) {
        const channel = client.channels.cache.get(item.channelId);
        if (channel.type !== ChannelType.GuildVoice) return;
        const remaining = item.timestamp - Date.now();
        if (remaining < 0) return;
        const formattedDuration = formatDuration(remaining);
        channel.setName(`${item.title}: ${formattedDuration}`).then(newChannel => console.log(`Schedule ${item.title} has been applied to channel: ${newChannel.name}`))
    }

    schedule.scheduleJob('*/5 * * * *', async () => {
        if (!list.length) return;
        for (const item of list) {
            const channel = client.channels.cache.get(item.channelId);
            if (channel.type !== ChannelType.GuildVoice) return;
            const remaining = item.timestamp - Date.now();
            if (remaining < 0) return;
            const formattedDuration = formatDuration(remaining);
            channel.setName(`${item.title}: ${formattedDuration}`).then(newChannel => console.log(`Schedule ${item.title} has been applied to channel: ${newChannel.name}`))
        }
    });
});


client.login(process.env.token);
