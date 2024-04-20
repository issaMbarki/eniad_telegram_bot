const { generateTds } = require("../utils/generate");
const tds = {
  ...generateTds("ibd", 4),
};
module.exports = tds;
