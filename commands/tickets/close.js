const client = require('../../index')
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const Discord = require('discord.js')

module.exports = {
    name: "close",
    description: "Close ticket.",
    type: 'CHAT_INPUT',

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        
        const topic = interaction.channel.topic;
        
        const userCheck = interaction.guild.members.cache.get(topic);

        if(!userCheck){
            const noTicket = new MessageEmbed()
            .setColor('RED')
            .setDescription(`${client.embeds.TICKET.NO_IS_TICKET}`.replace('<user>', `${interaction.user}`))
                
            return interaction.reply({ embeds: [noTicket], ephemeral: true})
        }

        const idmiembro = interaction.channel.topic;
        let user = client.users.cache.get(idmiembro)

        const embed = new Discord.MessageEmbed()
            .setDescription(client.embeds.TICKET.WHAT_DO_YOU_WANT)
            .setColor(client.config.EMBEDCOLOR)
        const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setLabel(client.buttons.TICKETS_GENERAL_BUTTONS.Transcript.Label)
                .setStyle(client.buttons.TICKETS_GENERAL_BUTTONS.Transcript.Style)
                .setEmoji(client.buttons.TICKETS_GENERAL_BUTTONS.Transcript.Emoji)
                .setCustomId("Ticket-Transcript"),
            new Discord.MessageButton()
                .setLabel(client.buttons.TICKETS_GENERAL_BUTTONS.Re_Open.Label)
                .setStyle(client.buttons.TICKETS_GENERAL_BUTTONS.Re_Open.Style)
                .setEmoji(client.buttons.TICKETS_GENERAL_BUTTONS.Re_Open.Emoji)
                .setCustomId("Ticket-Open"),
            new Discord.MessageButton()
                .setLabel(client.buttons.TICKETS_GENERAL_BUTTONS.Delete.Label)
                .setStyle(client.buttons.TICKETS_GENERAL_BUTTONS.Delete.Style)
                .setEmoji(client.buttons.TICKETS_GENERAL_BUTTONS.Delete.Emoji)
                .setCustomId("Ticket-Delete")
        )
        const embed2 = new Discord.MessageEmbed()
            .setDescription(`${client.embeds.TICKET.TICKET_CLOSED}`.replace('<user>', interaction.user.tag))
            .setColor(`${client.config.EMBEDCOLOR}`)

        interaction.channel.permissionOverwrites.edit(idmiembro, { VIEW_CHANNEL: false });
        interaction.channel.send({
            embeds: [embed2]
        })
        interaction.channel.send({
            embeds: [embed],
            components: [row]
        }) 

    },
};