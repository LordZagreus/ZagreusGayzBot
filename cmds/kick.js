const botsettings = require('../botsettings.json')
module.exports.run = async(bot, message, args) => {
  const member = message.mentions.members.first() || message.guild.members.get(args[0])
  var rolekick = message.member.hasPermission('ADMINISTRATOR')
  if (!rolekick&&message.author.id!=botsettings.ownerid) {
    return message.channel.send(`You do not have the permissions necessary to use this command.`)
  }
  if (!member) {
    return message.channel.send(`No user specified.`)
  }
  if (member.id==botsettings.ownerid) {
    return message.channel.send("not cool bro")
  }

  if (!member.kickable) {
    return message.channel.send(`This user has elevated permissions and cannot be kicked by me.`)
  }

  return member
    .kick()
    .then(() => message.channel.send(`${member.user.tag} was yeeted out of the server.`))
    .catch(error => message.channel.send(`Error caught in kick. Code probably spaget.`))

}

module.exports.help = {
  name:"kick"
}