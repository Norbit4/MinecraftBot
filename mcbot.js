const mineflayer = require('mineflayer')

const prefix = 'bot'

var message = {
  openChannel: false,
  messageType: '',
  text: ''
}

const userMap = new Map()

const sleep = (ms) => {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

async function sendMessage(userId, messageType, text) {

  var userMessage = userMap.get(userId)

  userMessage.openChannel = true

  userMessage.messageType = messageType
  userMessage.text = text
  await sleep(100)

  userMessage.openChannel = false
}


const createBot = function(userId, index) {
  
  const bot = mineflayer.createBot({
    host: 'localhost',
    username: prefix + index, 
    password: ''
  })

  const start = () => {

    var id = setInterval(() => {
      var userMessage = userMap.get(userId)

      if(userMessage.openChannel) {

        switch(userMessage.messageType){      
          case 'QUIT':
            bot.quit()
            clearInterval(id)
            break;
          case 'CHAT':
            bot.chat(userMessage.text)
            break;
          default:
            console.log('[ERROR] wrong message type!')
            break;
        }
      }
    }, 100)
  }
  
  bot.once('spawn', start)
}

function connectBots(userId, botAmout, interval){
  var i = 0;
  userMap.set(userId, 
    {
    openChannel: false, 
    message: message,
    messageType: ''
    }
  )

  if(interval == undefined) interval = 500;

  if (botAmout == undefined) botAmout = 5;

  var id = setInterval(() => {

    createBot(userId, i)

    i++

    if(i == botAmout) {
      clearInterval(id)
      return true
    }
  }, interval)
}

module.exports = {
  connectBots: connectBots,
  sendMessage: sendMessage
}