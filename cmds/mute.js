const fs = module.require("fs")

module.exports.run = async(bot, message, args) => {
if(!message.channel.permissionsFor(message.member).hasPermission("ADMINISTRATOR") && message.author.id!=226730303526404096) return message.channel.send("You do not have the required permissions to use this command.")
  let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!toMute) return message.channel.send("You did not specify a user to mute. Make sure to use a mention.")
  if (toMute.id==525110453307703298) return message.channel.send("Nah fam")
  let role = message.guild.roles.find(r => r.name === "Muted")
  if(!role){
    try {
      role =  await message.guild.createRole({
        name: "Muted",
        color: "#000001", //idk why discord doesnt let me use pure black thats kinda racist
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
  }if(toMute.roles.has(role.id)) return message.channel.send("This user is already muted.")
  if (args.length==2){
    bot.mutes[toMute.id]={
    guild: message.guild.id,
    time: Date.now() + parseInt(args[1]) * 1000
  }
  fs.writeFile("./mutes.json", JSON.stringify(bot.mutes, null, 4), err => {
    if (err) throw err
    message.channel.send(`User has been muted for ${args[1]} seconds.`)
  })
}
  await toMute.addRole(role)
  if (args.length==1) message.channel.send("User has been muted.")
  return
}

module.exports.help = {
  name:"mute"
}