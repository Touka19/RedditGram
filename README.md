# RedditGram
Post the best posts from a subreddit into a telegram channel.

# Usage
```
npm install
node main.js -t [Your Telegram Bot Token] -f [An RSS Feed] -c [Chat ID of Channel]
```

# Initial Setup
- Add `@BotFather` on Telegram, and create a new bot with him to get your telegram bot token.
- Go to Zapier, and setup a new 'zap' to create a new RSS feed to get your feed URL. If whatever you're mirroring from already has an RSS feed you can just use that and skip this step. This is written to work with Zapier though - so YMMV with other RSS feeds.
- [Read this guide to get your chat ID](http://stackoverflow.com/questions/33858927/how-to-obtain-the-chat-id-of-a-private-telegram-channel) so that your bot can work, and make sure you add your bot to the channel as an Administrator, not as a Member using whatever client.
- If you want to run this on a raspberry pi, you can `npm install -g forever` and then run the bot with `node main.js -t [Your Telegram Bot Token] -f [An RSS Feed] -c [Chat ID of Channel]`.
