const { MessageEmbed, WebhookClient, Client, Collection, Discord } = require('discord.js');
const client = new Client({
    intents: 32767,
});

module.exports = (client)

const yaml = require('js-yaml');
const fs = require('fs');
const config = yaml.load(fs.readFileSync('settings/config.yml', 'utf8', 2));
const embeds = yaml.load(fs.readFileSync('settings/embeds.yml', 'utf8', 2));
const buttons = yaml.load(fs.readFileSync('settings/buttons.yml', 'utf8', 2));

client.commands = new Collection();
client.slashCommands = new Collection();
client.config = yaml.load(fs.readFileSync('settings/config.yml', 'utf8', 2));
client.embeds = yaml.load(fs.readFileSync('settings/embeds.yml', 'utf8', 2));
client.buttons = yaml.load(fs.readFileSync('settings/buttons.yml', 'utf8', 2))

require("./handler")(client);
require('events').EventEmitter.defaultMaxListeners = 0;

process.on('unhandledRejection', error => {
  console.error(error);
});
client.on('shardError', error => {
  console.error(error);
});

client.login(config.TOKEN);
