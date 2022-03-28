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

### Available commands (in progress)
##

`/kotclear positiveInteger` 
delete n messages that are written no later than 48 hours

`/kotmute username timeInSeconds`
mute a user for n time
note if user is mutted less then 30 seconds or more than 366 days it's considered to be mutted forever

`/kotunmute username`
unmute a user
### Available functions (in progress)
##
```
CRUdb()  
```
##
creates a db.txt file for you where stores all chat members username/id
only after they wrote any message, this is need for `/kotmute /kotunmute` to work.

```
greetings()  
```
##
auto-reply to any greetings in russian depending on hours` till 12:00 morning, till 17:00 day, till 21:00 evening then night

```
yes()
```
answer yes то any regexp that matches `/ко+т/i`

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.