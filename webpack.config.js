const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main : './app/app-routing.module.js'
  },
  output: {
    filename: '[name].js',
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

