const path = require('path');

module.exports = {
  mode: 'development',
  entry: [
    './app/app-routing.module.js'
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  watch: true
};

