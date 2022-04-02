const auxiliar = require("./auxiliar");
const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const bot = new TelegramBot(process.env.token, { polling: true });
const greetingsFromMessages = auxiliar.greetingsFromMessages;
const fs = require("fs");

/* greetings(); */
clear();
mute();
unmute();
CRUdb();
yes();

function unmute() {
  bot.onText(/^\/kotunmute|^\/размьють|^\/размьютить/, function (ctx) {
    const chatId = ctx.chat.id;
    let lastMsgId = ctx.message_id;
    let value = ctx.text.split(" ")[1].substring(1);
    fs.readFile("db.txt", function (err, ctx) {
      if (ctx.includes(value)) {
        let regex = new RegExp(value + "\\s\\d+");
        console.log(regex);
        let valueAndFirstWhiteSpaceAndAnyDigitsTillAnyLetter = new RegExp(
          value + "\\s\\d+"
        );
        let valueAndWhiteSpaceAndUserId = ctx
          .toString()
          .match(valueAndFirstWhiteSpaceAndAnyDigitsTillAnyLetter);
        let whiteSpaceAndUserId = valueAndWhiteSpaceAndUserId[0]
          .toString()
          .match(/\s\d+/g)[0];
        let userId = whiteSpaceAndUserId.match(/\d+/)[0];
        bot.restrictChatMember(chatId, userId, {
          can_send_messages: true,
          can_invite_users: true,
          can_send_media_messages: true,
          can_send_other_messages: true,
          can_add_web_page_previews: true,
        });
        bot.sendMessage(chatId, `${value} размьючен...`);
        setTimeout(() => {
          bot.deleteMessage(chatId, lastMsgId);
        }, 5000);
      }
    });
  });
}
function mute() {
  bot.onText(/^\/kotmute/, function (ctx) {
    const chatId = ctx.chat.id;
    let lastMsgId = ctx.message_id;
    let milliseconds = ctx.text.split(" ")[2] * 1000;
    let shoutMessage = ctx.text.split(" ").slice(3).join(" ");
    let valueWithAmpersant = ctx.text.split(" ")[1];
    let value = ctx.text.split(" ")[1].substring(1);
    fs.readFile("db.txt", async function (err, ctx) {
      if (ctx.includes(value)) {
        let valueAndFirstWhiteSpaceAndAnyDigitsTillAnyLetter = new RegExp(
          value + "\\s\\d+"
        );
        let valueAndWhiteSpaceAndUserId = ctx
          .toString()
          .match(valueAndFirstWhiteSpaceAndAnyDigitsTillAnyLetter);
        let whiteSpaceAndUserId = valueAndWhiteSpaceAndUserId[0]
          .toString()
          .match(/\s\d+/g)[0];
        let userId = whiteSpaceAndUserId.match(/\d+/)[0];
        console.log(userId);
        bot.restrictChatMember(chatId, userId, {
          can_send_messages: false,
        });
        setTimeout(() => {
          bot.restrictChatMember(chatId, userId, {
            can_send_messages: true,
            can_invite_users: true,
            can_send_media_messages: true,
            can_send_other_messages: true,
            can_add_web_page_previews: true,
          });
        }, milliseconds);
        bot.sendMessage(
          chatId,
          `${valueWithAmpersant} замьючен на ${milliseconds / 1000} секунд, причина: ${shoutMessage}`
        );
        setTimeout(() => {
          bot.deleteMessage(chatId, lastMsgId);
        }, 5000);
      }
    });
  });
}

function CRUdb() {
  bot.on("message", function (ctx) {
    const chatId = ctx.chat.id;
    const text = ctx.text;
    const msgId = ctx.message_id;
    const userName = ctx.from.username;
    const userId = ctx.from.id;
    console.log(ctx);
    readTheFile("db.txt");

    function writeToStream(userName, userId) {
      let stream = fs.createWriteStream("db.txt", { flags: "a" });
      stream.once("open", function () {
        stream.write(`${userName} ${userId}` + "\r\n");
      });
    }
    function isFileDoesntExistYet() {
      if (!fs.existsSync("db.txt")) {
        return true;
      } else {
        return false;
      }
    }
    function isTheStringExistsInTheTxtFile(ctx, userName, userId) {
      if (ctx.includes(`${userName} ${userId}`)) {
        return true;
      } else {
        return false;
      }
    }
    function readTheFile(file) {
      fs.readFile(file, function (err, ctx) {
        if (isFileDoesntExistYet()) {
          writeToStream(userName, userId);
        } else {
          if (err) {
            console.log(err);
          }
          if (isTheStringExistsInTheTxtFile(ctx, userName, userId)) {
            console.log(`${userName} ${userId} already exists in db.txt`);
            return;
          } else {
            writeToStream(userName, userId);
          }
        }
      });
    }
  });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function yes() {
  bot.onText(/\s{1}ко+т\s{1}|ко+т$/i, async function (ctx) {
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
  bot.onText(/^\/kotclear/, async function (ctx) {
    const chatId = ctx.chat.id;
    let value = ctx.text.split(" ")[1];
    let lastMsgId = ctx.message_id;

    //easy validation
    if (5026516200 === ctx.from.id || 500274251 === ctx.from.id) {
      clearHelper(value, chatId, lastMsgId);
    } else {
      return;
    }

    function clearHelper(value, chatId, lastMsgId) {
      if (isNaN(value)) {
        bot.sendMessage(
          chatId,
          "Аргумент к чистке не является числом, отменяю..."
        );
        setTimeout(() => {
          deleteBotResponseAndFirstAfterLastMessage(chatId, lastMsgId);
        }, 3000);
        return;
      } else {
        bot.sendMessage(chatId, "выполняю чистку");
      }

      setTimeout(() => {
        deleteBotResponseAfterOnClearMainLoop();
      }, 2000);

      setTimeout(() => {
        onClearMainLoop(value, chatId, lastMsgId);
      }, 1000);

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

      async function deleteBotResponseAndFirstAfterLastMessage(chatId, lastMsgId) {
        try {
          await bot.deleteMessage(chatId, lastMsgId + 1);
          await bot.deleteMessage(chatId, lastMsgId);
        } catch (e) {
          console.log("message id was not found");
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
    if (text.toLocaleLowerCase() === "здрасте") {
      bot.sendMessage(chatId, "забор покрасте", {
        reply_to_message_id: msgId,
      });
    }
    if (text.toLocaleLowerCase() === "здрасьте") {
      bot.sendMessage(chatId, "забор покрасьте", {
        reply_to_message_id: msgId,
      });
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
                  `${endingOfAWordAtNight()} тебе ${phrasesInRespectToHours()}!`,
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
      const hours = new Date().getHours();
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
