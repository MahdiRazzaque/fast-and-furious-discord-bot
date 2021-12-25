const { CommandInteraction } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const {
  reactionrole_townhall_disabled,
  reaction_role_embed_colour,
  admin_embed_colour,
} = require("../../structures/config");

const reactionRoleTownHall = new MessageEmbed()
  .setTitle("**Please select your Town Hall role:**")
  .setDescription(
    "<:townhall8:884035286206677032> - Town Hall 8 \n<:townhall9:884035287204904960> - Town Hall 9 \n<:townhall10:884035287792091136> - Town Hall 10 \n<:townhall11:884035288077328444> - Town Hall 11 \n<:townhall12:884035287557234698> - Town Hall 12 \n<:townhall13:884035288131833866> - Town Hall 13 \n<:townhall14:884035288245075968> - Town Hall 14"
  )
  .setColor(reaction_role_embed_colour);

module.exports = {
  name: "reactionrole-townhall",
  description: "Sends reaction role embed for town halls.",
  usage: "/reactionrole-townhall",
  permission: "ADMINISTRATOR",
  /**
   *
   * @param {CommandInteraction} interaction
   */
  execute(interaction) {
    if (reactionrole_townhall_disabled) {return interaction.reply({embeds: [new MessageEmbed().setColor("DARK_RED").setTitle("**Command Disabled** ❌")], ephemeral: true})};
    
    interaction.channel.send({ embeds: [reactionRoleTownHall] });
    interaction.reply({embeds: [new MessageEmbed().setColor(admin_embed_colour).setDescription("A reaction role embed for town halls has been sent!")],ephemeral: true});
  },
};
