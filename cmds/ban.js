const botsettings=require('../botsettings.json')
module.exports.run = async(bot, message, args) => {
  const member = message.mentions.members.first() || message.guild.members.get(args[0])
  var roleban = message.member.hasPermission('ADMINISTRATOR')
  if (!roleban&&message.author.id!=botsettings.ownerid) {
    return message.channel.send(`You do not have the permissions necessary to use this command.`)
  }
  if (!member) {
    return message.channel.send(`No member specified.`)
  }
  if (member.id==botsettings.ownerid||member.id==525110453307703298) {
    return message.channel.send("not cool bro")
  }

  if (!member.kickable) {
    return message.channel.send(`This user has a higher perm int than me.`)
  }


  return member
    .ban()
    .then(() => message.channel.send(`${member.user.tag} was permanently yeeted out of the server.`))
    .catch(error => message.channel.send(`Error caught in ban. Just rclick and manually ban lazyass`))

}

module.exports.help = {
  name:"ban"
}
