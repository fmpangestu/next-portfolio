/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "id"],
  },
  localePath: path.resolve("./public/locales"),
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
