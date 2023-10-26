const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
module.exports = {
    name: "remove",
    description: "remove a user of a ticket",
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'user',
            description: 'user to remove',
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
        
        let si = interaction.options.getUser('user');
        let removido = si.id;

        interaction.channel.permissionOverwrites.edit(removido, {
          VIEW_CHANNEL: false
        })


        const embed = new MessageEmbed()
        .setTitle(`${client.config.BOTNAME} | User Removed`)
        .setDescription(`Staff:\n <@!${interaction.user.id}>\nMember Removed:\n<@!${(await client.users.fetch(removido)).id}>`)
        .setColor("RED")
        .setTimestamp()
        interaction.reply({
            embeds: [embed]
        })
    },
};
