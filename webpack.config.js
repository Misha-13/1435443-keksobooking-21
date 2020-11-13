const path = require("path");

module.exports = {
  entry: [
    "./js/utility.js",
    "./js/error.js",
    "./js/load.js",
    "./js/upload.js",
    "./js/debounce.js",
    "./js/preview.js",
    "./js/map.js",
    "./js/card.js",
    "./js/pin.js",
    "./js/page.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
}
