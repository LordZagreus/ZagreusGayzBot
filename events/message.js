const kick = require('../commands/kick')
const ban = require('../commands/ban')
const help = require('../commands/help')

module.exports = (client, message) => {

  if (message.content.startsWith('!kick')) {
    return kick(message)
  }
  if (message.content.startsWith('!ban')) {
    return ban(message)
  }
  if (message.content.startsWith('!help')) {
    return help(message)
  }
}
