const { Client, Message, MessageEmbed,  MessageButton, MessageActionRow, CommandInteraction } = require('discord.js');
const { ticket_panel_colour, ticket_panel_disabled, admin_embed_colour } = require('../../structures/config');

module.exports = {
    name: 'ticket-panel',
    description: "Creates a ticket.",
    permission: "ADMINISTRATOR",
    usage: "/ticket-panel",
  /**
   * 
   * @param {CommandInteraction} interaction 
   * @param {Client} client 
   * @param {Message} message 
   */
    async execute(interaction, client, message) {
        if(ticket_panel_disabled) {return interaction.reply({embeds: [new MessageEmbed().setColor("DARK_RED").setTitle("**Command Disabled** ❌")], ephemeral: true})};
        
        const guild = interaction.guild;

        const embed = new MessageEmbed()
            .setColor(ticket_panel_colour)
            .setAuthor(interaction.guild.name, interaction.guild.iconURL({
                dynamic: true
            }))
            .setDescription(
                "__**How to make a ticket**__\n" +


                "> Click on the reaction that relates to your need\n" +

                "> Once the ticket is made you will be able to type in there"

            )
            .setTitle('Tickets')


        const bt = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('tic')
                .setLabel('🎫 Create Ticket!')
                .setStyle('PRIMARY'),
            );

        interaction.channel.send({embeds: [embed], components: [bt]});
        interaction.reply({embeds: [new MessageEmbed().setColor(admin_embed_colour).setDescription("The ticket panel has been sent. ✅")], ephemeral: true})
    }
}