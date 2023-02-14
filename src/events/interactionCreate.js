const { ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const fs = require("fs");
const wait = require('node:timers/promises').setTimeout;

const db = require("croxydb");

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  
  async execute(client, config, interaction) {
    const { user, channel, guild } = interaction;
    
    if(interaction.isChatInputCommand()) {
		if (!interaction.guild) return;

	for(let props of fs.readdirSync("./src/commands")) {
			const command = require(`../commands/${props}`);

			if(interaction.commandName.toLowerCase() === command.name.toLowerCase()) {

        		return command.execute(client, interaction, config, db);

        }
		  }	
	  }
    
  if(interaction.isButton()) {
    
    if(interaction.customId.includes(`ban`)) {
        const modal = new ModalBuilder().setCustomId('banModal').setTitle('Banla.');
      
        const isim = new TextInputBuilder().setCustomId('icisim').setLabel("Oyun içi ismi:").setPlaceholder('roman').setStyle(TextInputStyle.Short)
        const sebep = new TextInputBuilder().setCustomId('sebep').setLabel("Sebep:").setPlaceholder('çok yakışıklı').setStyle(TextInputStyle.Short)
        const süre = new TextInputBuilder().setCustomId('banlayan').setLabel("Kim Banladı?:").setPlaceholder('rahzam').setStyle(TextInputStyle.Short)
        
      
        const _isim = new ActionRowBuilder().addComponents(isim);
        const _sebep = new ActionRowBuilder().addComponents(sebep);
        const _süre = new ActionRowBuilder().addComponents(süre);
      
        modal.addComponents(_isim, _sebep, _süre);

		
		    await interaction.showModal(modal);        
      }
    
    if(interaction.customId.includes(`diger`)) {
        const modal = new ModalBuilder().setCustomId('digerModal').setTitle('Sebep gir.');
      
        const isim = new TextInputBuilder().setCustomId('baslik').setLabel("Başlık:").setPlaceholder('s').setStyle(TextInputStyle.Short)
        const sebep = new TextInputBuilder().setCustomId('konu').setLabel("Konu:").setPlaceholder('bilm').setStyle(TextInputStyle.Paragraph)
        
        
      
        const _isim = new ActionRowBuilder().addComponents(isim);
        const _sebep = new ActionRowBuilder().addComponents(sebep);
      
        modal.addComponents(_isim, _sebep);

		
		    await interaction.showModal(modal);        
      }
    
    if(interaction.customId.includes("sikayet")) {
      const modal = new ModalBuilder().setCustomId('sikModal').setTitle('Oyuncu Şikayeti');
      
      const isim = new TextInputBuilder().setCustomId('sikeden').setLabel("Şikayet Eden:").setPlaceholder('roman').setStyle(TextInputStyle.Short)
      const sebep = new TextInputBuilder().setCustomId('dc').setLabel("Şikayet Edilen Kişi Ve Discord Kullanıcı Adı:").setPlaceholder('çok yakışıklı').setStyle(TextInputStyle.Short)
      const olay = new TextInputBuilder().setCustomId('olay').setLabel("Olay:").setPlaceholder('çok yakışıklı').setStyle(TextInputStyle.Paragraph)
      const süre = new TextInputBuilder().setCustomId('olaydate').setLabel("Olay Tarihi.").setPlaceholder('13/01/2023').setStyle(TextInputStyle.Short)
      
      const kanıt = new TextInputBuilder().setCustomId('kanıt').setLabel("Kanıtınız:").setPlaceholder('imgur.com/aQasd.png').setStyle(TextInputStyle.Short)
      
      modal.addComponents(new ActionRowBuilder().addComponents(isim), new ActionRowBuilder().addComponents(sebep), new ActionRowBuilder().addComponents(olay), new ActionRowBuilder().addComponents(süre), new ActionRowBuilder().addComponents(kanıt));
      
      await interaction.showModal(modal);        
    }
    
    if(interaction.customId.includes(`basvuru`)) {
        const modal = new ModalBuilder().setCustomId('basvuruModal').setTitle('Başvuru yap.');
              const isim = new TextInputBuilder().setCustomId('icisim').setLabel("IC / OOC isminiz ve kullanıcı adınız nedir?:").setPlaceholder('roman').setStyle(TextInputStyle.Short)
        const yas = new TextInputBuilder().setCustomId('yas').setLabel("OOC Yaşınız kaç?:").setPlaceholder('21').setStyle(TextInputStyle.Short)
        const saat = new TextInputBuilder().setCustomId('saat').setLabel("Oyun içi karakter saatiniz kaç?").setPlaceholder('8').setStyle(TextInputStyle.Short)
        const aktif = new TextInputBuilder().setCustomId('aktif').setLabel("Gün içerisinde aktiflik süreniz kaç saat?").setPlaceholder('26').setStyle(TextInputStyle.Short)
        const sebep = new TextInputBuilder().setCustomId('sebep').setLabel("Warn/jail/ban cezanız bulunmakta mı?").setPlaceholder('yok').setStyle(TextInputStyle.Short)
        
      
        const _isim = new ActionRowBuilder().addComponents(isim);
        const _saat = new ActionRowBuilder().addComponents(saat);
        const _yas = new ActionRowBuilder().addComponents(yas);
        const _aktif = new ActionRowBuilder().addComponents(aktif);
      const _sebep = new ActionRowBuilder().addComponents(sebep);
      
        modal.addComponents(_isim, _saat, _yas, _aktif, _sebep);

		
		    await interaction.showModal(modal);        
      }
    
    if(interaction.customId.includes(`yardımbuton`)) {
        const modal = new ModalBuilder().setCustomId('onayButon').setTitle('Onayla.');
      
        const isim = new TextInputBuilder().setCustomId('icisim').setLabel("Onay İsteyen Birliğin Lider:").setPlaceholder('roman').setStyle(TextInputStyle.Short)
        const yas = new TextInputBuilder().setCustomId('yas').setLabel("Yardım İsteyen Birliğin Rollerden SSler:").setPlaceholder('@everyone').setStyle(TextInputStyle.Short)
        
      
        const _isim = new ActionRowBuilder().addComponents(isim);
        const _saat = new ActionRowBuilder().addComponents(yas);
        
      
        modal.addComponents(_isim, _saat);

		
		    await interaction.showModal(modal);        
      }
    
    if(interaction.customId.includes(`onaybuton`)) {
        const modal = new ModalBuilder().setCustomId('onayButon').setTitle('Onayla.');
      
        const isim = new TextInputBuilder().setCustomId('icisim').setLabel("Onay İsteyen Birliğin Lider:").setPlaceholder('roman').setStyle(TextInputStyle.Short)
        const yas = new TextInputBuilder().setCustomId('yas').setLabel("Yardım İsteyen Birliğin Rollerden SSler:").setPlaceholder('@everyone').setStyle(TextInputStyle.Short)
        
      
        const _isim = new ActionRowBuilder().addComponents(isim);
        const _saat = new ActionRowBuilder().addComponents(yas);
        
      
        modal.addComponents(_isim, _saat);

		
		    await interaction.showModal(modal);        
      }
    
    if(interaction.customId.includes(`uyarı`)) {
        const modal = new ModalBuilder().setCustomId('uyarıModal').setTitle('Uyar.');
      
        const isim = new TextInputBuilder().setCustomId('icisim').setLabel("Discord ID:").setPlaceholder('358883531352702990').setStyle(TextInputStyle.Short)
        const sebep = new TextInputBuilder().setCustomId('sebep').setLabel("Sebep:").setPlaceholder('çok sevimli.').setStyle(TextInputStyle.Short)
        const süre = new TextInputBuilder().setCustomId('uyaran').setLabel("Kim Uyardı?:").setPlaceholder('rahzam').setStyle(TextInputStyle.Short)
        
      
        const _isim = new ActionRowBuilder().addComponents(isim);
        const _sebep = new ActionRowBuilder().addComponents(sebep);
        const _süre = new ActionRowBuilder().addComponents(süre);
      
        modal.addComponents(_isim, _sebep, _süre);

		
		    await interaction.showModal(modal);        
      }
    
    if(interaction.customId.includes("inter")) {
      const modal = new ModalBuilder().setCustomId('interModal').setTitle('null');
      
      const isim = new TextInputBuilder().setCustomId('icisim').setLabel("Karakter Adı ve Kullanıcı Adı:").setPlaceholder('taliban').setStyle(TextInputStyle.Short)
        const sebep = new TextInputBuilder().setCustomId('map').setLabel("İnterior Map:").setPlaceholder('dm yoluyla ataım.').setStyle(TextInputStyle.Short)
        const süre = new TextInputBuilder().setCustomId('sebep').setLabel("Ne için Kullanacaksınız?").setPlaceholder('çok tatılar').setStyle(TextInputStyle.Short)
        
      
        const _isim = new ActionRowBuilder().addComponents(isim);
        const _sebep = new ActionRowBuilder().addComponents(sebep);
        const _süre = new ActionRowBuilder().addComponents(süre);
      
        modal.addComponents(_isim, _sebep, _süre);

		
		    await interaction.showModal(modal);        
    }
    
    if(interaction.customId.includes("birlik")) {
      const modal = new ModalBuilder().setCustomId('birlikModal').setTitle('Birlik isteği');
      
      const isim = new TextInputBuilder().setCustomId('isim').setLabel("Yardım İsteyen Birliğin Adı:").setPlaceholder('taliban').setStyle(TextInputStyle.Short)
    
      
      
        const _isim = new ActionRowBuilder().addComponents(isim);
      
        modal.addComponents(_isim);

		
		    await interaction.showModal(modal);        
    }
    
    if(interaction.customId.includes("kapa")) {
      return interaction.channel.delete()
    }
    }
    
    if(interaction.isModalSubmit()) {
      if (interaction.customId === 'banModal') {
        const isim = interaction.fields.getTextInputValue('icisim');
        const sebep = interaction.fields.getTextInputValue('sebep');
        const banlayan = interaction.fields.getTextInputValue('banlayan');

        const logChannel = await interaction.guild.channels.cache.get(config.logs.ban);
    //bitti
        const embed = new EmbedBuilder()
        .setColor(config.color || 0x2F3136)
        .setAuthor({ name: `Bir kullanıcı banlandı.`, iconURL: `${guild.iconURL()} ` })
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
            name: "Banlayan:",
            value: "```"+banlayan+"```",
            inline: true
          },
        ])
        .setTimestamp()
        .setFooter({ text: `${user.tag} tarafından banlandı.`, iconURL: `${user.displayAvatarURL()} ` })
        
        interaction.reply({ embeds: [{description: "✅ **|** Kullanıcıyı başarıyla reportladınız.", color: 0x2F3136 }], ephemeral: true })
        logChannel.send({ embeds: [embed] })
	    }
         
      if (interaction.customId === 'basvuruModal') {
        const isim = interaction.fields.getTextInputValue('icisim');
        const yaş = interaction.fields.getTextInputValue('yas');
        const saat = interaction.fields.getTextInputValue('saat');
        const aktif = interaction.fields.getTextInputValue('aktif');
        const sebep = interaction.fields.getTextInputValue('sebep');

        const logChannel = await interaction.guild.channels.cache.get(config.logs.basvuru);
        
        const embed = new EmbedBuilder()
        .setColor(config.color || 0x2F3136)
        .setAuthor({ name: `Bir başvuru geldi.`, iconURL: `${guild.iconURL()} ` })
        .addFields([
          {
            name: "IC / OOC isminiz ve kullanıcı adınız nedir?:",
            value: "```"+isim+"```",
            inline: true
          },
          {
            name: "OOC Yaşınız kaç?:",
            value: "```"+yaş+"```",
            inline: true
          },
          {
            name: "Oyun içi karakter saatiniz kaç?:",
            value: "```"+saat+"```",
            inline: true
          },
          {
            name: "Gün içerisinde aktiflik süreniz kaç saat?:",
            value: "```"+aktif+"```",
            inline: true
          },
          {
            name: "Warn/jail/ban cezanız bulunmakta mı? (varsa neden):",
            value: "```"+sebep+"```",
            inline: true
          },
        ])
        .setTimestamp()
        .setFooter({ text: `${user.tag} tarafından yapıldı.`, iconURL: `${user.displayAvatarURL()} ` })
        
        interaction.reply({ embeds: [{description: "✅ **|** Başvuru başarıyla gönderildi.", color: 0x2F3136 }], ephemeral: true })
        logChannel.send({ embeds: [embed] })
	    }

      if (interaction.customId === 'birlikModal') {
        const logChannel = await interaction.guild.channels.cache.get(config.logs.birlik);
         const isim = interaction.fields.getTextInputValue('isim');
        
        db.set(`isim_${interaction.user.id}`, isim)
        
        const embed2 = new EmbedBuilder()
        .setColor(config.color || 0x2F3136)
        .setAuthor({ name: `Birlik talebi.`, iconURL: `${guild.iconURL()} ` })
        .setDescription(`Merhaba ${interaction.user.username}, bilgilerini teslim aldık ve gerekli bilgileri inceliyoruz. En kısa zamanda sana dönüş yapacağız!`)
        .addFields([
          {
            name: "Birlik adı:",
            value: "```"+isim+"```",
            inline: true
          },     
        ])
        .setTimestamp()
        .setFooter({ text: `${user.tag} tarafından açıldı.`, iconURL: `${user.displayAvatarURL()} ` })
        
        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('kapa')
					.setLabel('Desteği kapat')
					.setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
					.setCustomId('yardımbuton')
					.setLabel('Birlik Yardımı')
					.setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
					.setCustomId('onaybuton')
					.setLabel('Birlik Onay')
					.setStyle(ButtonStyle.Success),
			);
      
        const chnl = await guild.channels.create({
	          name: `destek-${interaction.user.username} `,
	          type: ChannelType.GuildText,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [PermissionsBitField.Flags.ViewChannel],
              },
              {
                id: interaction.user.id,
                allow: [PermissionsBitField.Flags.ViewChannel],
              },
            ],
          });
        
        interaction.reply({ content: `Desteğin açıldı! <#${chnl.id}>`, ephemeral: true })
        chnl.send({ embeds: [embed2], components: [row] })
	    }
      
      if (interaction.customId === 'sikModal') {
        const sikeden = interaction.fields.getTextInputValue('sikeden');
        const adam = interaction.fields.getTextInputValue('dc');
        const olay = interaction.fields.getTextInputValue('olay');
        const date = interaction.fields.getTextInputValue('olaydate');
        const kanıt = interaction.fields.getTextInputValue('kanıt');

        const logChannel = await interaction.guild.channels.cache.get(config.logs.sikayet);
        
        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('kapa')
					.setLabel('Desteği kapat')
					.setStyle(ButtonStyle.Primary),
			);
        
        const embed = new EmbedBuilder()
        .setColor(config.color || 0x2F3136)
        .setAuthor({ name: `Kullanıcı şikayet edildi.`, iconURL: `${guild.iconURL()} ` })
        .setDescription(`Merhaba ${interaction.user.username}, bilgilerini teslim aldık ve gerekli bilgileri inceliyoruz. En kısa zamanda sana dönüş yapacağız!`)
        .addFields([
          {
            name: "Şikayet Eden:",
            value: "```"+sikeden+"```",
            inline: true
          },
          {
            name: "Şikayet Edilen Kişi:",
            value: "```"+adam+"```",
            inline: true
          },
          {
            name: "Olay Tarihi:",
            value: "```"+date+"```",
            inline: true
          },
          {
            name: "Olay:",
            value: "```"+olay+"```",
            inline: false
          },
          {
            name: "Kanıtınız(Video, Video Linki, Fotoğraf, Fotoğraf Linki):",
            value: "```"+kanıt+"```",
            inline: false
          },
        ])
        .setTimestamp()
        .setFooter({ text: `${user.tag} tarafından açıldı.`, iconURL: `${user.displayAvatarURL()} ` })
        
        const chnl = await guild.channels.create({
	          name: `destek-${interaction.user.username} `,
	          type: ChannelType.GuildText,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [PermissionsBitField.Flags.ViewChannel],
              },
              {
                id: interaction.user.id,
                allow: [PermissionsBitField.Flags.ViewChannel],
              },
            ],
          });
        
        interaction.reply({ content: `Desteğin açıldı! <#${chnl.id}>`, ephemeral: true })
        chnl.send({ embeds: [embed], components: [row] })
	    }
      
      if (interaction.customId === 'interModal') {
        const isim = interaction.fields.getTextInputValue('icisim');
        const map = interaction.fields.getTextInputValue('map');
        const sebep = interaction.fields.getTextInputValue('sebep');


        const logChannel = await interaction.guild.channels.cache.get(config.logs.inter);
        
        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('kapa')
					.setLabel('Desteği kapat')
					.setStyle(ButtonStyle.Primary),
			);
        
        const embed = new EmbedBuilder()
        .setColor(config.color || 0x2F3136)
        .setAuthor({ name: `${guild.name}`, iconURL: `${guild.iconURL()} ` })
        .setDescription(`Merhaba ${interaction.user.username}, bilgilerini teslim aldık ve gerekli bilgileri inceliyoruz. En kısa zamanda sana dönüş yapacağız!`)
        .addFields([
          {
            name: "Karakter Adı ve Kullanıcı Adı:",
            value: "```"+isim+"```",
            inline: true
          },
          {
            name: "İnterior Map ve Dış Çevre Resimleri(Linkleri):",
            value: "```"+map+"```",
            inline: true
          },
          {
            name: "Ne için Kullanacaksınız?:",
            value: "```"+sebep+"```",
            inline: true
          },
        ])
        .setTimestamp()
        .setFooter({ text: `${user.tag} tarafından açıldı.`, iconURL: `${user.displayAvatarURL()} ` })
        
        const chnl = await guild.channels.create({
	          name: `destek-${interaction.user.username} `,
	          type: ChannelType.GuildText,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [PermissionsBitField.Flags.ViewChannel],
              },
              {
                id: interaction.user.id,
                allow: [PermissionsBitField.Flags.ViewChannel],
              },
            ],
          });
        
        interaction.reply({ content: `Desteğin açıldı! <#${chnl.id}>`, ephemeral: true })
        chnl.send({ embeds: [embed], components: [row] })
	    }
      
      if (interaction.customId === 'onayButon') {
        const isim = interaction.fields.getTextInputValue('icisim');
        const map = interaction.fields.getTextInputValue('yas');

//fields
        const logChannel = await interaction.guild.channels.cache.get(config.log); 
        
        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('kapa')
					.setLabel('Desteği kapat')
					.setStyle(ButtonStyle.Primary),
			);
        
        const embed = new EmbedBuilder()
        .setColor(config.color || 0x2F3136)
        .setAuthor({ name: `${guild.name}`, iconURL: `${guild.iconURL()} ` })
        .setDescription(`Merhaba ${interaction.user.username}, bilgilerini teslim aldık ve gerekli bilgileri inceliyoruz. En kısa zamanda sana dönüş yapacağız!`)
        .addFields([
          {
            name: "Birlik Adı:",
            value: "```"+db.fetch(`isim_${interaction.user.id}`)+"```",
            inline: false
          },
          {
            name: "Onay İsteyen Birliğin Lider:",
            value: "```"+isim+"```",
            inline: false
          },
          {
            name: "Yardım İsteyen Birliğin Üye Sayısı Ve Rollerden SSler:",
            value: "```"+map+"```",
            inline: false
          },
        ])
        .setTimestamp()
        .setFooter({ text: `${user.tag} tarafından açıldı.`, iconURL: `${user.displayAvatarURL()} ` })
        
        interaction.update({ embeds: [embed], components: [row] })
	    }
      
      if (interaction.customId === 'digerModal') {
        const isim = interaction.fields.getTextInputValue('baslik');
        const map = interaction.fields.getTextInputValue('konu');


        const logChannel = await interaction.guild.channels.cache.get(config.log);
        
        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('kapa')
					.setLabel('Desteği kapat')
					.setStyle(ButtonStyle.Primary),
			);
        
        const embed = new EmbedBuilder()
        .setColor(config.color || 0x2F3136)
        .setAuthor({ name: `${guild.name}`, iconURL: `${guild.iconURL()} ` })
        .setDescription(`Merhaba ${interaction.user.username}, bilgilerini teslim aldık ve gerekli bilgileri inceliyoruz. En kısa zamanda sana dönüş yapacağız!`)
        .addFields([
          {
            name: "Başlık:",
            value: "```"+isim+"```",
          },
          {
            name: "Konu:",
            value: "```"+map+"```",
          },
        ])
        .setTimestamp()
        .setFooter({ text: `${user.tag} tarafından açıldı.`, iconURL: `${user.displayAvatarURL()} ` })
        
        const chnl = await guild.channels.create({
	          name: `destek-${interaction.user.username} `,
	          type: ChannelType.GuildText,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [PermissionsBitField.Flags.ViewChannel],
              },
              {
                id: interaction.user.id,
                allow: [PermissionsBitField.Flags.ViewChannel],
              },
            ],
          });
        
        interaction.reply({ content: `Desteğin açıldı! <#${chnl.id}>`, ephemeral: true })
        chnl.send({ embeds: [embed], components: [row] })
	    }
    }
  }
}