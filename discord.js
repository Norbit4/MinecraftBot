const { Client, GatewayIntentBits } = require('discord.js');
const { register } = require('./src/cmdmanager.js');
const { listener } = require('./src/cmdlistener.js');
let jsonData = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
var { token, status } = jsonData

client.on('ready', () => {
  client.user.setActivity(status) 
});

client.on('ready', () => {

  console.log('[Bot] I am ready!');

  const guildID = '878983281549406248'
  const guild = client.guilds.cache.get(guildID)

  let commands

  if(guild){
    commands = guild.commands

    register(commands)
  }  
})

listener(client)

client.login(token)
