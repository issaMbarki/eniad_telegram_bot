const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const documentActions = require("./actions/documentActions");
const menuActions = require("./actions/menuActions");
const {
  sendSemesters,
  goBack,
  editMessage,
  sendDocument,
  sendModules,
  sendInfo,
  saveFile,
} = require("./utils/botHelper");

const token = process.env.BOT_TOKEN || "bot token";
const bot = new TelegramBot(token, { polling: true });
// Holds the history of messages for implementing 'go back' functionality
const messageHistoryMap = new Map();

bot.on("message", async (msg) => {
  const messageText = msg.text;
  const userId = msg.from.id;
  if (messageText === "/start") {
    // Send the menu of semesters
    const sentMessage = await sendSemesters(bot, msg);
    const messageId = sentMessage.message_id;
    messageHistoryMap.set(messageId, [sentMessage]);
    return;
  }
  //if the user request the menu of modules for a semester (/s1 or /s2)
  if (/^\/s[1-2]$/.test(messageText)) {
    // Send the menu of modules
    const sentMessage = await sendModules(bot, msg);
    const messageId = sentMessage.message_id;
    messageHistoryMap.set(messageId, [sentMessage]);
    return;
  }
  if (messageText === "/info") {
    await sendInfo(bot, msg);
    return;
  }
  if (process.env.ADMIN_ID == userId) {
    if (msg.document) {
      saveFile(bot, msg);
    }
  }
});

// Handle callback queries (when a button is pressed)
bot.on("callback_query", async (query) => {
  const chosenCommand = query.data;
  const messageId = query.message.message_id;
  // Retrieve the message history for a given message ID
  const messageHistory = messageHistoryMap.get(messageId);

  console.log(`chosen command: ${chosenCommand}`);

  // go home functionality (same as /start command)
  if (
    chosenCommand === "home" ||
    (chosenCommand === "back" && !messageHistory)
  ) {
    const sentMessage = await sendSemesters(bot, query, true);
    messageHistoryMap.set(messageId, [sentMessage]);
    return;
  }
  // go back functionality
  if (chosenCommand === "back") {
    if (messageHistory?.length > 1) {
      messageHistory.pop();
      const prev_message = messageHistory[messageHistory.length - 1];
      await goBack(bot, prev_message);
      return;
    }
  }
  // if a button that will respond with another inline keyboard is presses
  const menuAction = menuActions[chosenCommand];
  if (menuAction && menuAction.replyMarkup && menuAction.text) {
    const sentMessage = await editMessage(bot, query, menuAction);
    messageHistory?.push(sentMessage);
    return;
  }

  //if a button that will respond with a document is pressed
  const documentAction = documentActions[chosenCommand];
  if (documentAction) {
    await sendDocument(bot, query, documentAction, messageHistoryMap);
    return;
  }
  if (!documentAction && !menuAction) {
    bot.answerCallbackQuery(query.id, {
      text: "Aucun contenu disponible pour le moment.",
    });
  }
});
