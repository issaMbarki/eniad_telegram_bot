const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const semesters = require("./keyboards/semesters");
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

// variable to store the latest message, to ensure that the message containing an inline keyboard is sent after sending a document.
let latest_message;

// Handle callback queries (when a button is pressed)
bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;
  const chosenCommand = query.data;
  const menuAction = menuActions[chosenCommand];
  console.log(`chosen command: ${chosenCommand}`);

  if (menuAction && menuAction.replyMarkup && menuAction.text) {
    const keyboard = menuAction.replyMarkup.inline_keyboard;
    latest_message = await bot.editMessageText(menuAction.text, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: {
        inline_keyboard: keyboard,
      },
    });
    return;
  }

  const documentAction = documentActions[chosenCommand];
  if (documentAction) {
    try {
      // TODO: verify if sendChatAction is useful
      // bot.sendChatAction(chatId,'upload_document')
      bot.deleteMessage(chatId, messageId);
      await bot.sendDocument(chatId, documentAction.filePath);
      bot.sendMessage(chatId, latest_message.text, {
        reply_markup: latest_message.reply_markup,
      });
      console.log("File sent successfully");
    } catch (error) {
      console.error("Error sending file:", error);
    }
  }
});
