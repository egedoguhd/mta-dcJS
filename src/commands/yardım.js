const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
  name: "yardım",
  description: "Botun yardım komutunu gösterir.",
  options: [],
  
  async execute(client, interaction, config, db) {
    await interaction.deferReply();
    
    const { user, options, guild } = interaction;
    
    const commands = [];


  for(let lenght in global.commands) {
    commands.push(global.commands[lenght].name+"|"+global.commands[lenght].description)
}

const c = commands.map(map => `**/${map.split("|")[0]}:** \`${map.split("|")[1]}\``).join("\n")

  const embed = new EmbedBuilder()
      .setColor(config.color || 0x2F3136)
      .setAuthor({ name: `Bir kullanıcı inceleniyor.`, iconURL: `${guild.iconURL()} ` })
      .setDescription(c)
      .setTimestamp()
      .setFooter({ text: `${user.tag} tarafından inceleniyor.`, iconURL: `${user.displayAvatarURL()} ` })
     
     return interaction.followUp({ embeds: [embed] })


  }
}