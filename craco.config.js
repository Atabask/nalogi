const {CracoAliasPlugin } = require('react-app-alias')
const path = require("path");
const fs = require("fs");
const rewireBabelLoader = require("craco-babel-loader");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  plugins: [
    {
      plugin: CracoAliasPlugin,
      options: {}
    },
    {
      plugin: rewireBabelLoader,
      options: {
        includes: [resolveApp("node_modules/isemail")], 
        excludes: [/(node_modules|bower_components)/]
      }
    }
  ]
}