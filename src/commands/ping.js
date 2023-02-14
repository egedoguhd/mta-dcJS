module.exports = {
  name: "ping",
  description: "Bot'un ping değerlerini gösterir.",
  options: [],
  
  async execute(client, interaction, config, db) {
    await interaction.deferReply();
    
    const { user, options, guild } = interaction;
    
    return interaction.followUp({ content: `Pong! \`${client.ws.ping}ms\` ` })
  }
}