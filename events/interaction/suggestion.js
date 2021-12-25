const { ButtonInteraction, MessageEmbed } = require("discord.js");
const DB = require("../../structures/schemas/suggestDB");

module.exports = {
    name:"interactionCreate",
    /**
     * 
     * @param {ButtonInteraction} interaction
     */
    async execute(interaction) {
        if(!interaction.isButton()) return;
        if(!interaction.member.permissions.has("ADMINISTRATOR"))
        return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription("You can't use this button! ❌")], ephemeral: true})
        if (interaction.customId === 'suggest-accept' || interaction.customId === 'suggest-decline') {
        const { guildId, customId, message } = interaction;

        DB.findOne({GuildID: guildId, MessageID: message.id}, async(err, data) => {
            if(err) throw err;
            if(!data) return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription("No content was found in the database! ❌")], ephemeral: true})

            const Embed = message.embeds[0];
            if(!Embed) return;

            switch(customId) {
                case "suggest-accept": {
                    Embed.fields[2] = {name: "Status", value: "Accepted", inline: true};
                    message.edit({embeds: [Embed.setColor("GREEN")], components: []});
                    return interaction.reply({embeds: [new MessageEmbed().setColor("GREEN").setDescription("Suggestion accepted ✅")], ephemeral: true})
                }
                break;
                case "suggest-decline": {
                    Embed.fields[2] = {name: "Status", value: "Declined", inline: true};
                    message.edit({embeds: [Embed.setColor("RED")], components: []});
                    return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription("Suggestion declined ✅")], ephemeral: true})
                }
                break;
            }
        })
     }
    }
}