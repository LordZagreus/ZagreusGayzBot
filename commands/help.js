module.exports = message => {
 message.channel.send({embed: {
  color: 3447003,

  author: {
     name: "ZagreusGayzBot",
     icon_url: "https://cdn.discordapp.com/avatars/525110453307703298/7e642d1cae38e76491a3a9d6a6219485.png"
   },
  title: "Welcome to ZagreusGayzBot, a basic WIP open source moderation and utility bot.",
  description: "[Click this link to visit the GitHub repository.](https://github.com/LordZagreus/ZagreusGayzBot)",
  fields: [{
    name: "Commands",
    value: "Current functional commands: [!ban \@user] and [!kick \@user]"
  },
],
  footer: {
    text:"֎Bidoof֎#1234 is the creator of this bot. PM for troubleshooting.",
    icon_url: message.author.avatarURL
  }
  }
});}
