const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "add",
    description: "add a member to a ticket",
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'user',
            description: 'user to add',
            type: 'USER',
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
        
        const rolesupport = client.config.TICKETS.SUPPORT_ROLE;
        if(!interaction.member.roles.cache.has(rolesupport)) return interaction.reply({content: `${client.embeds.EMBEDS.NO_PERMISSIONS}`, ephemeral: true})
        
        const topic = interaction.channel.topic;
        
        const userCheck = interaction.guild.members.cache.get(topic);

        if(!userCheck){
            const noTicket = new MessageEmbed()
            .setColor('RED')
            .setDescription(`${client.embeds.TICKET.NO_IS_TICKET}`.replace('<user>', `${interaction.user}`))
                
            return interaction.reply({ embeds: [noTicket], ephemeral: true})
        } 

        let user = interaction.options.getUser('user');
        let añadido = user.id;

        if(!user) return interaction.reply({embeds: [embed2]})
        interaction.channel.permissionOverwrites.edit(añadido, {
            ATTACH_FILES: true,
            READ_MESSAGE_HISTORY: true,
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true
        })
        const embed = new MessageEmbed()
        .setTitle(`${client.config.BOTNAME} | User Added`)
        .setDescription(`Staff:\n <@!${interaction.member.user.id}>\n Member Added:\n<@!${(await client.users.fetch(añadido)).id}>`)
        .setColor(`${client.config.EMBEDCOLOR}`)
        .setTimestamp()
        interaction.reply({
            embeds: [embed]
        })
    },
};