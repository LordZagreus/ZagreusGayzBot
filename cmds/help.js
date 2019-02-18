const Discord = module.require('discord.js')
module.exports.run = async(bot, message, args) => {
let embed = new Discord.RichEmbed()
    .setTitle("Welcome to ZagreusGayzBot, a basic WIP open source moderation and utility bot.")
    .setAuthor("ZagreusGayzBot", "https://cdn.discordapp.com/avatars/525110453307703298/7e642d1cae38e76491a3a9d6a6219485.png")
    .setDescription(`[Click this link to visit the GitHub repository.](https://github.com/LordZagreus/ZagreusGayzBot)`)
    .setColor("#0073CF")
    .setFooter("֎Bidoof֎#1234 is the creator of this bot. PM for troubleshooting.", "https://cdn.discordapp.com/attachments/546132606635343872/546842386421121025/avatar.png")
    .addField("Moderation Commands", "[!ban \@user], [!kick \@user], [!(un)mute \@user]")
    .addField("Other Commands", "[!avatar], [!userinfo]")
message.channel.send({embed})
}

module.exports.help = {
  name:"help"
}
