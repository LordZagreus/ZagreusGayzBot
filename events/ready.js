module.exports = client => {
  console.log(`Logged in as ${client.user.tag}!`)
  console.log('Awaiting command If \'npm run dev\' used, nodemon will reload this script every\n    time changes are saved..')
  console.log('Bot status should now be online.')
}
