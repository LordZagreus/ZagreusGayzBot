const fs = module.require("fs")
var util = require('util')
var http = require('http')
const botconfig = require("../botsettings.json")
const ownerid = botconfig.ownerid
module.exports.run = async(bot, message, args) => {
var admin = message.member.hasPermission('ADMINISTRATOR')
if (message.author.id!=ownerid&&!admin) return message.channel.send("Only administrators can interact with blacklist module.")
var toBList = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
if (!toBList) return message.channel.send("Specify a user to blacklist.")
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

