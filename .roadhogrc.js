const path = require('path')
const { version } = require('./package.json')

export default {
  "entry": "src/index.js",
  publicPath: `/${version}/`,
  outputPath: `./dist/${version}`,
  "extraBabelPlugins": [
    "transform-runtime",
    "transform-decorators-legacy",
    "transform-class-properties",
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }]
  ],
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr"
      ]
    }
  },
  "ignoreMomentLocale": true,
  "theme": "./src/theme.js",
  "autoprefixer": {
    "browsers": [
      'last 5 versions', '> 10%'
    ]
  }
}
