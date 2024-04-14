const { generateResources } = require("../utils/generate");
const documentActions = {
  // database content
  ...generateResources("ibd", 5, "ch", "txt"),
  ...generateResources("ibd", 4, "tp", "txt"),

  // // java content
  // ...generateResources("java", 4, "ch", "txt"),

  // // automatique courses
  // ...generateResources("automatique", 4, "ch", "txt"),
};
module.exports = documentActions;
