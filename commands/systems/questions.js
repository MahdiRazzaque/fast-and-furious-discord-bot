const { CommandInteraction } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { questions_disabled, system_embed_colour } = require("../../structures/config");

module.exports = {
  name: "questions",
  description: "Sends questions for the recruit to answer. (Gatekeeper only)",
  usage: "/questions",
  /**
   *
   * @param {CommandInteraction} interaction
   */
  execute(interaction) {
    if (questions_disabled) {return interaction.reply({embeds: [new MessageEmbed().setColor("DARK_RED").setTitle("**Command Disabled** ❌")], ephemeral: true})};
    if (!interaction.member.roles.cache.has("884098596453122108")) {return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription("Sorry you need <@&884098596453122108> to use this command. ❌")], ephemeral: true});}
      
    interaction.channel.send({embeds: [new MessageEmbed().setColor(system_embed_colour).setTitle("**Welcome to Fast & Furious**").setDescription("__**Please answer the following questions:**__ \n \n> 1) Where are you located?\n> 2) What war army strategies do you know?\n> 3) How would you attack a base during a mismatch in war? \n \nOnce you've done that please send screenshots of your base and profile.")]});
    interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription("Questions for the recruiter to answer have been sent. ✅")], ephemeral: true});
  },
};
