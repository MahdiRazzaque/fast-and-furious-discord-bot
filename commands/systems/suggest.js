const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const DB = require("../../structures/schemas/suggestDB")
const { suggest_disabled, system_embed_colour } = require("../../structures/config");

module.exports = {
  name: "suggest",
  description: "Create a suggestion.",
  usage: "/suggest",
  options: [
    {
      name: "type",
      description: "Select a type.",
      required: true,
      type: "STRING",
      choices: [
        {
          name: "Command",
          value: "Command",
        },
        {
          name: "Event",
          value: "Event",
        },
        {
          name: "System",
          value: "System",
        },
        {
          name: "Other",
          value: "Other",
        },
      ],
    },
    {
      name: "suggestion",
      description: "Describe your suggestion.",
      type: "STRING",
      required: true,
    }
  ],
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction, client) {
    if (suggest_disabled) {return interaction.reply({embeds: [new MessageEmbed().setColor("DARK_RED").setTitle("**Command Disabled** ❌")], ephemeral: true})};
    if (interaction.member.roles.cache.has("884051641253367839")) {return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription("Sorry you need to become a member of the clan before you can use commands. ❌")], ephemeral: true})};
    //if (!interaction.channel.id === '887359582886821899') {return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription("You can only use suggest commands in <#887359582886821899> ")], ephemeral: true})};
    
    const { options, guildId, member, user } = interaction;

    const type = options.getString("type");
    const suggestion = options.getString("suggestion");
    

    const Embed = new MessageEmbed()
      .setColor(system_embed_colour)
      .setAuthor(user.tag, user.displayAvatarURL({dynamic: true}))
      .addFields(
        {name: "Suggestion", value: suggestion, inline: false},
        {name: "Type", value: type, inline: true},
        {name: "Status", value: "Pending", inline: true},
      )
      .setTimestamp()

    const buttons = new MessageActionRow()
    buttons.addComponents(
      new MessageButton().setCustomId("suggest-accept").setLabel("✅ Accept").setStyle("PRIMARY"),
      new MessageButton().setCustomId("suggest-decline").setLabel("🛑 Decline").setStyle("SECONDARY")
    )

    try {
      const M = await interaction.reply({embeds: [Embed], components: [buttons], fetchReply: true});
      
      M.react("👍");
      M.react("👎");

      await DB.create({GuildID: guildId, MessageID: M.id, Details: [
        {
          MemberID: member.id,
          Type: type,
          Suggestion: suggestion
        }
      ]})
    } catch (err) {
      console.log(err);
    }
  }
}
