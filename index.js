/* eslint-disable eqeqeq */
require('dotenv').config()
const fs = require('fs')
// var util = require('util')
// var http = require('http')
const Discord = require('discord.js')
const botSettings = require('./botsettings.json')
const bot = new Discord.Client({ disableEveryone: true })
bot.commands = new Discord.Collection()
const prefix = botSettings.prefix
bot.mutes = require('./mutes.json')
bot.blacklist = require('./blacklist.json')
// const queue = new Map()
const dragonServerID = '581291955615563776'
const dragonWelcomeChannelID = '586433510697467914'
const ownerid = botSettings.ownerid
// const delay = ms => new Promise(res => setTimeout(res, ms))

fs.readdir('./cmds', (err, files) => {
  if (err) console.log(err)
  let jsfiles = files.filter(f => f.split('.').pop() === 'js')
  if (jsfiles.length <= 0) {
    return // console.log('No commands to load. Check to see if any files are in the folder.')
  }
  console.log(`Loading ${jsfiles.length} commands.`)

  jsfiles.forEach((f, i) => {
    let props = require(`./cmds/${f}`)
    console.log(`${i + 1}: ${f} loaded.`)
    if (props.help && props.help.name) {
      bot.commands.set(props.help.name, props)
    } else {
      console.error('Error in loading command.')
    }
  })
})

bot.once('ready', async () => {
  try {
  } catch (e) {
    console.log(e.stack)
  }
})

bot.on('guildMemberAdd', (member) => {
  if (member.guild.id != dragonServerID) {
    return
  }
  console.log('new member')
  const guild = bot.guilds.get(dragonServerID)
  const clubMemberRole = guild.roles.find('name', 'Club Members')
  var toReplaceArray = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  var replaceWithArray = ['January', 'February', 'March', 'April', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  var userAccDate = member.user.createdAt.toString()
  userAccDate = userAccDate.substr(0, 15).slice(4)
  for (var i in toReplaceArray) {
    userAccDate = userAccDate.replace(toReplaceArray[i], replaceWithArray[i])
  }
  let embed = new Discord.RichEmbed()
    .setAuthor(`${member.user.username} has joined the server!`)
    .setThumbnail(member.user.displayAvatarURL)
    .addField('Full Username', member.user.tag)
    .addField('User ID', member.user.id)
    .addField('Account Creation Date', userAccDate)
  member.guild.channels.get(dragonWelcomeChannelID).send({ embed: embed })
  member.addRole(clubMemberRole)
})

bot.on('message', async message => {
  if (message.author.bot) return
  if (message.channel.type === 'dm') return
  let messageArray = message.content.split(/\s+/g)
  let command = messageArray[0]
  let args = messageArray.slice(1)
  if (!command.startsWith(prefix)) return
  bot.setInterval(() => {
    for (let i in bot.mutes) {
      let time = bot.mutes[i].time
      let guildId = bot.mutes[i].guild
      let guild = bot.guilds.get(guildId)
      let member = guild.members.get(i)
      let muterole = guild.roles.find(r => r.name === 'Muted')
      if (!muterole) continue

      if (Date.now() > time) {
        member.removeRole(muterole)
        delete bot.mutes[i]
        fs.writeFile('./mutes.json', JSON.stringify(bot.mutes), err => {
          if (err) throw err
        })
      }
    }
  }, 30000)

  for (let i in bot.blacklist) {
    let guildID = bot.blacklist[i].guild
    let guild = bot.guilds.get(guildID)
    let listmember = await guild.members.get(i)
    if (message.author.id == listmember.id && message.author.id != ownerid) return message.reply('Your UserID has been blacklisted.')
  }

  let cmd = bot.commands.get(command.slice(prefix.length))
  if (cmd) {
    try {
      cmd.run(bot, message, args)
    } catch (e) {
      console.log(e.stack)
    }
  }

  // const serverQueue = queue.get(message.guild.id)
})

// alexa responder
bot.on('message', async message => {
  if (message.author.bot) return
  if (message.channel.type === 'dm') return
  if (message.author.id != ownerid) return
  let responsearray = ['Sure thing.', 'OK.', 'Right away.', 'I\'m on it.', 'Alright.', 'I got it.', 'Sure.', 'I don\'t know about that one chief but uh sure I guess']
  let wakeword = message.content.substring(0, 5)
  if (wakeword === 'alexa' || wakeword === 'alexa,') {
    let digitmultiplier = Math.floor(Math.random() * responsearray.length)
    message.channel.send(responsearray[digitmultiplier])
  }
})

bot.login(botSettings.token)
require('http').createServer().listen()
