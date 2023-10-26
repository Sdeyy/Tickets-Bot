const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const client = require('../../index')

client.on("interactionCreate", async (interaction) => {
    
    if(interaction.isButton()) {

        const supportrole = client.config.TICKETS.SUPPORT_ROLE;
        const adminrole = client.config.TICKETS.ADMIN_ROLE;

        let customID = "ticketPanel"
            
        if(!customID.includes(interaction.customId)) return;

        let memberID = interaction.member.user.id;
        const ticketRoles = [{id: supportrole,allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ADD_REACTIONS", "ATTACH_FILES", "EMBED_LINKS", "MANAGE_MESSAGES", "MANAGE_CHANNELS"]},{id: adminrole,allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ADD_REACTIONS", "ATTACH_FILES", "EMBED_LINKS", "MANAGE_MESSAGES", "MANAGE_CHANNELS"]}]; 
        const tagRoles = `<@&${supportrole}>`

        await interaction.reply({embeds: [new MessageEmbed().setColor("ORANGE").setDescription(client.embeds.TICKET.TICKET_CREATING)], ephemeral: true})


        interaction.guild.channels.create(`ticket-${interaction.member.user.username}}`, {
            type: "GUILD_TEXT",
            topic: `${memberID}`,
            parent: client.config.TICKETS.TICKET_CATEGORY,
            permissionOverwrites : [{id: interaction.guild.id,deny: ["VIEW_CHANNEL"]},{id: memberID,allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ADD_REACTIONS", "ATTACH_FILES", "EMBED_LINKS"]},...ticketRoles]
        }).then(async channel => {
            const row = new MessageActionRow().addComponents(
                new MessageButton().setStyle(client.buttons.TICKETS_GENERAL_BUTTONS.Close.Style).setLabel(client.buttons.TICKETS_GENERAL_BUTTONS.Close.Label).setEmoji(client.buttons.TICKETS_GENERAL_BUTTONS.Close.Emoji).setCustomId("Ticket-Open-Close"),
                new MessageButton().setStyle(client.buttons.TICKETS_GENERAL_BUTTONS.Claim.Style).setLabel(client.buttons.TICKETS_GENERAL_BUTTONS.Claim.Label).setEmoji(client.buttons.TICKETS_GENERAL_BUTTONS.Claim.Emoji).setCustomId("Ticket-Claimed"))
            const welcome = new MessageEmbed()
            .setTitle(`${client.embeds.TICKET_OPEN.Title}`.replace('<botName>', client.user.username))
            .setDescription(`${client.embeds.TICKET_OPEN.Description}`.replace('<creationDate>', `<t:${Math.round(channel.createdTimestamp / 1000)}:R>`))
            .setFooter({text: `${client.embeds.TICKET_OPEN.Footer}`.replace('<botName>', client.user.username)})
            .setTimestamp(client.embeds.TICKET_OPEN.Timestamp)
            .setColor(`${client.config.EMBEDCOLOR}`)
                


        channel.send({content: `<@!${memberID}> | ${tagRoles}`,embeds: [welcome],components: [row]})

            await interaction.editReply({embeds: [new MessageEmbed().setColor("GREEN").setDescription(`${client.embeds.TICKET.TICKET_CREATED}`.replace('<channel>', `<#${channel.id}>`))], ephemeral: true})
        })

}
})