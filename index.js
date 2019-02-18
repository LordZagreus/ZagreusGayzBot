require('dotenv').config()
const fs = require('fs')
const Discord = require('discord.js')
const botSettings = require('./botsettings.json')
const bot = new Discord.Client()
bot.commands = new Discord.Collection()
const prefix = botSettings.prefix

fs.readdir('./cmds', (err, files) => {
  if(err) console.log(err)
  let jsfiles = files.filter(f => f.split(".").pop() === "js")
  if(jsfiles.length <= 0){
    console.log("No commands to load. Check to see if any files are in the folder.")
    return
  }
  console.log(`Loading ${jsfiles.length} commands.`)

  jsfiles.forEach((f, i) => {
    let props = require(`./cmds/${f}`)
    console.log(`${i + 1}: ${f} loaded.`)
    if (props.help && props.help.name) {
      bot.commands.set(props.help.name, props)
    } else{
      console.error("Not refactored.")
    }

    
  })
})

bot.on("ready", async () => {
  try {
 } catch(e) {
   console.log(e.stack)
}})


bot.on("message", async message => {
  if(message.author.bot) return
  if(message.channel.type === "dm") return

  let messageArray = message.content.split(/\s+/g)
  let command = messageArray[0]
  let args = messageArray.slice(1)

  if(!command.startsWith(prefix)) return

  let cmd = bot.commands.get(command.slice(prefix.length))
  if(cmd) cmd.run(bot, message, args)

})


//NOT PART OF REFACTOR, DO NOT COMMENT OUT BELO
bot.login(botSettings.token)
require('http').createServer().listen()
