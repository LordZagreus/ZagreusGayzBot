const Discord = module.require('discord.js')
module.exports.run = async (bot, message, args) => {
  let member = message.mentions.members.first() || message.member
  	user = member.user
  let embed = new Discord.RichEmbed()
    .setAuthor(`User Information for ${message.author.username}`)
    .setThumbnail(message.author.displayAvatarURL)
    .setAuthor(`User Information for ${user.username}`)
    .setThumbnail(user.displayAvatarURL)
    .setColor("#0073CF")
    .addField("Full Username", user.tag)
    .addField("Discord ID", message.author.id)
    .addField("Roles", member.roles.map(r => `${r}`).join(' | '), true)
    .addField("Latest Server Join Date", user.joinedAt)
    //above always returns undefined for some reason
    .addField("Account Creation Date", user.createdAt)

  message.channel.send({embed: embed})

}

module.exports.help = {
  name: "userinfo"
}
