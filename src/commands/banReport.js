const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
  name: "banlama",
  description: "Sunucuda kural ihlali yapanları ban ile loglarsınız.",
  options: [
    {
      type: 1,
      name: "report",
      description: "Sunucuda kural ihlali yapanları ban ile loglarsınız.",
    }
  ],
  
  async execute(client, interaction, config, db) {
    await interaction.deferReply();
    
    const { user, options, guild } = interaction;
    
    const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('ban')
					.setLabel('Doğrula')
          .setEmoji("🧑‍🤝‍🧑")
					.setStyle(ButtonStyle.Primary),
			);
    
    const embed = new EmbedBuilder()
      .setColor(config.color || 0x2F3136)
      .setAuthor({ name: `Kimi banlıyacaksın?`, iconURL: `${guild.iconURL()} ` })
      .setDescription("🔨 **|** Banlayacığın kişiyi aşağıdaki butona tıklayarak doğrula.")
      .setTimestamp()
      .setFooter({ text: `${user.tag} tarafından banlanıyor.`, iconURL: `${user.displayAvatarURL()} ` })
      
    interaction.followUp({ embeds: [embed], components: [row] })
  }
}