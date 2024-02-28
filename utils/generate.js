const resourcesPath = "./resources/";

/**
 * Generates resources for a given course.
 * @param {string} courseName - The name of the course.
 * @param {number} numResources - The number of resources to generate.
 * @param {string} type - The type of resource: ch, tp, tp_corr ...
 * @param {string} folderName - The name of the folder containing the resources. This folder
 *                              must exist inside the 'resources' folder.
 * @param {string} extension - The file extension (default is 'pdf').
 * @returns {Object} - An object containing the generated resources.
 * @example
 * // Example:
 * generateResources("Math", 3, 'ch', 'courses', 'pdf');
 * // Output:
 * // {
 * //   Math_ch01: { filePath: "./resources/courses/Math_ch01.pdf" },
 * //   Math_ch02: { filePath: "./resources/courses/Math_ch02.pdf" },
 * //   Math_ch03: { filePath: "./resources/courses/Math_ch03.pdf" }
 * // }
 */
function generateResources(
  courseName,
  numResources,
  type,
  folderName,
  extension = "pdf"
) {
  const resources = {};
  for (let i = 1; i <= numResources; i++) {
    const resourceName = `${courseName}_${type}${i
      .toString()
      .padStart(2, "0")}`;
    const filePath = `${resourcesPath}${folderName}/${resourceName}.${extension}`;
    resources[resourceName] = { filePath };
  }
  return resources;
}

/**
 * Generates content for a given course.
 * @param {string} courseName - The name of the course.
 * @param {Object} [options={}] - Options for generating content.
 * @param {boolean} [options.courses=true] - Whether to include courses in content.
 * @param {boolean} [options.tps=true] - Whether to include TPs in content.
 * @param {boolean} [options.tps_corr] - Whether to include TP corrections in content.
 * @param {boolean} [options.extra] - Whether to include extra content.
 * @returns {Object} - An object containing the generated content.
 * @example
 * // Example:
 *  generateContent("Math", { courses: true, tps: true, extra: true });
 * // Output:
 * // {
 * //   Math_content: [
 * //     [
 * //       { text: "courses", callback_data: "Math_courses" },
 * //       { text: "Tps", callback_data: "Math_tps" }
 * //     ],
 * //     [
 * //       { text: "extra", callback_data: "Math_extra" }
 * //     ],
 * //     [ { text: "🏠", callback_data: "home" },
 * //       { text: "🔙", callback_data: "back" },
 * //     ]
 * //   ]
 * // }
 */
function generateContent(
  courseName,
  { courses = true, tps = true, tps_corr, extra } = {}
) {
  const content = [[], []];

  if (courses) {
    content[0].push({
      text: "courses",
      callback_data: `${courseName}_courses`,
    });
  }

  if (tps) {
    content[0].push({ text: "Tps", callback_data: `${courseName}_tps` });
  }

  if (tps_corr) {
    content[1].push({
      text: "Tps's correction",
      callback_data: `${courseName}_corr`,
    });
  }

  if (extra) {
    content[1].push({ text: "extra", callback_data: `${courseName}_extra` });
  }

  content.push([
    { text: "🏠", callback_data: "home" },
    { text: "🔙", callback_data: "back" },
  ]);
  return { [`${courseName}_content`]: content };
}

/**
 * Generates courses for a given course.
 * @param {string} courseName - The name of the course.
 * @param {number} numChapters - The number of chapters in the course.
 * @returns {Object} - An object containing the generated courses.
 * @example
 * // Example:
 * generateCourses("Math", 5);
 * // Output:
 * // {
 * //   Math_courses: [
 * //     [
 * //       { text: "chapter01", callback_data: "Math_ch01" },
 * //       { text: "chapter02", callback_data: "Math_ch02" }
 * //     ],
 * //     [
 * //       { text: "chapter03", callback_data: "Math_ch03" },
 * //       { text: "chapter04", callback_data: "Math_ch04" }
 * //     ],
 * //     [
 * //       { text: "chapter05", callback_data: "Math_ch05" }
 * //     ],
 * //     [ { text: "🏠", callback_data: "home" },
 * //       { text: "🔙", callback_data: "back" },
 * //     ]
 * //   ]
 * // }
 */
function generateCourses(courseName, numChapters) {
  const chapters = [];
  for (let i = 1; i <= numChapters; i++) {
    chapters.push({
      text: `chapter${i}`,
      callback_data: `${courseName}_ch${i.toString().padStart(2, "0")}`,
    });
  }

  const courses = [];
  for (let i = 0; i < chapters.length; i += 2) {
    const row = [];
    row.push(chapters[i]);
    if (i + 1 < chapters.length) {
      row.push(chapters[i + 1]);
    }
    courses.push(row);
  }

  courses.push([
    { text: "🏠", callback_data: "home" },
    { text: "🔙", callback_data: "back" },
  ]);

  return { [`${courseName}_courses`]: courses };
}

/**
 * Generates TPs (Travaux Pratiques) for a given course.
 * @param {string} courseName - The name of the course.
 * @param {number} numTps - The number of TPs to generate.
 * @returns {Object} - An object containing the generated TPs.
 * @example
 * // Example:
 *  generateTps("Math", 3);
 * // Output:
 * // {
 * //   Math_tps: [
 * //     [
 * //       { text: "tp01", callback_data: "Math_tp01" },
 * //       { text: "tp02", callback_data: "Math_tp02" }
 * //     ],
 * //     [
 * //       { text: "tp03", callback_data: "Math_tp03" }
 * //     ],
 * //     [ { text: "🏠", callback_data: "home" },
 * //       { text: "🔙", callback_data: "back" },
 * //     ]
 * //   ]
 * // }
 */
function generateTps(courseName, numTps) {
  const tp = [];
  for (let i = 1; i <= numTps; i++) {
    tp.push({
      text: `tp${i}`,
      callback_data: `${courseName}_tp${i.toString().padStart(2, "0")}`,
    });
  }
  const tps = [];
  for (let i = 0; i < tp.length; i += 2) {
    const row = [];
    row.push(tp[i]);
    if (i + 1 < tp.length) {
      row.push(tp[i + 1]);
    }
    tps.push(row);
  }

  tps.push([
    { text: "🏠", callback_data: "home" },
    { text: "🔙", callback_data: "back" },
  ]);

  return { [`${courseName}_tps`]: tps };
}

module.exports = {
  generateResources,
  generateContent,
  generateCourses,
  generateTps,
};
