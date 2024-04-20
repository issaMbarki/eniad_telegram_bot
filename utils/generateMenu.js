const keyboards = {
  tps: require("../keyboards/tps"),
  contents: require("../keyboards/contents"),
  courses: require("../keyboards/courses"),
  modules: require("../keyboards/modules"),
};

/**
 * Generates a menu action for a given course and type.
 * @param {string} courseName - The name of the course.
 * @param {string} type - The type of action: course, tp, td, content, tp_corr...
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
  const allModules = [...s1_modules, ...s2_modules];

  let modelName;
  //find the module name
  allModules.forEach((modules) => {
    if (!modelName) {
      modelName = modules.find((module) => {
        return module.callback_data === courseName;
      })?.text;
    }
  });
  //TODO: add tds and tds corrections
  const typeMappings = {
    content: {
      property: courseName,
      keyboard: keyboards.contents[`${courseName}_content`],
      text: `📍 <i>${modelName}</i> :`,
    },
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
    tp_corr: {
      property: courseName + "_tps_corr",
      keyboard: keyboards.tps[`${courseName}_tps_corr`],
      text: `📍 <i>${modelName} > tps (correction)</i> :`,
    },
    td: {
      property: courseName + "_tds",
      keyboard: keyboards.tps[`${courseName}_tds`],
      text: `📍 <i>${modelName} > tds</i> :`,
    },
    td_corr: {
      property: courseName + "_tds_corr",
      keyboard: keyboards.tps[`${courseName}_tds_corr`],
      text: `📍 <i>${modelName} > tds (correction)</i> :`,
    },
  };

  const { keyboard, text } = typeMappings[type] || {
    keyboard: undefined,
    text: undefined,
  };
  if (!keyboard) {
    return;
  }
  let obj = {
    text: text,
    replyMarkup: {
      inline_keyboard: keyboard,
    },
  };
  return { [`${typeMappings[type].property}`]: obj };
}
module.exports = { generateMenuAction };
