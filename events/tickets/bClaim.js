const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const client = require('../../index')

client.on("interactionCreate", async (interaction) => {
    if(interaction.isButton()) {
        if(interaction.customId == "Ticket-Claimed") {
            interaction.deferUpdate();

            const adminrole = client.config.TICKETS.ADMIN_ROLE;
            const ticketaccess = client.config.TICKETS.SUPPORT_ROLE;

            if(!interaction.member.roles.cache.has(ticketaccess)) {
                return;
            }

            let idmiembro = interaction.channel.topic;
            interaction.channel.permissionOverwrites.set([
                {
                    id: interaction.message.guild.id,
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: idmiembro,
                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ADD_REACTIONS", "ATTACH_FILES", "EMBED_LINKS"]
                },
                {
                    id: interaction.member.id,
                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ADD_REACTIONS", "ATTACH_FILES", "EMBED_LINKS", "MANAGE_MESSAGES"],
                },
                {
                    id: adminrole,
                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ADD_REACTIONS", "ATTACH_FILES", "EMBED_LINKS", "MANAGE_MESSAGES"],
                }
            ])
            const row = new MessageActionRow().addComponents(
                new MessageButton().setStyle(client.buttons.TICKETS_GENERAL_BUTTONS.Close.Style).setLabel(client.buttons.TICKETS_GENERAL_BUTTONS.Close.Label).setEmoji(client.buttons.TICKETS_GENERAL_BUTTONS.Close.Emoji).setCustomId("Ticket-Open-Close"),
                new MessageButton().setStyle(client.buttons.TICKETS_GENERAL_BUTTONS.Claim.Style).setLabel(client.buttons.TICKETS_GENERAL_BUTTONS.Claim.Label).setEmoji(client.buttons.TICKETS_GENERAL_BUTTONS.Claim.Emoji).setCustomId("Ticket-Claimed").setDisabled(true))
            interaction.message.edit({
                components: [row]
            })
            const embed = new MessageEmbed()
                .setDescription(`${client.embeds.TICKET.TICKET_CLAIMED}`.replace("<user>", `${interaction.member.user.tag} | <@${interaction.member.user.id}>`))
                .setColor(`${client.config.EMBEDCOLOR}`);
            interaction.message.channel.send({embeds: [embed]})
    }
    }
})