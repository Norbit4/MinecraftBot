const { Client, GatewayIntentBits } = require('discord.js');
const {connectBots, sendMessage} = require('./mcbot.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const token = 'MTAxNTMxMDA0Mzc0NDMxMzQwNA.GDqBwB.DQAgfreKNISwyu3FsVTwbGr1trhFujI7eTt2Es'
var connected = false;


client.on('ready', () => {
  console.log('I am ready!');

  const guildID = '878983281549406248'
  const guild = client.guilds.cache.get(guildID)

  let commands

  if(guild){
    commands = guild.commands
  }  

  commands.create({
    name: 'start',
    description: 'start the bot',
    options: [
        {
            name: 'amount',
            description: 'amount of bots',
            required: true,
            type: 4
        },
        {
            name: 'interval',
            description: 'interval between bots',
            required: false,
            type: 4
        }
    ]
  })

  commands.create({
    name: 'message',
    description: 'chat message',
    options: [
        {
            name: 'message',
            description: 'chat message',
            required: true,
            type: 3
        }
    ]
  })

  commands.create({
    name: 'stop',
    description: 'stop the bots',
  })
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    
    const { commandName, options, user } = interaction;
    const userId = user.id

    if(commandName === 'start'){

      if(!connected){
        let amount = options.getInteger('amount')
        let interval = options.getInteger('interval')
    
        connectBots(userId, amount, interval)
        connected = true
      }

      await interaction.reply('started!')

    }else if(commandName === 'stop'){
        if(connected){
            sendMessage(userId, 'QUIT')
            connected = false
        }

        await interaction.reply('stopped!')

    }else if(commandName === 'message'){
        if(connected){
            sendMessage(userId, 'CHAT', options.getString('message'))
        }

        await interaction.reply('sended!')
    }
})


client.login(token)
