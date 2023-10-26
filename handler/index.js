const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const yaml = require('js-yaml');
const fs = require('fs');
const config = yaml.load(fs.readFileSync('settings/config.yml', 'utf8', 2))
const chalk = require('chalk');
const globPromise = promisify(glob);
/**
 * @param {Client} client
 */
module.exports = async (client) => {

    client.on("ready", () => {
    
        console.log(chalk.magenta.bold(' ╔━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╗'));
        console.log(chalk.magenta.bold(` ┃    Tickets Bot by github.com/sdeyy    ┃`))
        console.log(chalk.magenta.bold(` ╚━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╝`))
    })

    // Events
    const eventFiles = await globPromise(`${process.cwd()}/events/*/*.js`);
    eventFiles.map((value) => require(value));
    // Slash Commands
    const slashCommands = await globPromise(
        `${process.cwd()}/commands/*/*.js`
    );
    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        arrayOfSlashCommands.push(file);
    });
    client.on("ready", async () => {
        try { 
        await client.guilds.cache.get(`${config.GUILDID}`).commands.set(arrayOfSlashCommands);
        } catch (error) {
            console.log(`[ERROR] Incorrect GuildID, check that it has been correctly placed in the configuration file or contact with sdeyy.lsd.`)
        }
    });
};