// webpack needs to be explicitly required
const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    'router': './app/router.js',
    'home-component' : './app/components/home/home.component.js',
    'realtime-component' : './app/components/realtime/realtime.component.js',
    'contact-component' : './app/components/contact/contact.component.js',
    'candlestick-component': './app/components/realtime/candlestick/candlestick.component.js',
    'orderbook-component': './app/components/realtime/orderbook/orderbook.component.js',
    'loader-component': './app/components/loader/loader.component.js'
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
      { test: /\.css$/,  use: ['style-loader','css-loader'] },

      
    ]
  },
  watch: true,
  
};

