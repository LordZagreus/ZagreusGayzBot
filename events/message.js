const kick = require('../commands/kick')
const ban = require('../commands/ban')
const help = require('../commands/help')
const poll = require('../commands/poll')

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
  if (message.content.startsWith('!poll')) {
    return poll(message)
  }
}
