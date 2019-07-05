const path = require('path')
/* start new code */
const glob = require('glob')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const testFiles = glob
  .sync('src/**/*.test.js')
  .filter(function(element) {
    return element != 'test/bundle.test.js'
  })
  .map(function(element) {
    return './' + element
  })
/* end new code */

module.exports = {
  devtool: 'source-map',
  /* start new code */
  entry: testFiles,
  /* end new code */
  output: {
    path: path.resolve(__dirname, 'test/'),
    filename: 'bundle.test.js',
  },
  mode: 'none',
  plugins: [new CleanWebpackPlugin()],
  /*
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  */
}
