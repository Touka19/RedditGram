import os
from flask import Flask
from telethon import TelegramClient, events

API_ID = os.getenv("API_ID")
API_HASH = os.getenv("API_HASH")
BOT_TOKEN = os.getenv("BOT_TOKEN")


bot = TelegramClient('ISTHIS', API_ID, API_HASH).start(bot_token=BOT_TOKEN) 

@bot.on(events.NewMessage(pattern='/start'))
async def send_welcome(event):
    await event.reply('Howdy, how are you doing?')

@bot.on(events.NewMessage)
async def echo_all(event):
    await event.reply(event.text)

@app.route('/')
def hello_world():
    return 'Hello World!'

if __name__ == '__main__':
    app.run()
    bot.run_until_disconnected()
