var cli = require('commander');
var fetch = require('./fetch.js');
var fs = require('fs');
var TelegramBot = require('node-telegram-bot-api');

cli
  .version('0.0.1')
  .option('-t, --token [token]', 'Add peppers')
  .option('-d, --debug', 'To test out the program.')
  .parse(process.argv);

  if (cli.debug) {
    console.log('Test Successful!')
    process.exit(0);
  }

  if (cli.token) {
    // We are all good!
  } else {
    console.log('Hey! You need to specify a token for the Telegram Bot to run on!');
    process.exit(1);
  }

  var uuid = 'troll';

  fs.readFile('guid','utf8',function(err,buff){
      uuid = buff;
  })

  var resp = 'ERROR'

  var bot = new TelegramBot(cli.token, {polling: true});

  var minutes = 15, the_interval = minutes * 60 * 1000;

  setInterval(function() {
    console.log("Checking reddit for new posts...");
    fetch.obtain('https://zapier.com/engine/rss/999118/funnyreddit/')
      .then(function(data) {
        var parsed = JSON.parse(data)
        resp = parsed['title'] + ' ' + parsed['url']
        if (parsed['guid'] == uuid) {
          // Do nothing!
        } else {
          console.log('Found something new!');
          bot.sendMessage('-1001044264759', parsed['title'] + ' ' + parsed['url']);
          uuid = parsed['guid'];
          fs.writeFile('guid',uuid,function(){})
        }
        console.log(parsed['guid']);
      })
      .catch(function(error) {
        console.log('Error! ', error);
      });
  }, the_interval);
