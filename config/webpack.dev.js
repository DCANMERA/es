const { merge } = require('webpack-merge')

module.exports = merge({
  mode: 'production',
  optimization: {
    // We no not want to minimize our code.
    minimize: false
  },
})
