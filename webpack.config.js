const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function override(config, env) {
  // Add this check to ensure you're modifying the production configuration
  if (env === 'production') {
    // Add the copy-webpack-plugin configuration
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          { from: 'src/fonts', to: 'fonts' },
        ],
      })
    );
  }

  return config;
};