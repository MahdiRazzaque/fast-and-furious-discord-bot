const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { ping_disabled } = require("../../structures/config");

module.exports = {
  name: "ping",
  description: "Sends the bot's ping.",
  usage: "/ping",
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction, client) {
    if (ping_disabled) {return interaction.reply({embeds: [new MessageEmbed().setColor("DARK_RED").setTitle("**Command Disabled** ❌")], ephemeral: true})};
    if (interaction.member.roles.cache.has("884051641253367839")) {return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription("Sorry you need to become a member of the clan before you can use commands. ❌")], ephemeral: true})};

    //await interaction.reply({ content: "Loading data" });
    interaction.channel.send("ㅤ").then(async (resultMessage) => {
      const ping = resultMessage.createdTimestamp - interaction.createdTimestamp;
      const response = new MessageEmbed()
        .setColor("AQUA")
        .setTitle("🏓 PONG!")
        .addFields(
          { name: "Ping", value: `${ping}ms` },
          { name: "API Latency", value: `${Math.round(client.ws.ping)}ms` }
        );
      await interaction.followUp({ embeds: [response] });
      resultMessage.delete();
    });
  },
};
