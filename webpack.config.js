var configure = require('@dosomething/webpack-config');

module.exports = configure({
  entry: {
    'gateway': './src/gateway.js'
  }
});