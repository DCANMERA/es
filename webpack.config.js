const commConfig = require('./webpack.common')
const developmentConfig = require('./config/webpack.dev')
const productionConfig = require('./config/webpack.prod')
const { merge } = require('webpack-merge')

module.exports = () => {
  if (process.env.NODE_ENV === 'production') {
    return merge(commConfig, productionConfig)
  }
  return merge(commConfig, developmentConfig)
}
