
function register(commands) {
    commands.create({
        name: 'start',
        description: 'start the bot',
        options: 
        [
            {
                name: 'host',
                description: 'server ip',
                required: true,
                type: 3
            },
            {
                name: 'amount',
                description: 'amount of bots',
                required: true,
                type: 4
            },
            {
                name: 'prefix',
                description: 'bot prefix',
                required: true,
                type: 3
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
        options: 
        [
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
}

module.exports = {
    register: register
  }