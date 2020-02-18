const Dotenv = require("dotenv-webpack");

module.exports = {
  lintOnSave: false,
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: {
    plugins: [
      new Dotenv({
        path: "./.env",
        systemvars: true,
        silent: true
      })
    ]
  }
};
