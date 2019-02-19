const agree = "✅"
const disagree = "⛔"
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  var voteargs = message.content
  var votemsg = voteargs.slice(5)
  
  let msg = await message.channel.send(votemsg)
  await msg.react(agree)
  await msg.react(disagree)

  const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: 10000})
  console.log(reactions);
  message.channel.send(`Voting complete\n${agree}: ${reactions.get(agree).count-1}\n${disagree}: ${reactions.get(disagree).count-1}`)

}

module.exports.help = {
  name: "poll"
}
