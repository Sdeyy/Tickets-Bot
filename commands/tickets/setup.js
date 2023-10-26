const Discord = require("discord.js")
const client = require('../../index.js')

module.exports = {
    name: "setup",
    description: "Setup ticket panel. (Only people with the ADMIN role can use this command)",
    options: [
        {
            name: "channel",
            description: "Channel to send the panel.",
            type: "CHANNEL",
            channelTypes: ["GUILD_TEXT"],
            required: false
        }
    ],
    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction
     */
     run: async (client, interaction, args) => {

        const adminRole = client.config.TICKETS.ADMIN_ROLE;
        if(!interaction.member.roles.cache.has(adminRole)) {
            return interaction.reply({content: `${client.embeds.EMBEDS.NO_PERMISSIONS}`, ephemeral: true});
        }

        const channel = interaction.options.getChannel("channel") || interaction.channel;

        const ticketPanelEmbed = new Discord.MessageEmbed()
        .setTitle(client.embeds.TicketPanel.Title)
        .setDescription(client.embeds.TicketPanel.Description)
        .setFooter(`${client.embeds.TicketPanel.Footer}`.replace("<botName>", client.user.username))
        .setTimestamp(client.embeds.TicketPanel.Timestamp)
        .setImage(client.embeds.TicketPanel.Banner)
        
        const row = new Discord.MessageActionRow()
        .addComponents(
        [
        new Discord.MessageButton()
        .setCustomId("ticketPanel")
        .setEmoji(client.buttons.TicketPanel.Emoji)
        .setLabel(client.buttons.TicketPanel.Label)
        .setStyle(client.buttons.TicketPanel.Style)
        ],
        )

        await client.channels.cache.get(channel.id).send({embeds: [ticketPanelEmbed], components: [row] }) 
        interaction.reply({content: `Panel sent correctly to ${channel}!`, ephemeral: true})
        return;

     }
    }