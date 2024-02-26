const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const semesters = require("./keyboards/semesters");
const modules = require("./keyboards/modules");
const contents = require("./keyboards/contents");
const courses = require("./keyboards/courses");
const documentActions = require("./actions/documentActions");
const menuActions = require("./actions/menuActions");

const token = process.env.BOT_TOKEN || "bot token";
const bot = new TelegramBot(token, { polling: true });
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;
  if (messageText === "/start") {
    // Send the menu of semesters
    const replyMarkup = {
      inline_keyboard: semesters,
    };
    bot.sendMessage(chatId, "Please choose a semester:", {
      reply_markup: replyMarkup,
    });
  }
});

// Handle callback queries (when a button is pressed)
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  const chosenCommand = query.data;
  console.log(`chosen command: ${chosenCommand}`);

  const menuAction = menuActions[chosenCommand];
  if (menuAction) {
    if (menuAction.replyMarkup && menuAction.text) {
      bot.editMessageText(menuAction.text, {
        chat_id: chatId,
        message_id: query.message.message_id,
      });
      bot.editMessageReplyMarkup(
        { inline_keyboard: menuAction.replyMarkup.inline_keyboard },
        { chat_id: chatId, message_id: query.message.message_id }
      );
    }
    return;
  }

  const documentAction = documentActions[chosenCommand];
  if (documentAction) {
    try {
      bot.sendDocument(chatId, documentAction.filePath);
      console.log("File sent successfully");
    } catch (error) {
      console.error("Error sending file:", error);
    }
  }
});
