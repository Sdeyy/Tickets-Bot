const Discord = require("discord.js");
const client = require("../../index");

client.on("interactionCreate", async (interaction) => {

    if(interaction.isButton()){

        const idmiembro = interaction.channel.topic;
        let user = client.users.cache.get(idmiembro);
        const ticketaccess = client.config.TICKETS.SUPPORT_ROLE;
   
    if(interaction.customId === "Ticket-Open") {
        interaction.deferUpdate();
        if(!interaction.member.roles.cache.has(ticketaccess)) {
            return;
        }

        interaction.channel.bulkDelete("2")

        const openmed = new Discord.MessageEmbed()
            .setDescription(`The ticket was reopen by <@!${interaction.member.user.id}>`)
            .setColor("GREEN")
        interaction.channel.send({embeds: [openmed]})
        interaction.channel.permissionOverwrites.edit(idmiembro, { VIEW_CHANNEL: true });

    }
    if(interaction.customId === "Ticket-Delete") {
         interaction.deferUpdate();

         const delembed = new Discord.MessageEmbed()
            .setDescription(`Ticket will be deleted in a seconds...`)
            .setColor("RED")
                interaction.channel.send({embeds: [delembed]})

                setTimeout(async () => {
                  await interaction.channel.delete();
                }, client.config.TICKETS.TICKET_CLOSE_TIME);
    }
}
});
