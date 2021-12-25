const { CommandInteraction } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const {
  reactionrole_country_disabled,
  reaction_role_embed_colour,
  admin_embed_colour,
} = require("../../structures/config");

const reactionRoleCountries = new MessageEmbed()
  .setTitle("**Please pick your continent role:**")
  .setDescription(
    "<:northamerica:884044909202530344> - North America \n<:southamerica:884044909424828426> - South America\n <:europe:884044909122830336> - Europe \n<:asia:884039823587954738> - Asia \n<:africa:884039822371598367> - Africa \n<:oceania:884039824045125662> - Oceania"
  )
  .setColor(reaction_role_embed_colour);

module.exports = {
  name: "reactionrole-countries",
  description: "Sends reaction role embed for countries.",
  usage: "/reactionrole-countries",
  permission: "ADMINISTRATOR",
  /**
   *
   * @param {CommandInteraction} interaction
   */
  execute(interaction) {
    if (reactionrole_country_disabled) {return interaction.reply({embeds: [new MessageEmbed().setColor("DARK_RED").setTitle("**Command Disabled** ❌")], ephemeral: true})};
    
    interaction.channel.send({ embeds: [reactionRoleCountries] });
    interaction.reply({embeds: [new MessageEmbed().setColor(admin_embed_colour).setDescription("A reaction role embed for countries has been sent! ✅")], ephemeral: true});
  },
};
