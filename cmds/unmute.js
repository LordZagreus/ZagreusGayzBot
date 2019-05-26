const fs = module.require("fs")

module.exports.run = async(bot, message, args) => {
if(!message.channel.permissionsFor(message.member).hasPermission("ADMINISTRATOR")&&message.author.id!=226730303526404096) return message.channel.sendMessage("You do not have the required permissions to use this command.")
  let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!toMute) return message.channel.send("You did not specify a user to unmute. Make sure to use a mention.")

  let role = message.guild.roles.find(r => r.name === "Muted")
  if (!role || !toMute.roles.has(role.id)) return message.channel.send("This user is not muted.")

  await toMute.removeRole(role)
	delete bot.mutes[toMute.id]
	fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err =>{
		if (err) throw err
	})
  message.channel.send("User unmuted.")
}

module.exports.help = {
	name:"unmute"
}