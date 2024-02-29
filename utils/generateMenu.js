const contents = require("../keyboards/contents");
const courses = require("../keyboards/courses");

const keyboards = {
  tps: require("../keyboards/tps"),
  contents: require("../keyboards/contents"),
  courses: require("../keyboards/courses"),
  modules: require("../keyboards/modules"),
};

/**
 * Generates a menu action for a given course and type.
 * @param {string} courseName - The name of the course.
 * @param {string} type - The type of action: course, tp, content, tp_corr...
 * @returns {Object} - An object containing the generated menu action.
 * @example
 * // Example:
 * // generateMenuAction("Math", "course");
 * // Output:
 * // {
 * //   Math_courses: {
 * //     text: "courses",
 * //     replyMarkup: { inline_keyboard: [/ Array of inline keyboard of math's courses /] }
 * //   }
 * // }
 */
function generateMenuAction(courseName, type) {
  const { s1_modules, s2_modules } = keyboards.modules;
  let modelName;
  s1_modules.forEach((modules) => {
    if (!modelName) {
      modelName = modules.find((module) => {
        return module.callback_data === courseName;
      }).text;
    }
  });
  // console.log(modelName);

  const typeMappings = {
    course: {
      property: courseName + "_courses",
      keyboard: keyboards.courses[`${courseName}_courses`],
      text: `📍 <i>${modelName} > cours</i> :`,
    },
    tp: {
      property: courseName + "_tps",
      keyboard: keyboards.tps[`${courseName}_tps`],
      text: `📍 <i>${modelName} > tps</i> :`,
    },
    content: {
      property: courseName,
      keyboard: keyboards.contents[`${courseName}_content`],
      text: `📍 <i>${modelName}</i> :`,
    },
  };

  const { keyboard, text } = typeMappings[type] || {
    keyboard: undefined,
    text: undefined,
  };
  let obj = {
    text: text,
    replyMarkup: {
      inline_keyboard: keyboard,
    },
  };
  return { [`${typeMappings[type].property}`]: obj };
}
module.exports = { generateMenuAction };
