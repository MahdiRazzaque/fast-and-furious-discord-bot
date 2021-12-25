const { MessageActionRow, MessageButton,  MessageEmbed, Message } = require('discord.js');
const client = require("../../structures/bot");// Make sure this path is correct
const { admin_embed_colour, ticket_embed_colour } = require('../../structures/config');


module.exports = {
    name: "interactionCreate",
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    async execute(interaction, message) {
        if (interaction.isButton()) {
            if (interaction.customId === 'tic') {
            
                let nameOfChannel = "ticket-" + interaction.user.id.toLowerCase();
                let ticketChannel = (interaction.guild.channels.cache.find(c => c.name.toLowerCase() === nameOfChannel))

                if (ticketChannel) {
                    return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`You have already created a ticket. \n Please use ${ticketChannel}`)], ephemeral: true})
                }

                interaction.guild.channels.create(`ticket-${interaction.user.id}`, {
                    permissionOverwrites: [
                        {
                            id: interaction.user.id,
                            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                        },
                        {
                            id: interaction.guild.roles.everyone,
                            deny: ['VIEW_CHANNEL']
                        },
                        {
                            id: '883849090083979265',
                            allow: ['SEND_MESSAGES','VIEW_CHANNEL','MANAGE_MESSAGES','MANAGE_CHANNELS']
                        },
                        {
                            id: '884098596453122108',
                            allow: ['SEND_MESSAGES','VIEW_CHANNEL','MANAGE_MESSAGES','MANAGE_CHANNELS']
                        }
                    ],
                    type : 'text', parent: '911695616281833522'})
                    .then(async channel => {
                    channel.send({content: `Welcome <@${interaction.user.id}>`,embeds: [embed],components: [del]})})
                    .then(interaction.reply({embeds: [new MessageEmbed().setColor(ticket_embed_colour).setDescription("Your ticket has been created.")], ephemeral: true}))
                    
                const embed = new MessageEmbed()
                    .setTitle('Ticket')
                    .setDescription('Hello there, \n The staff will be here as soon as possible  meanwhile tell us about your issue!\nThank You!')
                    .setColor(ticket_embed_colour)
                    .setTimestamp()

                const del = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setCustomId('del')
                        .setLabel('🗑️ Delete Ticket!')
                        .setStyle('DANGER'),
                    );
                
                interaction.user.send({embeds: [new MessageEmbed().setColor(ticket_embed_colour).setDescription(`Your ticket was created in **${interaction.guild.name}**`)]});
        
        } else if (interaction.customId === 'del') {
            const thread = interaction.channel
            thread.delete();
            }
        }
    }
}
