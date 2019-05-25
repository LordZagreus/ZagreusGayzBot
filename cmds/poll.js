const agree = "✅"
const disagree = "⛔"
const botsettings=require('../botsettings.json')
const prefix=botsettings.prefix

module.exports.run = async (bot, message, args) => {
  var votemsg1 = message.content
  let votemsg = votemsg1.slice(4+prefix.length)
  var stringarray=votemsg.split(" ")

  votetime=stringarray[1]*1000
  //i hate regular expressions
  if (votetime<=4999) return message.channel.send('Warn: at low poll timers count function may fail to catch votes and/or crash. Please use a vote timer of at least 5 seconds.')
  if (isNaN(votetime)){
  	return message.channel.send("error caught in votetime. poll syntax is !poll [time to keep poll open, in seconds] [text]. please format correctly or i refuse to function properly.")
  }
  let finalcut=votemsg.slice(stringarray[1].length+1)
  let msg = await message.channel.send(finalcut)
  await msg.react(agree)
  await msg.react(disagree)
  const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: votetime})
  message.channel.send(`Voting complete for:${finalcut}\n${agree}: ${reactions.get(agree).count-1}\n${disagree}: ${reactions.get(disagree).count-1}`)

}

module.exports.help = {
  name: "poll"
}
