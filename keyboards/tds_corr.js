const { generateTdCorrections } = require("../utils/generate");
const tps = {
  ...generateTdCorrections("ibd", 2),
};
module.exports = tps;
