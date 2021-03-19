// webpack needs to be explicitly required
const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    'app-routing.module': './app/app-routing.module.ts',
    'home-component' : './app/components/home/home.component.ts',
    'realtime-component' : './app/components/realtime/realtime.component.ts',
    'contact-component' : './app/components/contact/contact.component.ts',
    'candlestick-component': './app/components/realtime/candlestick/candlestick.component.ts',
    'orderbook-component': './app/components/realtime/orderbook/orderbook.component.ts',
    'loader-component': './app/components/loader/loader.component.ts'
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

      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  watch: true,
  
};

