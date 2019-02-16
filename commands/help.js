module.exports = message => {
 message.channel.send({embed: {
  color: 3447003,
  author: {
      name: message.client.username,
      icon_url: message.client.avatarURL
    },
  title: "Welcome to ZagreusGayzBot, a basic WIP open source moderation and utility bot.",
  description: "[Click this link to visit the GitHub repository.](https://github.com/LordZagreus/ZagreusGayzBot)",
  fields: [{
    name: "Commands",
    value: "Current functional commands: [!ban \@user] and [!kick \@user]"
  },
],
  timestamp: new Date(),
  footer: {
      icon_url: message.client.avatarURL
    }
  }
});}
