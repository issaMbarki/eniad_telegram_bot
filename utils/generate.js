const resourcesPath = "./resources/";

/**
 * Generates resources for a given course.
 * @param {string} courseName - The name of the course.
 * @param {number} numResources - The number of resources to generate.
 * @param {string} type - The type of resource: ch, tp, tp_corr ...
 * @param {string} extension - The file extension (default is 'pdf').
 * @returns {Object} - An object containing the generated resources.
 * @example
 * // Example:
 * generateResources("Math", 3, 'ch', 'courses', 'pdf');
 * // Output:
 * // {
 * //   Math_ch01: { filePath: "./resources/Math/Math_ch01.pdf" },
 * //   Math_ch02: { filePath: "./resources/Math/Math_ch02.pdf" },
 * //   Math_ch03: { filePath: "./resources/Math/Math_ch03.pdf" }
 * // }
 */
function generateResources(courseName, numResources, type, extension = "pdf") {
  const resources = {};
  for (let i = 1; i <= numResources; i++) {
    const resourceName = `${courseName}_${type}${i
      .toString()
      .padStart(2, "0")}`;
    const filePath = `${resourcesPath}${courseName}/${resourceName}.${extension}`;
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
 * @param {boolean} [options.tds] - Whether to include TDs in content.
 * @param {boolean} [options.tds_corr] - Whether to include TD corrections in content.
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
  { courses = true, tps = true, tps_corr, tds, tds_corr, extra } = {}
) {
  const content = [];

  if (courses) {
    content.push({
      text: "cours",
      callback_data: `${courseName}_courses`,
    });
  }

  if (tps) {
    content.push({ text: "Tps", callback_data: `${courseName}_tps` });
  }

  if (tps_corr) {
    content.push({
      text: "Tps (correction)",
      callback_data: `${courseName}_tps_corr`,
    });
  }
  if (tds) {
    content.push({ text: "Tds", callback_data: `${courseName}_tds` });
  }
  if (tds_corr) {
    content.push({
      text: "Tds (correction)",
      callback_data: `${courseName}_tds_corr`,
    });
  }
  if (extra) {
    content.push({ text: "extra", callback_data: `${courseName}_extra` });
  }
  const dividedContent = [];
  const chunkSize = 2;

  for (let i = 0; i < content.length; i += chunkSize) {
    dividedContent.push(content.slice(i, i + chunkSize));
  }
  dividedContent.push([
    { text: "🏠", callback_data: "home" },
    { text: "🔙", callback_data: "back" },
  ]);
  return { [`${courseName}_content`]: dividedContent };
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
 * //       { text: "chapitre1", callback_data: "Math_ch01" },
 * //       { text: "chapitre2", callback_data: "Math_ch02" }
 * //     ],
 * //     [
 * //       { text: "chapitre3", callback_data: "Math_ch03" },
 * //       { text: "chapitre4", callback_data: "Math_ch04" }
 * //     ],
 * //     [
 * //       { text: "chapitre5", callback_data: "Math_ch05" }
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
      text: `chapitre${i}`,
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
 * //       { text: "tp1", callback_data: "Math_tp01" },
 * //       { text: "tp2", callback_data: "Math_tp02" }
 * //     ],
 * //     [
 * //       { text: "tp3", callback_data: "Math_tp03" }
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

/**
 * Generates TP corrections for a given course.
 * @param {string} courseName - The name of the course.
 * @param {number} numTps - The number of TP corrections to generate.
 * @returns {Object} - An object containing the generated TP corrections.
 * @example
 * // Example:
 *  generateTpCorrections("Math", 3);
 * // Output:
 * // {
 * //   Math_tps_corr: [
 * //     [
 * //       { text: "tp1", callback_data: "Math_tp01_corr" },
 * //       { text: "tp2", callback_data: "Math_tp02_corr" }
 * //     ],
 * //     [
 * //       { text: "tp3", callback_data: "Math_tp03_corr" }
 * //     ],
 * //     [ { text: "🏠", callback_data: "home" },
 * //       { text: "🔙", callback_data: "back" },
 * //     ]
 * //   ]
 * // }
 */
function generateTpCorrections(courseName, numTps) {
  const tpCorrections = [];
  for (let i = 1; i <= numTps; i++) {
    tpCorrections.push({
      text: `tp${i}`,
      callback_data: `${courseName}_tp_corr${i.toString().padStart(2, "0")}`,
    });
  }
  const tpsCorr = [];
  for (let i = 0; i < tpCorrections.length; i += 2) {
    const row = [];
    row.push(tpCorrections[i]);
    if (i + 1 < tpCorrections.length) {
      row.push(tpCorrections[i + 1]);
    }
    tpsCorr.push(row);
  }

  tpsCorr.push([
    { text: "🏠", callback_data: "home" },
    { text: "🔙", callback_data: "back" },
  ]);

  return { [`${courseName}_tps_corr`]: tpsCorr };
}

/**
 * Generates TDs (Travaux Dirigés ) for a given course.
 * @param {string} courseName - The name of the course.
 * @param {number} numTds - The number of TDs to generate.
 * @returns {Object} - An object containing the generated TDs.
 * @example
 * // Example:
 *  generateTds("Math", 3);
 * // Output:
 * // {
 * //   Math_tps: [
 * //     [
 * //       { text: "td1", callback_data: "Math_td01" },
 * //       { text: "td2", callback_data: "Math_td02" }
 * //     ],
 * //     [
 * //       { text: "td3", callback_data: "Math_td03" }
 * //     ],
 * //     [ { text: "🏠", callback_data: "home" },
 * //       { text: "🔙", callback_data: "back" },
 * //     ]
 * //   ]
 * // }
 */
function generateTds(courseName, numTds) {
  const td = [];
  for (let i = 1; i <= numTds; i++) {
    td.push({
      text: `td${i}`,
      callback_data: `${courseName}_td${i.toString().padStart(2, "0")}`,
    });
  }
  const tds = [];
  for (let i = 0; i < td.length; i += 2) {
    const row = [];
    row.push(td[i]);
    if (i + 1 < td.length) {
      row.push(td[i + 1]);
    }
    tds.push(row);
  }

  tds.push([
    { text: "🏠", callback_data: "home" },
    { text: "🔙", callback_data: "back" },
  ]);

  return { [`${courseName}_tds`]: tds };
}

/**
 * Generates TD corrections for a given course.
 * @param {string} courseName - The name of the course.
 * @param {number} numTps - The number of TD corrections to generate.
 * @returns {Object} - An object containing the generated TD corrections.
 * @example
 * // Example:
 *  generateTdCorrections("Math", 3);
 * // Output:
 * // {
 * //   Math_tds_corr: [
 * //     [
 * //       { text: "td1", callback_data: "Math_td01_corr" },
 * //       { text: "td2", callback_data: "Math_td02_corr" }
 * //     ],
 * //     [
 * //       { text: "td3", callback_data: "Math_td03_corr" }
 * //     ],
 * //     [ { text: "🏠", callback_data: "home" },
 * //       { text: "🔙", callback_data: "back" },
 * //     ]
 * //   ]
 * // }
 */
function generateTdCorrections(courseName, numTps) {
  const tdCorrections = [];
  for (let i = 1; i <= numTps; i++) {
    tdCorrections.push({
      text: `td${i}`,
      callback_data: `${courseName}_td_corr${i.toString().padStart(2, "0")}`,
    });
  }
  const tdsCorr = [];
  for (let i = 0; i < tdCorrections.length; i += 2) {
    const row = [];
    row.push(tdCorrections[i]);
    if (i + 1 < tdCorrections.length) {
      row.push(tdCorrections[i + 1]);
    }
    tdsCorr.push(row);
  }

  tdsCorr.push([
    { text: "🏠", callback_data: "home" },
    { text: "🔙", callback_data: "back" },
  ]);
  return { [`${courseName}_tds_corr`]: tdsCorr };
}

module.exports = {
  generateResources,
  generateContent,
  generateCourses,
  generateTps,
  generateTpCorrections,
  generateTds,
  generateTdCorrections,
};
