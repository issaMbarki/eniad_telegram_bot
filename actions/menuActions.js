const modules = require("../keyboards/modules")
const contents = require("../keyboards/contents")
const courses = require("../keyboards/courses")

const manuActions = {
    s1: {
        text: "choose a module: ",
        replyMarkup: {
            inline_keyboard: modules.s1_modules
        },
    },

    s2: {
        text: "choose a module: ",
        replyMarkup: {
            inline_keyboard: modules.s2_modules
        },
    },
    s3: {
        text: "choose a module: ",
        replyMarkup: {
            inline_keyboard: modules.s2_modules
        },
    },
    s4: {
        text: "choose a module: ",
        replyMarkup: {
            inline_keyboard: modules.s2_modules
        },
    },
    s5: {
        text: "choose a module: ",
        replyMarkup: {
            inline_keyboard: modules.s2_modules
        },
    },

    ibd: {
        text: "choose what you want: ",
        replyMarkup: {
            inline_keyboard: ibd_content
        },
    },

    ibd_courses:
    {
        text: "choose the course you want: ",
        replyMarkup: {
            inline_keyboard: ibd_courses
        },
    },
}
module.exports = { manuActions }