const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const documentActions = require("./actions/documentActions");
const menuActions = require("./actions/menuActions");
const {
  sendSemesters,
  goBack,
  editMessage,
  sendDocument,
} = require("./utils/botHelper");

const token = process.env.BOT_TOKEN || "bot token";
const bot = new TelegramBot(token, { polling: true });

// Holds the history of messages for go back functionality
const messageHistory = [];

bot.on("message", async (msg) => {
  const messageText = msg.text;

  if (messageText === "/start") {
    // Send the menu of semesters
    const sentMessage = await sendSemesters(bot, msg);
    messageHistory.push(sentMessage);
  }
});

// Handle callback queries (when a button is pressed)
bot.on("callback_query", async (query) => {
  const chosenCommand = query.data;
  console.log(`chosen command: ${chosenCommand}`);

  // go home functionality (same as /start command)
  if (chosenCommand === "home") {
    const sentMessage = await sendSemesters(bot, query, true);
    messageHistory.length = 0;
    messageHistory.push(sentMessage);
    return;
  }
  // go back functionality
  if (chosenCommand === "back" && messageHistory.length > 1) {
    messageHistory.pop();
    const prev_message = messageHistory[messageHistory.length - 1];
    await goBack(bot, prev_message);
    return;
  }

  const menuAction = menuActions[chosenCommand];
  if (menuAction && menuAction.replyMarkup && menuAction.text) {
    const sentMessage = await editMessage(bot, query, menuAction);
    messageHistory.push(sentMessage);
    return;
  }

  const documentAction = documentActions[chosenCommand];
  if (documentAction) {
    await sendDocument(bot, query, documentAction, messageHistory);
  }
});
