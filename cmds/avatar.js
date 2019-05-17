module.exports.run = async(bot, message, args) => {
	let member = message.mentions.members.first() || message.member
	  user = member.user
	let msg = await message.channel.send("Generating avatar...")
	await message.channel.send({files:[
	{
		attachment: user.displayAvatarURL,
		name: "avatar.png"
	}
		
	]})
	msg.delete()
}

module.exports.help = {
	name: "avatar"
}
