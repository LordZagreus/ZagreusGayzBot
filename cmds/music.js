const Discord = require('discord.js')
const ytdl = require("ytdl-core")
const queue = new Map()

module.exports.run = async(bot, message, args) => {
	const serverQueue = queue.get(message.guild.id)
	const voiceChannel = message.member.voiceChannel
	if (!voiceChannel) return message.channel.send("You are not in a voice channel.")
	const permissions = voiceChannel.permissionsFor(message.client.user)
	// if (!permission.has("CONNECT")) {
	// 	message.channel.send("Could not connect to the voice channel. Check permissions.")
	// }
	// if (!permissions.has("SPEAK")) {
	// 	message.channel.send("I do not have speak permissions.")
	// }
if (args[0]==="play"){
	let link = args[1].replace(/\s+/g, '')
	if(ytdl.validateID(link!=true)) return message.channel.send("Only valid YouTube URLs are accepted.")
	const songInfo = await ytdl.getInfo(args[1])
	const song = {
		title: songInfo.title,
		url: songInfo.video_url
	}

	if (!serverQueue) {
		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 3,
			playing: true
		}
		queue.set(message.guild.id, queueConstruct)
		queueConstruct.songs.push(song)

	try {
		var connection = await voiceChannel.join()
		queueConstruct.connection = connection
		play(message.guild, queueConstruct.songs[0])
	} catch (e){
		console.error(e)
		queue.delete(message.guild.id)
		return message.channel.send(`${e}`)
	}
	} else {
		serverQueue.songs.push(song)
		return message.channel.send(`${song.title} has been added.`)
	}

function play(guild, song){
	const serverQueue=queue.get(guild.id)

	if (!song){
		console.log("no songs")
		serverQueue.voiceChannel.leave()
		queue.delete(guild.id)
		return
	}

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url), {filter: "audioonly"})
	dispatcher.on(`end`, () => {
		console.log("Song ended.")
		serverQueue.songs.shift()
		play(guild, serverQueue.songs[0])
	})
	dispatcher.on(`error`, error => console.error(error))
	dispatcher.setVolumeLogarithmic(3/10)
}
} else if (args[0]==="stop") {
	if (!voiceChannel) return message.channel.send('You must be in a voice channel to use music module.');
	message.member.voiceChannel.leave()
} else if (args[0]==="skip") {
	if (!voiceChannel) return message.channel.send('You must be in a voice channel to use music module.');
	if (!serverQueue) return message.channel.send('There is nothing playing.');
	serverQueue.connection.dispatcher.end('Song skipped.');
} else if (args[0]==="np") {
	if (!voiceChannel) return message.channel.send('You must be in a voice channel to use music module.');
	if (!serverQueue) return message.channel.send('There is nothing playing.');
	return message.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
} else if (args[0]==="pause") {
	if (!voiceChannel) return message.channel.send('You must be in a voice channel to use music module.');
	if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return message.channel.send('⏸ Music paused.');
		}
		return message.channel.send('There is nothing playing.');
} else if (args[0]==="resume") {
	if (!voiceChannel) return message.channel.send('You must be in a voice channel to use music module.');
	if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return message.channel.send('▶ Music resumed!');
		}
		return message.channel.send('There is nothing playing.');
} else if (args[0]==="queue") {
	if (!voiceChannel) return message.channel.send('You must be in a voice channel to use music module.');
	if (!serverQueue) return message.channel.send('There is nothing playing.');
		return message.channel.send(`
__**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Currently playing:** ${serverQueue.songs[0].title}
`);
} else if (args[0]==="volume"){
	if (args[1]<1 || args[1]>10 || args[1]!=parseInt(args[1],10)) return message.channel.send('Volume must be an integer within 1 and 10, inclusive.')
	if (!voiceChannel) return message.channel.send('You must be in a voice channel to use music module.');
		if (!serverQueue) return message.channel.send('There is nothing playing.');
		if (!args[1]) return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1]/10);
		return message.channel.send(`🔈 Volume set to: **${args[1]}**`);
} else {
	return message.channel.send("Syntax error: correct usage is `!music [play/stop/pause/resume/queue] [youtube link]`")
}
}
module.exports.help = {
	name: "music"
}
