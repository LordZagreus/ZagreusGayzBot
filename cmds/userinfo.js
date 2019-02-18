const Discord = module.require('discord.js')
module.exports.run = async (bot, message, args) => {
  let embed = new Discord.RichEmbed()
    .setAuthor(`User Information for ${message.author.username}`)
    .setThumbnail(message.author.displayAvatarURL)
    .setColor("#0073CF")
    .addField("Full Username", message.author.tag)
    .addField("Discord ID", message.author.id)
    .addField("Account Creation Date", message.author.createdAt)

  message.channel.send({embed: embed})

}

module.exports.help = {
  name: "userinfo"
}
