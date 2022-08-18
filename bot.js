const mineflayer = require('mineflayer')

const prefix = 'bot'
const command = '/help'
const botList = []

const createBot = function(index) {
  
  const bot = mineflayer.createBot({
    host: 'localhost',
    username: prefix + index, 
    password: ''
  })

  const welcome = () => {
    //bot.chat(command)
  }
  
  
  bot.once('spawn', welcome)

  botList[index] = bot
  
}

for (let index = 0; index < 70; index++) {
  createBot(index)
}

console.log(botList.length)