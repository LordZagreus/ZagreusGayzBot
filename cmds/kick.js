module.exports.run = async(bot, message, args) => {
  const member = message.mentions.members.first()
  var rolekick = message.member.hasPermission('KICK_MEMBERS') || message.author.id==226730303526404096
  if (!rolekick) {
    return message.channel.send(`You do not have the permissions necessary to use this command.`)
  }
  if (!member) {
    return message.channel.send(`Because of lazy hotcode, I can only kick users you \@. UserID and mentionless kicking soon:tm:`)
  }
  if (member.id==226730303526404096) {
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