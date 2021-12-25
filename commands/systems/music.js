const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const { music_disabled, system_embed_colour } = require("../../structures/config");

module.exports = {
  name: "music",
  description: "Complete music system.",
  usage: "/music",
  options: [
    {
      name: "play",
      description: "Play a song.",
      type: "SUB_COMMAND",
      options: [
        {
          name: "query",
          description: "Provide a name or url for the song",
          type: "STRING",
          required: true,
        },
      ],
    },
    {
      name: "volume",
      description: "Alter the volume.",
      type: "SUB_COMMAND",
      options: [
        {
          name: "percent",
          description: "10 = 10%",
          type: "NUMBER",
          required: true,
        },
      ],
    },
    {
      name: "settings",
      description: "Select an option.",
      type: "SUB_COMMAND",
      options: [
        {
          name: "options",
          description: "Select an option.",
          type: "STRING",
          required: true,
          choices: [
            { name: "🔢 View Queue", value: "queue" },
            { name: "⏭ Skip Song", value: "skip" },
            { name: "⏸ Pause Song", value: "pause" },
            { name: "▶️ Resume Song", value: "resume" },
            { name: "⏹ Stop Music", value: "stop" },
            { name: "🔀 Shuffle Queue", value: "shuffle" },
            { name: "🔃 Toggle Autoplay Mode", value: "AutoPlay" },
            { name: "🈁 Add a Related Song", value: "RelatedSong" },
            { name: "🔁 Toggle Repeat Mode", value: "RepeatMode" },
          ],
        },
      ],
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if(music_disabled) {return interaction.reply({embeds: [new MessageEmbed().setColor("DARK_RED").setTitle("**Command Disabled** ❌")], ephemeral: true})};
    
    const { options, member, guild, channel } = interaction;
    const VoiceChannel = member.voice.channel;

    if (!VoiceChannel)
      return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setTitle("You must be in a voice channel to be able to use music commands.")], ephemeral: true});
    if(guild.me.voice.channelId &&VoiceChannel.id !== guild.me.voice.channelId)
      return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setTitle(`I'm already playing music in <#${guild.me.voice.channelId}>,`)], ephemeral: true});

    try {
      switch (options.getSubcommand()) {
        case "play": {
          client.distube.playVoiceChannel(VoiceChannel, options.getString("query"), { textChannel: channel, member: member });
          return interaction.reply({embeds: [new MessageEmbed().setColor(system_embed_colour).setTitle("🎼 Request recieved.")]});
        }
        case "volume": {
            const Volume = options.getNumber("percent");
            if(Volume > 100 || Volume < 1)
            return interaction.reply({embeds: [new MessageEmbed().setColor(system_embed_colour).setTitle("You have to specify a number between 1 and 100.")], ephemeral: true});

            client.distube.setVolume(VoiceChannel, Volume);
            return interaction.reply({embeds: [new MessageEmbed().setColor(system_embed_colour).setTitle(`📶 Volume has been set to \`${Volume}%\``)]});
        }
        case "settings": {
            const queue = await client.distube.getQueue(VoiceChannel);

            if(!queue)
            return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setTitle("❌ There is no queue.")]});

            switch(options.getString("options")) {
                case "skip" :
                    await queue.skip(VoiceChannel);
                    return interaction.reply({embeds: [new MessageEmbed().setColor(system_embed_colour).setDescription("⏭ Song has been skipped.")]});

                case "stop":
                    await queue.stop(VoiceChannel);
                    return interaction.reply({embeds: [new MessageEmbed().setColor(system_embed_colour).setDescription("⏹ Music has been stopped.")]});

                case "pause":
                    await queue.pause(VoiceChannel);
                    return interaction.reply({embeds: [new MessageEmbed().setColor(system_embed_colour).setDescription("⏸ Song has been paused.")]});

                case "resume":
                    await queue.resume(VoiceChannel);
                    return interaction.reply({embeds: [new MessageEmbed().setColor(system_embed_colour).setDescription("▶️ Song has been resumed.")]});

                case "shuffle":
                  await queue.shuffle(VoiceChannel);
                  return interaction.reply({embeds: [new MessageEmbed().setColor(system_embed_colour).setDescription("🔀 Queue has been shuffled.")]});
                
                case "AutoPlay":
                  let Mode = await queue.toggleAutoplay(VoiceChannel);
                  return interaction.reply({embeds: [new MessageEmbed().setColor(system_embed_colour).setDescription(`🔃 AutoPlay Mode has been set to: ${Mode ? "On" : "Off"}`)]});
                  
                case "RelatedSong":
                  await queue.addRelatedSong(VoiceChannel);
                  return interaction.reply({embeds: [new MessageEmbed().setColor(system_embed_colour).setDescription("🈁 Related Song has been added to the queue")]});

                case "RepeatMode":
                  let Mode2 = await client.distube.setRepeatMode(queue);
                  return interaction.reply({embeds: [new MessageEmbed().setColor(system_embed_colour).setDescription(`🔁 Repeat Mode has been set to: ${Mode2 = Mode2 ? Mode2 == 2 ? "Queue": "Song" : "Off"}`)]});

                case "queue":
                    return interaction.reply({embeds: [new MessageEmbed().setColor(system_embed_colour).setTitle("__Queue__").setDescription(`${queue.songs.slice(0, 10).map((song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)}`)]});      
            }
            return;
        }
      }
    } catch (e) {
      interaction.reply({embeds: [new MessageEmbed().setColor("RED").setTitle("Error! ❌").setDescription(`${e}`)], ephemeral: true,
      });
    }
  },
};
