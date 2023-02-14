const { EmbedBuilder, Colors } = require("discord.js");
const gamedig = require("gamedig");

module.exports = {
  name: "sunucu",
  description: "MTA sunucunuzun genel bilgilerini sizlere gösterir.",
  options: [
    {
      type: 1,
      name: "bilgi",
      description: "MTA sunucunuzun genel bilgilerini sizlere gösterir."
    }
  ],
  
  async execute(client, interaction, config, db) {
    await interaction.deferReply();
    
    const { user, options, guild } = interaction;
    const server = config.server;
    
    const mtasa = await gamedig.query({
      type: "mtasa",
      host: server.ip || "94.23.68.73",
      port: server.port || "22003",
    });
    
    const embed = new EmbedBuilder()
    .setColor(config.color || 0x2F3136)
    .setAuthor({ name: `${mtasa.name}`, iconURL: `${guild.iconURL()} ` })
    .addFields([
      {
        name: "Harita:",
        value: "```"+mtasa.map+"```",
        inline: true
      },
      {
        name: "Oyun tipi:",
        value: "```"+mtasa.raw.gametype+"```",
        inline: true
      },
      {
        name: "Geliştirici:",
        value: "```"+mtasa.raw.Developer+"```",
        inline: true
      },
      {
        name: "Oyuncular:",
        value: "```"+mtasa.raw.numplayers+"/"+mtasa.maxplayers+"```",
        inline: true
      },
      {
        name: "Ping:",
        value: "```"+mtasa.ping+"ms```",
        inline: true
      },  
      {
        name: "IP adresi:",
        value: "```"+mtasa.connect+"```",
        inline: true
      }
    ])
    .setTimestamp()
    .setFooter({ text: `${user.tag} tarafından istendi.`, iconURL: `${user.displayAvatarURL()} ` })
    
    interaction.followUp({ embeds: [embed] })
  }
}