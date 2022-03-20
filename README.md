# Welcome
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

`/clear integer` 
delete n messages that are written no later than 48 hours

### Available functions (in progress)
##
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