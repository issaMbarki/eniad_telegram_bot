const { generateTps } = require("../utils/generate");
const tps = {
  ...generateTps("ibd", 4),
};
module.exports = tps;
