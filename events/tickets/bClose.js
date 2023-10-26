const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");
const client = require("../../index");

client.on("interactionCreate", async (interaction) => {
    if(interaction.isButton()){
        if(interaction.customId === "Ticket-Open-Close") {

            const idmiembro = interaction.channel.topic;
            let user = client.users.cache.get(idmiembro)

            interaction.deferUpdate();
       
        const embed = new MessageEmbed()
            .setDescription(client.embeds.TICKET.WHAT_DO_YOU_WANT)
            .setColor(client.config.EMBEDCOLOR)
        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setLabel(client.buttons.TICKETS_GENERAL_BUTTONS.Transcript.Label)
                .setStyle(client.buttons.TICKETS_GENERAL_BUTTONS.Transcript.Style)
                .setEmoji(client.buttons.TICKETS_GENERAL_BUTTONS.Transcript.Emoji)
                .setCustomId("Ticket-Transcript"),
            new MessageButton()
                .setLabel(client.buttons.TICKETS_GENERAL_BUTTONS.Re_Open.Label)
                .setStyle(client.buttons.TICKETS_GENERAL_BUTTONS.Re_Open.Style)
                .setEmoji(client.buttons.TICKETS_GENERAL_BUTTONS.Re_Open.Emoji)
                .setCustomId("Ticket-Open"),
            new MessageButton()
                .setLabel(client.buttons.TICKETS_GENERAL_BUTTONS.Delete.Label)
                .setStyle(client.buttons.TICKETS_GENERAL_BUTTONS.Delete.Style)
                .setEmoji(client.buttons.TICKETS_GENERAL_BUTTONS.Delete.Emoji)
                .setCustomId("Ticket-Delete")
        )
        const embed2 = new MessageEmbed()
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
    }
}
});