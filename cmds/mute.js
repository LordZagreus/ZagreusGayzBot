module.exports.run = async(bot, message, args) => {
if(!message.channel.permissionsFor(message.member).hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You do not have the required permissions to use this command.")
  let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!toMute) return message.channel.send("You did not specify a user to mute. Make sure to use a mention.")
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
  }if(toMute.roles.has(role.id)) return message.channel.send("This user is already muted.")
  await toMute.addRole(role)
  message.channel.send("User has been muted.")
  return
}

module.exports.help = {
  name:"mute"
}