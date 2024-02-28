const semesters = require("../keyboards/semesters");

/**
 * Edits a message with the provided menu action.
 * @param {object} bot - The bot instance.
 * @param {object} query - The query object.
 * @param {object} menuAction - The menu action object.
 * @returns {Promise<object>} A promise representing the edited message.
 */
async function editMessage(bot, query, menuAction) {
  try {
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;
    const keyboard = menuAction.replyMarkup.inline_keyboard;
    const text = menuAction.text;
    return await bot.editMessageText(text, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: {
        inline_keyboard: keyboard,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

/**
 * Sends a document with the provided document action.
 * @param {object} bot - The bot instance.
 * @param {object} query - The query object.
 * @param {object} documentAction - The document action object.
 * @param {Array} messageHistory - Array containing message history.
 */
async function sendDocument(bot, query, documentAction, messageHistory) {
  try {
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;
    bot.sendChatAction(chatId, "upload_document");
    await bot.sendDocument(chatId, documentAction.filePath);
    if (messageHistory.length) {
      const latest_message = messageHistory[messageHistory.length - 1];
      await bot.sendMessage(chatId, latest_message.text, {
        reply_markup: latest_message.reply_markup,
      });
      bot.deleteMessage(chatId, messageId);
    }
    console.log("File sent successfully");
  } catch (error) {
    console.error("Error sending file:", error);
  }
}

/**
 * Sends semesters menu to the user.
 * @param {object} bot - The bot instance.
 * @param {object} query - The query object.
 * @param {boolean} fromHomeButton - Indicates if the user navigated from the home button.
 * @returns {Promise<object>} A promise representing the sent message.
 */
async function sendSemesters(bot, query, fromHomeButton) {
  const text = "Please choose a semester:";
  // the menu of semesters
  const replyMarkup = {
    inline_keyboard: semesters,
  };
  try {
    if (fromHomeButton) {
      return await editMessage(bot, query, {
        text,
        replyMarkup,
      });
    } else {
      const chatId = query.chat.id;
      return await bot.sendMessage(chatId, text, {
        reply_markup: replyMarkup,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * Sends modules menu to the user.
 * @param {object} bot - The bot instance.
 * @param {number} chatId - The chat id.
 * @returns {Promise<object>} A promise representing the sent message.
 */
async function sendModules(bot, chatId) {
  // the menu of semesters
  const replyMarkup = {
    inline_keyboard: semesters,
  };
  try {
    return await bot.sendMessage(chatId, "Please choose a semester:", {
      reply_markup: replyMarkup,
    });
  } catch (error) {
    console.log(error);
  }
}

/**
 * Sends the user back to the previous message.
 * @param {object} bot - The bot instance.
 * @param {object} prev_message - The previous message object.
 * @returns {Promise<object>} A promise representing the sent message.
 */
async function goBack(bot, prev_message) {
  try {
    return await bot.editMessageText(prev_message.text, {
      chat_id: prev_message.chat.id,
      message_id: prev_message.message_id,
      reply_markup: {
        inline_keyboard: prev_message.reply_markup.inline_keyboard,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  editMessage,
  sendSemesters,
  goBack,
  sendDocument,
};