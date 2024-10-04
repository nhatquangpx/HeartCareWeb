const webpack = require('webpack');
const path = require('path');

module.exports = function override(config) {
  // Add polyfill for url and buffer
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "url": require.resolve("url/"),
    "buffer": require.resolve("buffer/")
  };

  // Add alias for react/jsx-runtime
  config.resolve.alias = {
    ...config.resolve.alias,
    'react/jsx-runtime': path.resolve(__dirname, 'node_modules/react/jsx-runtime')
  };

  // Configure sass-loader to use sass
  config.module.rules.forEach(rule => {
    if (Array.isArray(rule.oneOf)) {
      rule.oneOf.forEach(oneOf => {
        if (oneOf.loader && oneOf.loader.includes('sass-loader')) {
          oneOf.options.implementation = require('sass');
        }
      });
    }
  });

  // Add ProvidePlugin to automatically load Buffer
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ]);

  return config;
};