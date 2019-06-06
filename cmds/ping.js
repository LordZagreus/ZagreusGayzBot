module.exports.run = async(bot, message, args) => {
var resMsg = await message.channel.send('Ping is being appreciated...');
	ping=Math.round((resMsg.createdTimestamp - message.createdTimestamp) - bot.ping)
    resMsg.edit('Ping: ' +ping+' ms');
if (ping>=500) {
	message.channel.send("Ping calculation is based on message timestamps and client ping. May inflate numbers, hence the high number above. Or you just have really bad internet.")
}
}

module.exports.help = {
	name: "ping"
}