/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
/* eslint-disable no-inner-declarations */

// CRITICAL: CURRENT ENCODER RUNS ON OPUSSCRIPT. THIS MAY CAUSE ERRORS IN CREATING STREAM WHEN PLAYING ON MULTIPLE SHARDS.

const Discord = require('discord.js')
const botSettings = require('../botsettings.json')
const ytdl = require('ytdl-core')
const YouTube = require('simple-youtube-api')
const ytkey = botSettings.youtubekey
const youtube = new YouTube(ytkey)
const queue = new Map()

module.exports.run = async (bot, message, args) => {
  const serverQueue = queue.get(message.guild.id)
  const voiceChannel = message.member.voiceChannel
  if (!voiceChannel) return message.channel.send('You are not in a voice channel.')
  const permissions = voiceChannel.permissionsFor(message.client.user)
  // permissions checks, broken due to deprecations
  if (!permissions.has('CONNECT')) {
    return message.channel.send('Could not connect to the voice channel. Check permissions.')
  }
  if (!permissions.has('SPEAK')) {
    return message.channel.send('I do not have speak permissions for the channel you are in.')
  }
  var queryViaSearch = false
  if (args[0] === 'play') {
    let toVal = args[1].replace(/\s+/g, '')
    let toPlay = toVal
    if (ytdl.validateURL('https://www.youtube.com/watch?v=' + toVal)) {
      toPlay = 'https://www.youtube.com/watch?v=' + toVal
    } else {
      toPlay = message.content.slice(botSettings.prefix.length + 11)
    }
    // old validation check, now deprecated, will remain in case of desired rollback
    // if (!ytdl.validateURL(toVal) && !ytdl.validateURL(toPlay)) return message.channel.send('Only valid YouTube URLs and IDs are accepted.')
    // nested try catch because my brain is simply too large and it looks cooler than just using ifs
    try {
      var video = await youtube.getVideo(toPlay)
    } catch (error) {
      try {
        var videos = await youtube.searchVideos(toPlay, 1)
        var video = await youtube.getVideoByID(videos[0].id)
        queryViaSearch = true
      } catch (error) {
        return message.channel.send('No search results found.')
      }
    }
    // comments below are now deprecated features that remain in case of desired rollback
    // const songInfo = await ytdl.getInfo(toPlay)
    const song = {
      // title: songInfo.title,
      // url: songInfo.video_url
      id: video.id,
      title: video.title,
      url: `https://www.youtube.com/watch?v=${video.id}`
    }

    if (!serverQueue) {
      message.channel.send(`Now playing ${song.title}`)
      if (queryViaSearch === true) message.channel.send(song.url)
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
      } catch (e) {
        console.error(e)
        queue.delete(message.guild.id)
        return message.channel.send(`${e}`)
      }
    } else {
      serverQueue.songs.push(song)
      if (queryViaSearch === true) {
        return message.channel.send(`${song.title} has been added.\n${song.url}`)
      } else {
        return message.channel.send(`${song.title} has been added.`)
      }
    }

    function play (guild, song) {
      const serverQueue = queue.get(guild.id)

      if (!song) {
        // console.log("no songs") --debugging feature
        serverQueue.voiceChannel.leave()
        queue.delete(guild.id)
        return
      }

      const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
      dispatcher.on(`end`, () => {
        // console.log("Song ended.") --debugging feature
        serverQueue.songs.shift()
        play(guild, serverQueue.songs[0])
      })
      dispatcher.on(`error`, error => console.error(error))
      dispatcher.setVolumeLogarithmic(3 / 10)
    }
  } else if (args[0] === 'stop') {
    if (!voiceChannel) return message.channel.send('You must be in a voice channel to use music module.')
    message.member.voiceChannel.leave()
  } else if (args[0] === 'skip') {
    if (!voiceChannel) return message.channel.send('You must be in a voice channel to use music module.')
    if (!serverQueue) return message.channel.send('There is nothing playing.')
    serverQueue.connection.dispatcher.end('Song skipped.')
  } else if (args[0] === 'np') {
    if (!voiceChannel) return message.channel.send('You must be in a voice channel to use music module.')
    if (!serverQueue) return message.channel.send('There is nothing playing.')
    return message.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`)
  } else if (args[0] === 'pause') {
    if (!voiceChannel) return message.channel.send('You must be in a voice channel to use music module.')
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false
      serverQueue.connection.dispatcher.pause()
      return message.channel.send('⏸ Music paused.')
    }
    return message.channel.send('There is nothing playing.')
  } else if (args[0] === 'resume') {
    if (!voiceChannel) return message.channel.send('You must be in a voice channel to use music module.')
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true
      serverQueue.connection.dispatcher.resume()
      return message.channel.send('▶ Music resumed!')
    }
    return message.channel.send('There is nothing playing.')
  } else if (args[0] === 'queue') {
    if (!voiceChannel) return message.channel.send('You must be in a voice channel to use music module.')
    if (!serverQueue) return message.channel.send('There is nothing playing.')
    message.channel.send(`
__**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Currently playing:** ${serverQueue.songs[0].title}
`)
  } else if (args[0] === 'volume') {
    if (!args[1]) return message.channel.send(`🔈 The current volume is: **${serverQueue.volume}**. Append a number to this module to change the volume.`)
    if (args[1] < 1 || args[1] > 10 || args[1] != parseInt(args[1], 10)) return message.channel.send('Volume must be an integer within 1 and 10, inclusive.')
    if (!voiceChannel) return message.channel.send('You must be in a voice channel to use music module.')
    if (!serverQueue) return message.channel.send('There is nothing playing.')
    serverQueue.volume = args[1]
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 10)
    return message.channel.send(`🔈 Volume set to: **${args[1]}**`)
  } else {
    return message.channel.send('Syntax error: correct usage is `!music [play/stop/pause/resume/queue/volume] [youtube link/youtube id/query]`')
  }
}
module.exports.help = {
  name: 'music'
}
