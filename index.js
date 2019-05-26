require('dotenv').config()
const fs = require('fs')
const Discord = require('discord.js')
const botSettings = require('./botsettings.json')
const bot = new Discord.Client({disableEveryone: true})
bot.commands = new Discord.Collection()
const prefix = botSettings.prefix
bot.mutes = require('./mutes.json')

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
      console.error("Error in loading command.")
    }
 })
})

bot.on("ready", async () => {
  try {
 } catch(e) {
   console.log(e.stack)
}
  bot.setInterval(()=>{
    for (let i in bot.mutes){
      let time = bot.mutes[i].time
      let guildId = bot.mutes[i].guild 
      let guild = bot.guilds.get(guildId)
      let member = guild.members.get(i)
      let muterole = guild.roles.find(r => r.name === "Muted")
      if (!muterole) continue

      if (Date.now() > time){
        member.removeRole(muterole)
        delete bot.mutes[i]
        fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
          if (err) throw err
        })
      }
    }
  }, 5000)
})

bot.on("message", async message => {
  if(message.author.bot) return
  if(message.channel.type === "dm") return
  //bot blacklist below. 
  //current array is [ToxicScorpius, (null)]
  // const blacklist = ['408694410440736778']
  // for (let i = 0; i < blacklist.length; i++) {
  // if (message.author.id === blacklist[i]) return message.reply('your userID has been blacklisted')
  // }
  let messageArray = message.content.split(/\s+/g)
  let command = messageArray[0]
  let args = messageArray.slice(1)

  if(!command.startsWith(prefix)) return

  let cmd = bot.commands.get(command.slice(prefix.length))
  if(cmd) cmd.run(bot, message, args)
})

//wheelchair deletion code, disabled for now
// bot.on('messageReactionAdd', (reaction, user, message) => {
//   let limit = 2;
//   if (reaction.emoji.name == '♿' && reaction.count >= limit) reaction.message.delete();
// })

bot.login(botSettings.token)
require('http').createServer().listen()