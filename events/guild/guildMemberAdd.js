const { Client, MessageEmbed } = require("discord.js");
const {
  guild_log_colour,
  guild_logs_id,
  guildMemberAdd_logging,
  guild_welcome_message,
} = require("../../structures/config");

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

module.exports = {
  name: "guildMemberAdd",
  /**
   * @param {Client} client
   * @param {guildMember} member
   */
  execute(member, client) {
    if (guild_welcome_message) {
      const { user, guild } = member;

      member.roles.add("884051641253367839");

      const welcomeMessage = new MessageEmbed()
        .setColor("AQUA")
        .setTitle("**Welcome to Fast & Furious**")
        .setDescription("> Welcome to the recruitment process to join the Fast & Furious clan.\n \n> The interview process will begin once a <@&884098596453122108> creates an interview channel with you.")
        .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
        .setFooter(`ID: ${user.id}`);

      let channel =
        member.guild.channels.cache.find(
          (val) => val.name === "883850319124135956"
        ) || member.guild.channels.cache.get("883850319124135956");

      delay(1000)
      .then(() => channel.send({ embeds: [welcomeMessage] }))
        .then(() => channel.send(`${member.user} <@&884098596453122108>`));
    }

    if (guildMemberAdd_logging) {
      const { user, guild } = member;

      const Log = new MessageEmbed()
        .setColor(guild_log_colour)
        .setTitle("__Member Joined__🐣")
        .setDescription(`${user} joined the server.`)
        .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
        .addField("ID", `${user.id}`)
        .addField(
          "Discord User since",
          `<t:${parseInt(user.createdTimestamp / 1000)}:R>`,
          true
        )
        .setTimestamp();

      const guild_logs = client.channels.cache
        .get(guild_logs_id)
        .send({ embeds: [Log] });
    }
  },
};
