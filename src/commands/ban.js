const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  name: "ban",
  description: "etiketlenen kullanıcıyı sunucudan uzaklaştırır.",
  options: [
    {
      type: 6,
      name: "kullanıcı",
      description: "Hangi kullanıcıyı uzaklaştırmak istiyorsun?",
      required: true
    },
    {
      type: 3,
      name: "sebep",
      description: "Ne tür sebepten ötürü sunucudan uzaklaştırıyorsun?"
    }
  ],
  
  async execute(client, interaction, config, db) {
    await interaction.deferReply();
    
    const { user, options, guild } = interaction;
    
    const member = options.getMember("kullanıcı");
    const sebep = `${options.getString("sebep") || "Bulunmuyor"} | ${user.tag}`;
    
    if(interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      
      if(member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
        return interaction.followUp({ embeds: [
        new EmbedBuilder().setColor(0x2F3136).setAuthor({ name: `${user.tag}`, iconURL: `${user.displayAvatarURL()} ` }).setDescription("<:carpi:1040649840394260510> **|** Bu komutu `Üyeleri Yasakla` yetkisine sahip kullanıclara karşı kullanamazsın.")
     ]})
      };
        
      if(member.user.id.includes(client.user.id)) {
        return interaction.followUp({ embeds: [
        new EmbedBuilder().setColor(0x2F3136).setAuthor({ name: `${user.tag}`, iconURL: `${user.displayAvatarURL()} ` }).setDescription("<:carpi:1040649840394260510> **|** Bu komutu `RomanBot`'a karşı kullanamazsın.")
     ]});
      }
      
      const embed = new EmbedBuilder()
        .setColor(0x2F3136)
        .setAuthor({ name: `Bir kullanıcı banlandı.`, iconURL: `${guild.iconURL()} ` })
        .addFields([
          {
            name: "Banlanan:",
            value: "```"+member.user.tag+"```",
            inline: true
          },
          {
            name: "Sebep:",
            value: "```"+sebep.split("|")[0]+"```",
            inline: true
          },
          {
            name: "Banlayan:",
            value: "```"+user.tag+"```",
            inline: true
          },
        ])
        .setTimestamp()
        .setFooter({ text: `${user.tag} tarafından banlandı.`, iconURL: `${user.displayAvatarURL()} ` })
      
      guild.members.ban(member.user, { reason: sebep.toString() });
      return interaction.followUp({ embeds: [embed] })
      
    } else {
      return interaction.followUp({ embeds: [
        new EmbedBuilder().setColor(0x2F3136).setAuthor({ name: `${user.tag}`, iconURL: `${user.displayAvatarURL()} ` }).setDescription("<:carpi:1040649840394260510> **|** Bu komut sadece `Üyeleri Yasakla` yetkisine sahip kullanıclarına özel kullanımdadır.")
     ] }) 
    }
  }
}