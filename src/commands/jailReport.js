const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
  name: "jail",
  description: "Sunucuda kural ihlali yapanları jail ile loglarsınız.",
  options: [
    {
      type: 1,
      name: "report",
      description: "Sunucuda kural ihlali yapanları jail ile loglarsınız.",
      options: [
        {
          type: 3,
          name: "isim",
          description: "Oyun içi ismini giriniz.",
          required: true
        },
        {
          type: 3,
          name: "sebep",
          description: "Sebebi giriniz.",
          required: true
        },
        {
          type: 3,
          name: "süre",
          description: "Süreyi giriniz.",
          required: true
        },
        {
          type: 11,
          name: "kanıt",
          description: "Kanıtı giriniz.",
          required: true
        },
      ]
    }
  ],
  
  async execute(client, interaction, config, db) {
    await interaction.deferReply();
    
    const { user, options, guild } = interaction;
    const isim = options.getString("isim");
    const sebep = options.getString("sebep");
    const süre = options.getString("süre");
    const kanıt = options.getAttachment("kanıt");
    
    const logChannel = await interaction.guild.channels.cache.get(config.guild.jail);
  
    const embed = new EmbedBuilder()
      .setColor(config.color || 0x2F3136)
      .setAuthor({ name: `Bir kullanıcı hapisleniyor.`, iconURL: `${guild.iconURL()} ` })
      .setImage(kanıt.url)
      .addFields([
          {
            name: "İsim:",
            value: "```"+isim+"```",
            inline: true
          },
          {
            name: "Sebep:",
            value: "```"+sebep+"```",
            inline: true
          },
          {
            name: "Süre:",
            value: "```"+süre+"```",
            inline: true
          },
          {
            name: "Kanıt:",
            value: "```"+kanıt.url+"```",
            inline: true
          },
        ])
      .setTimestamp()
      .setFooter({ text: `${user.tag} tarafından hapisleniyor.`, iconURL: `${user.displayAvatarURL()} ` })
        
      interaction.followUp({ embeds: [{description: "✅ **|** Kullanıcıyı başarıyla reportladınız.", color: 0x2F3136 }] })
      if(kanıt.url.endsWith(".mp4")) {
        logChannel.send({ embeds: [embed] })
        logChannel.send({ files: [kanıt] })
      } else {
        logChannel.send({ embeds: [embed] })
      }
    
      
    
  }
}