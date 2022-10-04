var fetch = require('./fetch.js');
var fs = require('fs');
var TelegramBot = require('node-telegram-bot-api');

const token = process.env.TOKEN
  var uuid = 'troll';

  fs.readFile('guid','utf8',function(err,buff){
      uuid = buff;
  })

  var resp = 'ERROR'

  //const bot = new TelegramBot(token, {polling: false});
  const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});

  var minutes = 1, the_interval = minutes * 60 * 1000;

  setInterval(function() {
    console.log("Checking reddit for new posts...");
    fetch.obtain('https://reddit.0qz.fun/r/android.json')
      .then(function(data) {
        var parsed = JSON.parse(data)
        resp = parsed['title'] + ' ' + parsed['url']
        if (parsed['guid'] == uuid) {
          // Do nothing!
        } else {
          console.log('Found something new!');
          bot.sendMessage('5071059420', parsed['title'] + ' ' + parsed['url']);
          uuid = parsed['guid'];
          fs.writeFile('guid',uuid,function(){})
        }
        console.log(parsed['guid']);
      })
      .catch(function(error) {
        console.log('Error! ', error);
      });
  }, the_interval);

bot.on('polling_error', (error) => {
  console.log(error.code);  // => 'EFATAL'
});

bot.on('webhook_error', (error) => {
  console.log(error.code);  // => 'EPARSE'
});
