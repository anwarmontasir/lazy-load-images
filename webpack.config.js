/* eslint-env node */
const htmlPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  // our starting point for our JavaScript
  // (everything is tracked by being required, or 'imported')
  entry: './src/main.js',
  // what do we want to call the output, and where do we want to put it?
  output: {
    filename: 'bundle.js',
    // this path is for npm run build
    // npm start (webpackdev server) runs in a temp folder
    path: `${__dirname}/build`
  },
  // gives us source maps
  // (we debug code we wrote, not what ends up getting built)
  // devtool: 'inline-source-map',
  // minify CSS
  optimization: {
    minimizer: [
      new optimizeCSSAssetsPlugin({}),
    ]
  },
  // plugins add high-level functionality to webpack
  plugins: [
    // cleans the build directory on each build
    // new cleanWebpackPlugin(`$__dirname}/build`),
    // create an index.html based on our template
    // will add in <script> to bundle.js
    new htmlPlugin({ 
      template: '!!prerender-loader?string!./src/index.html', 
    }),
    new miniCssExtractPlugin({ filename: 'main.css' })
  ],
  module: {
    // 'loaders' tell webpack how to require (or import) things
    rules: [
      {
        test: /.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.css$/,
        use:  [{ loader: 'style-loader' }, miniCssExtractPlugin.loader, { loader: 'css-loader' }, { loader: 'postcss-loader' }]
      },
      // load images
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'url-loader',
          // default is to inline image content via base64 encoding
          // if file is bigger than this limit, create a 'real' file
          options: {
            limit: 5000
          }
        }
      }
    ]
  }
};