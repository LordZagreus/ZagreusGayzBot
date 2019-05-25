const botsettings=require('../botsettings.json')
const prefix=botsettings.prefix

module.exports.run = async(bot, message, args) => {
	var dicesides = message.content.slice(4+prefix.length)
	var diceargs = dicesides.split("d")
	if (diceargs[0]==" "){
		message.channel.send("Number of dice to roll not set. Defaulting to 1.")
		diceargs[0]=1
	}
	if (isNaN(diceargs[0] || diceargs[1]) || diceargs[0]<=0 || diceargs[1] <=0 || diceargs[0]%1!=0 || diceargs[1]%1!=0){
		return message.channel.send("Dice function uses Roll20 syntax. Usage is [#dice to roll]d[#sides/dice]. Please only use integers for any of the indicated fields.")
	}
	
	if (diceargs[0]>300 || diceargs[1]>300){
		return message.channel.send("Due to form restrictions, please keep the number of dice rolled and the number of sides per dice under 300.")
	}
	var curroll=0
	var total=0
	var rolltable=[]
	while (curroll < diceargs[0]){
	let dicenumroll = Math.floor((Math.random() * diceargs[1]) + 1)
	total+=dicenumroll
	rolltable.push(dicenumroll)
	curroll++
	}
	let average=total/diceargs[0]
	let ravg= +average.toFixed(3)
	var rolltableadd=1
	string=rolltable[0]
	while (rolltableadd < diceargs[0]){
		string=string+', '+rolltable[rolltableadd]
		rolltableadd++
	}
message.channel.send(string)
if (diceargs[0]>1) message.channel.send("Average: "+ravg)
}
module.exports.help = {
	name:"dice"
}