const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
  name: "destek",
  description: "ticket sistemini oluşturur.",
  options: [],
  
  async execute(client, interaction, config, db) {
    await interaction.deferReply();
    
    const { user, options, guild } = interaction;
    
    const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('sikayet')
          .setEmoji("⚠️")
					.setLabel('Oyuncu Şikayeti')
					.setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
					.setCustomId('birlik')
          .setEmoji("💂")
					.setLabel('Birlik Talebi')
					.setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
					.setCustomId('inter')
          .setEmoji("🏠")
					.setLabel('Interior Talebi')
					.setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
					.setCustomId('diger')
          .setEmoji("💠")
					.setLabel('Diğer')
					.setStyle(ButtonStyle.Secondary),
			);
    
    const embed = new EmbedBuilder()
      .setColor(config.color || 0x2F3136)
      .setAuthor({ name: `Destek Oluştur`, iconURL: `${guild.iconURL()} ` })
      .setDescription("🎫 **|** Desteğe ihtiyacın varsa aşağıdaki ilgili butona basabilirsin.")
      .setTimestamp()
      .setFooter({ text: `${user.tag} tarafından oluşturuldu.`, iconURL: `${user.displayAvatarURL()} ` })
      
    interaction.followUp({ embeds: [embed], components: [row] })
    
  }
}