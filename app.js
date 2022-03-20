const auxiliar = require("./auxiliar");
const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const bot = new TelegramBot(process.env.token, { polling: true });
const greetingsFromMessages = auxiliar.greetingsFromMessages;
const hours = new Date().getHours();

console.log(process.env.token);

greetings();
clear();
consoleMessageWatcher();
yes();

function consoleMessageWatcher() {
  bot.on("message", function (ctx) {
    const chatId = ctx.chat.id;
    const text = ctx.text;
    const msgId = ctx.message_id;
    console.log("message object", ctx);
   
  });
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function yes() {
  bot.onText(/ко+т/i, async function (ctx) {
    const msgId = ctx.message_id;
    const chatId = ctx.chat.id;
    const toIndividualLetterArray = [...ctx.text];
    const lengthOfTheLettersInBetweenFirstAndLast =
      toIndividualLetterArray.length - 2;

    function regularOrTailedResponse() {
      if (lengthOfTheLettersInBetweenFirstAndLast > 2) {
        let array = ["да"];
        for (
          let i = 0;
          i < getRandomInt(lengthOfTheLettersInBetweenFirstAndLast + 3);
          i++
        ) {
          array.push("a");
        }
        return array.join("");
      }
      return "да";
    }
    try {
      await bot.sendChatAction(chatId, "typing");
      await bot.sendMessage(
        chatId,
        regularOrTailedResponse(lengthOfTheLettersInBetweenFirstAndLast),
        {
          reply_to_message_id: msgId,
        }
      );
    } catch (e) {
      console.log("");
    }
  });
}

function clear() {
  bot.onText(/^\/clear/, async function (ctx) {
    const chatId = ctx.chat.id;
    let value = ctx.text.split(" ")[1];
    let lastMsgId = ctx.message_id;

    if (isNaN(value)) {
      bot.sendMessage(
        chatId,
        "Аргумент к чистке не является числом, отменяю..."
      );
      setTimeout(() => {
        deleteBotResponseAndFirstAfterLastMessage();
      }, 3000);
      return;
    } else {
      bot.sendMessage(chatId, "Выполняю чистку...");
    }

    setTimeout(() => {
      deleteBotResponseAfterOnClearMainLoop();
    }, 2000);

    setTimeout(() => {
      onClearMainLoop(value, chatId, lastMsgId);
    }, 1000);

    async function deleteBotResponseAndFirstAfterLastMessage() {
      try {
        await bot.deleteMessage(chatId, lastMsgId + 1);
        await bot.deleteMessage(chatId, lastMsgId);
      } catch (e) {
        console.log("message id was not found");
      }
    }

    async function deleteBotResponseAfterOnClearMainLoop() {
      try {
        await bot.deleteMessage(chatId, lastMsgId + 1);
      } catch (e) {
        console.log("message id was not found");
      }
    }

    async function onClearMainLoop(value, chatId, lastMsgId) {
      while (value !== -1) {
        try {
          await bot.deleteMessage(chatId, lastMsgId);
          console.log("message deleted", lastMsgId);
          value--;
          lastMsgId--;
        } catch (e) {
          console.log("message id was not found");
          lastMsgId--;
        }
      }
    }
  });
}

function greetings() {
  bot.on("message", function (ctx) {
    let userName = "";
    userName = userNameOrFirstNameHelper(ctx);
    const chatId = ctx.chat.id;
    const msgId = ctx.message_id;
    const text = ctx.text;
    greetingsHelper(chatId, userName, text.toLocaleLowerCase(), msgId);
    
    //exceptions
    if(text.toLocaleLowerCase() === 'здрасте'){
      bot.sendMessage(chatId,'забор покрасте',{
        reply_to_message_id: msgId
      })
    }
    if(text.toLocaleLowerCase() === 'здрасьте'){
      bot.sendMessage(chatId,'забор покрасьте',{
        reply_to_message_id: msgId
      })
    }
  
    function userNameOrFirstNameHelper(ctx) {
      if (ctx.from.username === undefined) {
        return (userName = ctx.from.first_name);
      } else {
        return (userName = ctx.from.username);
      }
    }

    function greetingsHelper(chatId, userName, text, msgId) {
      greetingsFromMessages.forEach(function (e) {
        let toArray = text.split(" ");
        if (toArray.length >= 2) {
          toArray.forEach(function (j) {
            if (e === j) {
              bot.sendChatAction(chatId, "typing");
              setTimeout(() => {
                bot.sendMessage(
                  chatId,
                  `/* ${userName}  */${endingOfAWordAtNight()} тебе ${phrasesInRespectToHours()}!`,
                  {
                    reply_to_message_id: msgId,
                  }
                );
              }, getRandomInt(4000));
            }
          });
        }
        if (e === text) {
          bot.sendChatAction(chatId, "typing");
          setTimeout(() => {
            bot.sendMessage(
              chatId,
              `${endingOfAWordAtNight()} тебе ${phrasesInRespectToHours()}!`,
              {
                reply_to_message_id: msgId,
              }
            );
          }, getRandomInt(4000));
        }
      });
    }

    function phrasesInRespectToHours() {
      if (hours > 6 && hours < 12) {
        return "утра";
      } else if (hours >= 12 && hours < 17) {
        return "дня";
      } else if (hours >= 17 && hours < 21) {
        return "вечера";
      } else {
        return "ночи";
      }
    }

    function endingOfAWordAtNight() {
      if (phrasesInRespectToHours() === "ночи") {
        return "доброй";
      }
      return "доброго";
    }
  });
}
