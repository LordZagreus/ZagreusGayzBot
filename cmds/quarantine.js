module.exports.run = async(bot, message, args) => {
if(!message.channel.permissionsFor(message.member).hasPermission("ADMINISTRATOR") && message.author.id!=226730303526404096) return message.channel.send("You do not have the required permissions to use this command.")
  let toQuarantine = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!toQuarantine) return message.channel.send("You did not specify a user to quarantine. Make sure to use a mention.")
  if (toQuarantine.id==525110453307703298) return
  let role = message.guild.roles.find(r => r.name === "Quarantined")
  if(!role){
    try {
      role =  await message.guild.createRole({
        name: "Quarantined",
        color: "#000001",
        permissions: []
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(role, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          READ_MESSAGES: false,
          READ_MESSAGE_HISTORY: false
          
        })
      })
  } catch (e) {
    console.log(e.stack)
  }
  }if(toQuarantine.roles.has(role.id)) return message.channel.send("This user is already quarantined.")

  await toQuarantine.addRole(role)
  message.channel.send("User has been quarantined.")
  return
}

module.exports.help = {
  name:"quarantine"
}