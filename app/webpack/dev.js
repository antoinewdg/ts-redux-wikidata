const merge = require('webpack-merge');
const common = require('./common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    overlay: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    stats: 'minimal',
    public: process.env.PUBLIC_URL,
  },
});
