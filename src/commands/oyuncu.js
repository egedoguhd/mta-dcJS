const gamedig = require("gamedig");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
  name: "oyuncu",
  description: "MTA:SA sunucunuzda oyuncuların bilgilerine erişirsin.",
  options: [
    {
      type: 1,
      name: "ara",
      description: "MTA:SA sunucunuzda oyuncuların bilgilerine erişirsin.",
      options: [
        {
          type: 3,
          name: "isim",
          description: "Oyun için ismi nedir?",
          required: true
        }
      ]
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
    
    const player = mtasa.players.find(player => player.name === options.getString("isim"));
    if(!player) {
       return interaction.followUp({ embeds: [
        new EmbedBuilder().setColor(config.color || 0x2F3136).setAuthor({ name: `${user.tag}`, iconURL: `${user.displayAvatarURL()} ` }).setDescription(":x: **|** Bu kullanıcı şuanda oyna değil.")
     ]});
    }
    
    const { name, raw } = player;
    const { team, skin, score, ping, time } = raw;
    
    console.log(team)
    
    const takım = !team.lenght ? "Bulunmuyor" : team;
    const cild = !skin.lenght ? "Bulunmuyor" : skin;
    const scoree = score.lenght ? "Bulunmuyor" : score;
    const gec = ping.lenght ? "0ms" : ping+"ms";
    const zaman = !team.lenght ? "N/A" : time;
    
    
     const embed = new EmbedBuilder()
      .setColor(config.color || 0x2F3136)
      .setAuthor({ name: `Bir kullanıcı inceleniyor.`, iconURL: `${guild.iconURL()} ` })
      .addFields([
          {
            name: "İsim:",
            value: "```"+name+"```",
            inline: true
          },
          {
            name: "Takım:",
            value: "```"+takım+"```",
            inline: true
          },
          {
            name: "Skin:",
            value: "```"+cild+"```",
            inline: true
          },
          {
            name: "Score:",
            value: "```"+scoree+"```",
            inline: true
          },
          {
            name: "Ping:",
            value: "```"+gec+"```",
            inline: true
          },
          {
            name: "Time:",
            value: "```"+zaman+"```",
            inline: true
          },
        ])
      .setTimestamp()
      .setFooter({ text: `${user.tag} tarafından inceleniyor.`, iconURL: `${user.displayAvatarURL()} ` })
     
     return interaction.followUp({ embeds: [embed] })
  }
}