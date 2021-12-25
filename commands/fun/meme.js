const { CommandInteraction, MessageEmbed, Message } = require("discord.js");
const got = require("got");
const { meme_disabled, fun_embed_colour } = require("../../structures/config");

module.exports = {
  name: "meme",
  description: "Get some memes",
  usage: "/meme",
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Message} message
   */
  async execute(interaction, message) {
    if (meme_disabled) {return interaction.reply({embeds: [new MessageEmbed().setColor("DARK_RED").setTitle("**Command Disabled** ❌")], ephemeral: true})};
    if (interaction.member.roles.cache.has("884051641253367839")) {return interaction.reply({embeds: [new MessageEmbed().setColor("DARK_RED").setDescription("Sorry you need to become a member of the clan before you can use commands. ❌")], ephemeral: true})};
    
    got("https://www.reddit.com/r/memes/random/.json").then((response) => {
        const [list] = JSON.parse(response.body);
        const [post] = list.data.children;

        const permalink = post.data.permalink;
        const memeUrl = `https://reddit.com${permalink}`;
        const memeImage = post.data.url;
        const memeTitle = post.data.title;
        const memeUpvotes = post.data.ups;
        const memeNumComments = post.data.num_comments;

        const meme = new MessageEmbed()
          .setTitle(`${memeTitle}`)
          .setURL(`${memeUrl}`)
          .setColor(fun_embed_colour)
          .setImage(memeImage)
          .setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);

        interaction.reply({ embeds: [meme] });
      })
      .catch(console.error);
  },
};
