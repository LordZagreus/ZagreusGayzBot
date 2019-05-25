const Discord = module.require('discord.js')
module.exports.run = async(bot, message, args) => {
let embed = new Discord.RichEmbed()
    .setTitle("Welcome to ZagreusGayzBot, a basic WIP open source moderation and utility bot.")
    .setAuthor("ZagreusGayzBot", "https://cdn.discordapp.com/avatars/525110453307703298/7e642d1cae38e76491a3a9d6a6219485.png")
    .setDescription(`[Click this link to visit the GitHub repository.](https://github.com/LordZagreus/ZagreusGayzBot)`)
    .setColor("#0073CF")
    .setFooter("֎Bidoof֎#9492 is the creator of this bot.", "https://cdn.discordapp.com/avatars/226730303526404096/c9ed700d5e566344dd7001d2e97ae736.png")
    .addField("Moderation Commands", "[!ban \@user], [!kick \@user], [!(un)mute \@user]")
    .addField("Other Commands", "[!pfp], [!userinfo \@user], [!poll (poll timer in seconds) (text)], [!img (image query)], and various other commands but this list is too long already.")
message.channel.send({embed})
}

module.exports.help = {
  name:"help"
}
