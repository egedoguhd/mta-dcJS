const { Events } = require("discord.js");
const gamedig = require("gamedig");

module.exports = {
  name: Events.ClientReady,
  once: true,
  
  async execute(client, config) {
    console.log(`${client.user.tag} HAZIR.`)
    
    const server = config.server;
    
    const mtasa = await gamedig.query({
      type: "mtasa",
      host: server.ip || "94.23.68.73",
      port: server.port || "22003",
    });
    
    setInterval(function playersUpdate() {
      client.user.setPresence({ activities: [{ name: `Oyuncular: ${mtasa.raw.numplayers}/${mtasa.maxplayers}` }], status: 'dnd' });
    }, config.duration)
  }
}