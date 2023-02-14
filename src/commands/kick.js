const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  name: "kickleme",
  description: "etiketlenen kullanıcıyı sunucudan atar.",
  options: [
    {
      type: 6,
      name: "kullanıcı",
      description: "Hangi kullanıcıyı atmak istiyorsun?",
      required: true
    }
  ],
  
  async execute(client, interaction, config, db) {
    await interaction.deferReply();
    
    const { user, options, guild } = interaction;
    
    const member = options.getMember("kullanıcı");
    
    if(interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
      
      if(member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
        return interaction.followUp({ embeds: [
        new EmbedBuilder().setColor(0x2F3136).setAuthor({ name: `${user.tag}`, iconURL: `${user.displayAvatarURL()} ` }).setDescription("<:carpi:1040649840394260510> **|** Bu komutu `Üyeleri At` yetkisine sahip kullanıclara karşı kullanamazsın.")
     ]})
      };
        
      if(member.user.id.includes(client.user.id)) {
        return interaction.followUp({ embeds: [
        new EmbedBuilder().setColor(0x2F3136).setAuthor({ name: `${user.tag}`, iconURL: `${user.displayAvatarURL()} ` }).setDescription("<:carpi:1040649840394260510> **|** Bu komutu `RomanBot`'a karşı kullanamazsın.")
     ]});
      }
      
      const embed = new EmbedBuilder()
        .setColor(0x2F3136)
        .setAuthor({ name: `Bir kullanıcı atıldı.`, iconURL: `${guild.iconURL()} ` })
        .addFields([
          {
            name: "Atılan:",
            value: "```"+member.user.tag+"```",
            inline: true
          },
          {
            name: "Atan:",
            value: "```"+user.tag+"```",
            inline: true
          },
        ])
        .setTimestamp()
        .setFooter({ text: `${user.tag} tarafından atıldı.`, iconURL: `${user.displayAvatarURL()} ` })
      
      member.kick()
      return interaction.followUp({ embeds: [embed] })
      
    } else {
      return interaction.followUp({ embeds: [
        new EmbedBuilder().setColor(0x2F3136).setAuthor({ name: `${user.tag}`, iconURL: `${user.displayAvatarURL()} ` }).setDescription("<:carpi:1040649840394260510> **|** Bu komut sadece `Üyeleri At` yetkisine sahip kullanıclarına özel kullanımdadır.")
     ] }) 
    }
  }
}