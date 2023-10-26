const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const Discord = require('discord.js')

module.exports = {
    name: "rename",
    description: "Rename ticket.",
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'name',
            description: 'Example: example-<ticketUser>',
            type: 'STRING',
            required: true
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        
        if(!interaction.member.roles.cache.has(`${client.config.TICKETS.SUPPORT_ROLE}`)) return interaction.reply({ content: client.embeds.EMBEDS.NO_PERMISSIONS, ephemeral: true})
        const renameTicket = interaction.options.getString('name');
        const topic = interaction.channel.topic;
        
        const userCheck = interaction.guild.members.cache.get(topic);

        if(!userCheck){
            const noTicket = new MessageEmbed()
            .setColor('RED')
            .setDescription(`${client.embeds.TICKET.NO_IS_TICKET}`.replace('<user>', `${interaction.user}`))
                
            return interaction.reply({ embeds: [noTicket], ephemeral: true})
        } 

        const deleting = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`${client.embeds.TICKET.TICKET_RENAMED}`.replace('<rename>', `${renameTicket}`).replace('<ticketUser>', `${userCheck.user.username}`))

        interaction.reply({ embeds: [deleting]})

        interaction.channel.setName(`${renameTicket}`.replace('<ticketUser>', `${userCheck.user.username}`))

    },
};