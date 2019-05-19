
module.exports.run = async(bot, message, args) => {
	var dicesides = message.content.slice(5)
	var diceargs = dicesides.split("d")
	if (isNaN(diceargs[0] || diceargs[1])){
		return message.channel.send("Dice function uses Roll20 syntax. Usage is [#dice to roll]d[#sides/dice]. Please only use integers for any of the indicated fields.")
	}
	
	var curroll=0
	var rolltable=[]
	while (curroll < diceargs[0]){
	let dicenumroll = Math.floor((Math.random() * diceargs[1]) + 1)
	rolltable.push(dicenumroll)
	curroll++
	}
	var rolltableadd=1
	string=rolltable[0]
	while (rolltableadd < diceargs[0]){
		string=string+', '+rolltable[rolltableadd]
		rolltableadd++
	}
message.channel.send(string)
}
module.exports.help = {
	name:"dice"
}