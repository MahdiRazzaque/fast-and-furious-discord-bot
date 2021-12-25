const {
  Client,
  CommandInteraction,
  MessageEmbed,
  Guild,
} = require("discord.js");
const {
  kick_disabled,
  moderation_embed_colour,
} = require("../../structures/config");

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

module.exports = {
  name: "kick",
  description: "Used to kick a target",
  usage: "/kick",
  permission: "KICK_MEMBERS",
  options: [
    {
      name: "target",
      description: "Select a target to kick ",
      type: "USER",
      required: true,
    },
    {
      name: "reason",
      description: "Provide a reason to kick that member",
      type: "STRING",
      required: true,
    },
  ],
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    if (kick_disabled) {return interaction.reply({embeds: [new MessageEmbed().setColor("DARK_RED").setTitle("**Command Disabled** ❌")], ephemeral: true})};
      
    const { options } = interaction;
    const Target = options.getMember("target");
    const Reason = options.getString("reason");
    const guild = interaction.guild;

    const success = new MessageEmbed()
      .setColor(moderation_embed_colour)
      .addFields(
        { name: "Member kicked", value: `${Target}` },
        { name: "Reason", value: `${Reason}` },
        { name: "Kicked by", value: `${interaction.member.user}` }
      )
      .setAuthor(Target.user.tag, Target.user.avatarURL({ dynamic: true, size: 512 }))
      .setThumbnail(Target.user.avatarURL({ dynamic: true, size: 512 }));

    if (Target.id === interaction.member.id)
      return interaction.reply({embeds: [new MessageEmbed().setColor(moderation_embed_colour).setTitle("❌ Error ❌").setDescription("🙄 You can't kick yourself")], ephemeral: true});

    if (Target.permissions.has("ADMINISTRATOR"))
      return interaction.reply({embeds: [new MessageEmbed().setColor(moderation_embed_colour).setTitle("❌ Error ❌").setDescription("🙄 You can't kick an Admin")], ephemeral: true});

    if (Target.permissions.has("MANAGE_GUILD"))
      return interaction.reply({embeds: [new MessageEmbed().setColor(moderation_embed_colour).setTitle("❌ Error ❌").setDescription("🙄 You can't kick an Moderator")], ephemeral: true});

    Target.send({embeds: [new MessageEmbed().setColor(moderation_embed_colour).setTitle(`👮 You've been kicked From ${interaction.guild.name}!`).addFields({name: "Reason", value: Reason}, {name: "Kicked by", value: interaction.member.user.tag})]})

    delay(1000).then(() => Target.kick({ reason: Reason }));

    interaction.reply({ embeds: [success] });

    const guild_logs = client.channels.cache.get(guild_logs_id);
    guild_logs.send({ embeds: [success] });
  },
};
