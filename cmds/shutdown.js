const Discord = require("discord.js")
const botconfig = require("../botsettings.json")
const delay = ms => new Promise(res => setTimeout(res, ms))
const allowedids=226730303526404096
module.exports.run = async(bot, message, args) => {
if (message.author.id!=allowedids){
	message.channel.send("your userid does not match oauth token creator. this instance will be logged.")
} else {
	let msg = await message.channel.send("deleting oauth instance id and shutting down...")
	await delay(2500)
	await message.channel.send("client shutdown complete.")
	process.exit()
}
}
module.exports.help = {
	name: "shutdown"
}