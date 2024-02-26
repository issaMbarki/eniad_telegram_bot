const { generateTps } = require("../utils/generate");
const tps = {
  ...generateTps("ibd", 3),
};
module.exports = tps;
