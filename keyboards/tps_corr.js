const { generateTpCorrections } = require("../utils/generate");
const tps = {
  ...generateTpCorrections("ibd", 2),
};
module.exports = tps;
