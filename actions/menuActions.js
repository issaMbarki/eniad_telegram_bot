const modules = require("../keyboards/modules");
const { generateMenuAction } = require("../utils/generateMenu");

const menuActions = {
  s1: {
    text: "📍 <i>semestrs > modules</i> :",
    replyMarkup: {
      inline_keyboard: modules.s1_modules,
    },
  },

  s2: {
    text: "📍 <i>semestrs > modules</i> :",
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
