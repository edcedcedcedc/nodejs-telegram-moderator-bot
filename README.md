# Welcome to the kot moderator
This is a telegram bot using `nodejs` and [`node-telegram-bot-api`](https://github.com/yagop/node-telegram-bot-api.git) to manipulate the official telegram [api](https://core.telegram.org/api).

## Installation

Open the terminal from a folder then use git to clone this repository
```bash
git clone https://github.com/androranogajec/nodejs-telegram-moderator-bot.git
```
Install npm dependencies 
```
npm install
```
Generate yourself a telegram token and paste it in .env `token` variable
```
./ .env
```

### Available commands
##

`/kotclear positiveInteger` 
delete n messages that are written no later than 48 hours

`/kotmute username timeInSeconds reasonString`
mute a user for n seconds,
note if user is mutted less then 30 seconds or more than 366 days it's considered to be mutted forever

> example: `/kotmute @ping_admin 60 петух` you should see a shoutout response messages from the kot: `@ping_admin was mutted for 60 seconds, reason петух`

`/kotunmute username`
unmute a user
