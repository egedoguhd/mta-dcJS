const gamedig = require("gamedig");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
  name: "oynayanlar",
  description: "Sunucuda oynayanların isimlerini gösterir.",
  options: [],
  
  async execute(client, interaction, config, db) {
    await interaction.deferReply();
    
    const { user, options, guild } = interaction;
    const server = config.server;
    
    const players = [];
    
    
     const mtasa = await gamedig.query({
      type: "mtasa",
      host: server.ip || "94.23.68.73",
      port: server.port || "22003",
    });
    
    
    for(const i in mtasa.players) {
      players.push(`🧑‍💻 **|** \`${mtasa.players[i].name}\` **|** Ping: **${mtasa.players[i].raw.ping}ms** **|** Score: **${mtasa.players[i].raw.score}**`)
    }
    
    var max = 25;
    var min = 0;
    
    const a = players.slice(min, max)
    const v1 = a.join("\n")
    
    const embed = new EmbedBuilder()
    .setColor(config.color || 0x2F3136)
    .setAuthor({ name: `${mtasa.name}`, iconURL: `${guild.iconURL()} ` })
    .setDescription(v1)
    .setTimestamp()
    .setFooter({ text: `${user.tag} tarafından istendi.`, iconURL: `${user.displayAvatarURL()} ` })
    
    // by 'Roman#7777
    
    const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('geri')
					.setEmoji('⬅️')
					.setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
					.setCustomId('sayfa')
					.setLabel(`${min}/${max}`)
          .setDisabled(true)
					.setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
					.setCustomId('ileri')
					.setEmoji('➡️')
					.setStyle(ButtonStyle.Secondary),
			);
    
    const int = await interaction.followUp({ embeds: [embed], components: [row] });
    
    const filter = i =>  i.user.id === user.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter });
    
    collector.on('collect', async i => {
	   if(i.customId === "ileri") {
         max += 25;
         min += 25;
    
       const arti = max //max - 25;
       const eski = min //min - 25;
       
    const a = players.slice(eski, arti)
    const v1 = a.join("\n")
    
    const embed = new EmbedBuilder()
    .setColor(config.color || 0x2F3136)
    .setAuthor({ name: `${mtasa.name}`, iconURL: `${guild.iconURL()} ` })
    .setDescription(v1)
    .setTimestamp()
    .setFooter({ text: `${user.tag} tarafından istendi.`, iconURL: `${user.displayAvatarURL()} ` })
    
    if(arti >= mtasa.raw.numplayers) {
       const rowa = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('geri')
					.setEmoji('⬅️')
					.setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
					.setCustomId('sayfa')
					.setLabel(`${eski}/${arti}`)
          .setDisabled(true)
					.setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setDisabled(true)
					.setCustomId('ileri')
					.setEmoji('➡️')
					.setStyle(ButtonStyle.Secondary),
        
			);
      
       return i.update({ embeds: [embed], components: [rowa] })
    } else {
      const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('geri')
					.setEmoji('⬅️')
					.setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
					.setCustomId('sayfa')
					.setLabel(`${eski}/${arti}`)
          .setDisabled(true)
					.setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
					.setCustomId('ileri')
					.setEmoji('➡️')
					.setStyle(ButtonStyle.Secondary),
			);
      
     return i.update({ embeds: [embed], components: [row] })
    }
       
     }
      
      
      if(i.customId === "geri") {
         max -= 25;
         min -= 25;
    
       const arti = max //max - 25;
       const eski = min //min - 25;
       
    const a = players.slice(eski, arti)
    const v1 = a.join("\n")
    
    const embed = new EmbedBuilder()
    .setColor(config.color || 0x2F3136)
    .setAuthor({ name: `${mtasa.name}`, iconURL: `${guild.iconURL()} ` })
    .setDescription(v1)
    .setTimestamp()
    .setFooter({ text: `${user.tag} tarafından istendi.`, iconURL: `${user.displayAvatarURL()} ` })
    
    if(arti === 25) {
       const rowa = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('geri')
        .setDisabled(true)
					.setEmoji('⬅️')
					.setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
					.setCustomId('sayfa')
					.setLabel(`${eski}/${arti}`)
          .setDisabled(true)
					.setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setDisabled(false)
					.setCustomId('ileri')
					.setEmoji('➡️')
					.setStyle(ButtonStyle.Secondary),
        
			);
      
       return i.update({ embeds: [embed], components: [rowa] })
    } else {
      const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('geri')
					.setEmoji('⬅️')
					.setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
					.setCustomId('sayfa')
					.setLabel(`${eski}/${arti}`)
          .setDisabled(true)
					.setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
					.setCustomId('ileri')
					.setEmoji('➡️')
					.setStyle(ButtonStyle.Secondary),
			);
      
     return i.update({ embeds: [embed], components: [row] })
    }
       
     }
    });
    
  }
}