const TelegramBot = require("node-telegram-bot-api")
require('dotenv').config();
const semesters = require("./keyboards/semesters")
const modules = require("./keyboards/modules")
const contents = require("./keyboards/contents")
const courses = require("./keyboards/courses")

const token = process.env.BOT_TOKEN || 'bot token';
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;
  if (messageText === '/start') {
    // Send the menu of semesters
    const replyMarkup = {
      inline_keyboard: semesters
    };
    bot.sendMessage(chatId, 'Please choose a semester:', { reply_markup: replyMarkup });
  }
});

// Handle callback queries (when a button is pressed)
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const chosenCommand = query.data;
  console.log(chosenCommand);

  let text;
  let replyMarkup;
  switch (chosenCommand) {
    case "s1":
      text = "choose a module: "
      replyMarkup = {
        inline_keyboard: modules.s1_modules
      };
      break;

    case "s2":
      text = "choose a module: "
      replyMarkup = {
        inline_keyboard: modules.s2_modules
      };
      break

    case "ibd":
      text = "choose what you want: "
      replyMarkup = {
        inline_keyboard: contents.ibd_content
      };
      break

    case "ibd_courses":
      text = "choose the course you want: "
      replyMarkup = {
        inline_keyboard: courses.ibd_courses
      };
      break
    case "ibd_ch01":
      try {
        bot.sendDocument(chatId, "./ibd01.txt");
        console.log('File sent successfully');
      } catch (error) {
        console.error('Error sending file:', error);
      }
      break
    case "ibd_ch02":
      try {
        bot.sendDocument(chatId, "./ibd02.txt");
        console.log('File sent successfully');
      } catch (error) {
        console.error('Error sending file:', error);
      }
      break

    default:
      break;
  }
  if (replyMarkup) {
    bot.editMessageText(text, { chat_id: chatId, message_id: query.message.message_id });
    bot.editMessageReplyMarkup({ inline_keyboard: replyMarkup.inline_keyboard }, { chat_id: chatId, message_id: query.message.message_id });
  }
});
