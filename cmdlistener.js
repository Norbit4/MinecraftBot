const { connectBots, sendMessage, disconnect } = require('./mcbot.js');
const { EmbedBuilder } = require('discord.js');

function listner(client){
    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;
        
        const { commandName, options, user, channel } = interaction;
        const userId = user.id

        const embed = new EmbedBuilder()
    
        if(commandName === 'start'){
        
            let amount = options.getInteger('amount')
            let interval = options.getInteger('interval')
            let botPrefix = options.getString('prefix')

            var connectSettings = {
                userId: userId,
                amount: amount,
                interval: interval,
                botPrefix: botPrefix,
                channel: channel
            }

            connectBots(connectSettings)

            embed.setTitle(':white_check_mark: Started!')
            embed.setDescription(`Loading... **${amount}** bots with prefix: *${botPrefix}*`)
            embed.setColor('#00ff00')
    
            await interaction.reply({ embeds: [embed] })
    
        }else if(commandName === 'stop'){
    
            var result = await disconnect(userId)

            embed.setTitle(':white_check_mark: Stoped!')
            embed.setDescription(`Stoped all bots!`)
            embed.setColor('#db1f13')

            await interaction.reply({ embeds: [embed] })           
    
        }else if(commandName === 'message'){

            const text = options.getString('message') 

            var message = {
                userId: userId,
                messageType: 'CHAT',
                text: text
            }

            //var result = await sendMessage(userId, 'CHAT', message)
            var result = await sendMessage(message)
        
            if(result){ 

                embed.setTitle(':speech_balloon: Sended!')
                embed.setDescription(`Chat message: ${text}`)
                embed.setColor('#00ff00')

                await interaction.reply({ embeds: [embed] }) 
                return
            }

            embed.setTitle(':negative_squared_cross_mark: Error')
            embed.setDescription(`Bots are loading ... try again later`)
            embed.setColor('#db1f13')
            
            await interaction.reply({ embeds: [embed] }) 
        }
    })
}

module.exports = {
    listner: listner
  }