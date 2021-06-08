const path = require('path')
const { merge } = require('webpack-merge')

module.exports = merge({
  entry: 'projects/test/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'output/ending.js',
    environment: {
      arrowFunction: false
    }
  },
  resolve: {
    extensions: [".js"],
    alias: {
      '@': path.join(__dirname),
      'art-template': 'art-template/lib/template-web.js'
    },
    preferRelative: true
  },
  module: {
    rules: [
      {
        test: /\.art$/,
        loader: 'art-template-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env']
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
    host: '0.0.0.0',
    useLocalIp: true,
    disableHostCheck: true
  }
})
