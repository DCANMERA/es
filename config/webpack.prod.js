const { merge } = require('webpack-merge')

module.exports = merge({
  mode: 'production',
  optimization: {
    minimize: true
  }
})
