module.exports = message => {
  const member = message.mentions.members.first()

  if (!member) {
    return message.channel.send(`Because of lazy hotcode, I can only kick users you \@. UserID and mentionless kicking soon:tm:`)
  }

  if (!member.kickable) {
    return message.channel.send(`This user has elevated permissions and cannot be kicked by me.`)
  }

  return member
    .kick()
    .then(() => message.channel.send(`${member.user.tag} was yeeted out of the server.`))
    .catch(error => message.channel.send(`Error caught in kick. Try again or refactor code you lazy dumbass`))

}
