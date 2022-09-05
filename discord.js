const { Client, GatewayIntentBits } = require('discord.js');
const { register } = require('./cmdmanager.js');
const { listner } = require('./cmdlistener.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const token = 'MTAxNTMxMDA0Mzc0NDMxMzQwNA.GDqBwB.DQAgfreKNISwyu3FsVTwbGr1trhFujI7eTt2Es'

client.on('ready', () => {
  client.user.setActivity("test"); 
});

client.on('ready', () => {

  console.log('I am ready!');

  const guildID = '878983281549406248'
  const guild = client.guilds.cache.get(guildID)

  let commands

  if(guild){
    commands = guild.commands

    register(commands)
  }  
})

listner(client)

client.login(token)
