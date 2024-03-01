const modules = require("../keyboards/modules");
const { generateMenuAction } = require("../utils/generateMenu");

const menuActions = {
  s1: {
    text: "📍 <i>semestr 1 > modules</i> :",
    replyMarkup: {
      inline_keyboard: modules.s1_modules,
    },
  },

  s2: {
    text: "📍 <i>semestr 2 > modules</i> :",
    replyMarkup: {
      inline_keyboard: modules.s2_modules,
    },
  },

  ...generateMenuAction("ibd", "content"),
  ...generateMenuAction("ibd", "course"),
  // ...generateMenuAction("ibd", "tp"),
  //...
};
module.exports = menuActions;
