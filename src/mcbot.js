const mineflayer = require('mineflayer')
const { EmbedBuilder } = require('discord.js');

const userMap = new Map()
const botIntervalList = []

const sleep = (ms) => {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

async function disconnect(userId){
  userMap.get(userId).disconnected = true
}

async function sendMessage(message){ 

  const { userId, messageType, text } = message

  var userMessage = userMap.get(userId);

  const {connected} = userMessage

  if(connected == false && messageType === 'CHAT') return false

  userMessage.openChannel = true

  userMessage.messageType = messageType
  userMessage.text = text

  await sleep(100)

  userMessage.openChannel  = false

  return true
}


const createBot = function(botSettings) {

  const {userId, index, botPrefix, host} = botSettings
  
  const bot = mineflayer.createBot({
    host: host,
    username: botPrefix + index, 
  })

  const start = (userId) => {

    var id = setInterval(() => {
      var userMessage = userMap.get(userId)

      if(userMessage == undefined) return 

      const { openChannel, messageType, text, disconnected } = userMessage

      if(disconnected) {
        bot.quit()
        arrayRemove(botIntervalList, userId)
        clearInterval(id)
      }

      if(openChannel) {
        switch(messageType){             
          case 'CHAT':
            bot.chat(text)  
          break;
        
          default:
          console.log('[ERROR] wrong message type!')
          break;
        }
      }
    }, 100)
  }
  
  bot.once('spawn',() => start(userId))
}

async function connectBots (connectSettings){
  var i = 0;

  var {userId, botAmout, interval, botPrefix, channel, host} = connectSettings 

  if(interval == undefined) interval = 600;

  if (botAmout == undefined) botAmout = 5;

  userMap.set(userId, 
    {
      openChannel: false, 
      message: '',
      messageType: '',
      connected: false,
      disconnected: false
    }
  )

  var id = setInterval(() => {

    if(i == 0){
      botIntervalList.push(userId)
    }

    var botSettings ={
      host,
      userId,
      index: i,
      botPrefix
    }

    createBot(botSettings)

    i++

    if(i == botAmout) {
      userMap.get(userId).connected = true
      arrayRemove(botIntervalList, userId)

      const embed = new EmbedBuilder()

      embed.setTitle(':white_check_mark: Done!')
      embed.setDescription(`Started!`)
      embed.setColor('#00ff00')

      channel.send({ embeds: [embed] })

      clearInterval(id)
      return true

    }else if(!botIntervalList.includes(userId)){
      console.log('stopped')

      clearInterval(id)
      return false
    }
  }, interval)
}

function arrayRemove(arr, value) { 
    
  if(arr.includes(value)){
    arr.forEach((item, index) => {
      if(item === value) arr.splice(index,1);
    })
  }
}

module.exports = {
  connectBots: connectBots,
  sendMessage: sendMessage,
  disconnect: disconnect
}