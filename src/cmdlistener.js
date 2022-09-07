const { connectBots, sendMessage, disconnect } = require('./mcbot.js');
const { EmbedBuilder } = require('discord.js');

function listener(client){
    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;
        
        const { commandName, options, user, channel } = interaction;
        const userId = user.id

        const embed = new EmbedBuilder()
    
        if(commandName === 'start'){
        
            let host = options.getString('host')
            let amount = options.getInteger('amount')
            let interval = options.getInteger('interval')
            let botPrefix = options.getString('prefix')

            var connectSettings = {
                host,
                userId,
                amount,
                interval,
                botPrefix,
                channel
            }

            connectBots(connectSettings)

            embed.setTitle(':white_check_mark: Started!')
            embed.setDescription(`Loading... **${amount}** bots with prefix: *${botPrefix}*`)
            embed.setColor('#00ff00')
    
            await interaction.reply({ embeds: [embed] })
    
        }else if(commandName === 'stop'){
    
            var result = await disconnect(userId)

            embed.setTitle(':octagonal_sign: Stoped!')
            embed.setDescription(`Stoped all bots!`)
            embed.setColor('#db1f13')

            await interaction.reply({ embeds: [embed] })           
    
        }else if(commandName === 'message'){

            const text = options.getString('message') 

            var message = {
                userId,
                messageType: 'CHAT',
                text
            }

            var result = await sendMessage(message)
        
            if(result){ 

                embed.setTitle(':speech_balloon: Sended!')
                embed.setDescription(`Chat message: ${text}`)
                embed.setColor('#00ff00')

                await interaction.reply({ embeds: [embed] }) 
                return
            }

            embed.setTitle(':warning: Error')
            embed.setDescription(`Bots are loading ... try again later`)
            embed.setColor('#db1f13')
            
            await interaction.reply({ embeds: [embed] }) 
        }
    })
}

module.exports = {
    listener: listener
  }