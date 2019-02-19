process.env.CHROME_BIN = require('puppeteer').executablePath();
const webpackConfig = require('./webpack.config');
delete webpackConfig.entry;

module.exports = function (config) {
  config.set({
    basePath: './src',
    frameworks: ['jasmine'],
    files: [
      { pattern: '**/*[sS]pec.ts' }
    ],
    preprocessors: {
      '**/*[sS]pec.ts': ['webpack']
    },
    mime: {
      'text/x-typescript': ['ts']
    },
    reporters: ['progress'],
    browsers: ['ChromeHeadless'],
    webpackMiddleware: {
      stats: 'errors-only'
    },
    plugins: [
      require('karma-webpack'),
      require('karma-jasmine'),
      require('karma-chrome-launcher')
    ],
    webpack: webpackConfig
  });
};
