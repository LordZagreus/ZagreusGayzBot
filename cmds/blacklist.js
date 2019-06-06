const fs = module.require("fs")
var util = require('util')
var http = require('http')
module.exports.run = async(bot, message, args) => {
let ownerID=226730303526404096
if (message.author.id!=ownerID) return message.channel.send("Only the bot owner can interact with blacklist module.")
var toBList = message.guild.member(message.mentions.users.first())
if (args[0]==="add"){
	bot.blacklist[toBList.id]={
    guild: message.guild.id
  		}
  	fs.writeFile("./blacklist.json", JSON.stringify(bot.blacklist, null, 4), err => {
    if (err) throw err
    message.channel.send(`User has been blacklisted.`)
  	})
} else if (args[0]==="remove"){
	delete bot.blacklist[toBList.id]
	fs.writeFile("./blacklist.json", JSON.stringify(bot.blacklist), err => {
		if (err) throw err
		message.channel.send("User has been removed from blacklist.")
	})
} else {
	return message.channel.send("Syntax error. Correct usage is !blacklist [add/remove] [@user]")
}
}
module.exports.help = {
	name: "blacklist"
}
