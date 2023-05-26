const path = require('path');

module.exports = {
  webpack: (config) => {
    // Add fallback configurations for 'fs' and 'path'
    config.resolve.fallback = {
      fs: false,
      path: require.resolve('path-browserify'),
    };
    return config;
  },
};
