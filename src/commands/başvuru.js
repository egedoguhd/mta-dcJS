const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
  name: "başvuru",
  description: "Admin başvurusu için gerekli yerleri doldurunuz.",
  options: [
    {
      type: 1,
      name: "admin",
      description: "Admin başvurusu için gerekli yerleri doldurunuz.",
    }
  ],
  
  async execute(client, interaction, config, db) {
    await interaction.deferReply();
    
    const { user, options, guild } = interaction;
    
    const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('basvuru')
					.setLabel('Başvuru yap')
          .setEmoji("🎫")
					.setStyle(ButtonStyle.Primary),
			);
    
    const embed = new EmbedBuilder()
      .setColor(config.color || 0x2F3136)
      .setAuthor({ name: `Admin Başvuru`, iconURL: `${guild.iconURL()} ` })
      .setDescription("🎫 **|** Başvuru yapmak için aşağıdaki butona bas.")
      .setTimestamp()
      .setFooter({ text: `${user.tag} tarafından oluşturuldu.`, iconURL: `${user.displayAvatarURL()} ` })
      
    interaction.followUp({ embeds: [embed], components: [row] })
  }
}