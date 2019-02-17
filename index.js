require('dotenv').config()
const fs = require('fs')
const Discord = require('discord.js')
const botSettings = require('./botsettings.json')
const client = new Discord.Client()
const prefix = botSettings.prefix

fs.readdir('./events/', (err, files) => {
  files.forEach(file => {
    const eventHandler = require(`./events/${file}`)
    const eventName = file.split('.')[0]
    client.on(eventName, arg => eventHandler(client, arg))
  })
})

//refactor mark II begins below

client.on("ready", async () => {
  try {
    let link = await client.generateInvite(["ADMINISTRATOR"])
 } catch(e) {
   console.log(e.stack)
}})


client.on("message", async message => {
  if(message.author.bot) return
  if(message.channel.type === "dm") return

  let messageArray = message.content.split(" ")
  let command = messageArray[0]
  let args = messageArray.slice(1)
  if(!command.startsWith(prefix)) return

  if(command === `${prefix}mute`) {
    if(!message.channel.permissionsFor(message.member).hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You do not have the required permissions to use this command.")
    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!toMute) return message.channel.sendMessage("You did not specify a user to mute.")
    let role = message.guild.roles.find(r => r.name === "Muted");
    if(!role){
      try {
        role =  await message.guild.createRole({
          name: "Muted",
          color: "#000000",
          permissions: []
        })
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(role, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          })
        })
    } catch (e) {
      console.log(e.stack)
    }
    }if(toMute.roles.has(role.id)) return message.channel.sendMessage("This user is already muted.")
    await toMute.addRole(role)
    message.channel.sendMessage("User has been muted.")
    return
  }
})

//NOT PART OF REFACTOR, DO NOT COMMENT OUT BELOW
client.login(botSettings.token)
require('http').createServer().listen()
