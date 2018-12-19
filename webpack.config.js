'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const argv = require('minimist')(process.argv.slice(2));
const port = argv.port || '3000';

function getConfig() {
  const plugins = [
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new FaviconsWebpackPlugin({
      // Your source logo
      logo: 'resources/img/favicon.png',
      // The prefix for all image files (might be a folder or a name)
      prefix: 'icons-[hash]/',
      // Emit all stats of the generated icons
      emitStats: false,
      // The name of the json containing all favicon information
      statsFilename: 'iconstats-[hash].json',
      // Generate a cache file with control hashes and
      // don't rebuild the favicons until those hashes change
      persistentCache: true,
      // Inject the html into the html-webpack-plugin
      inject: true,
      // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
      background: '#fff',
      // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
      title: 'Network Statistics',

      // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ];

  return {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: [
      'webpack-dev-server/client?http://localhost:' + port,
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      path.join(__dirname, 'app/index.js')
    ],
    plugins: plugins,
    output: {
      path: path.join(__dirname, '/dist/'),
      filename: '[name].js',
      publicPath: '/'
    },
    resolve: {
      modules: [__dirname, 'app', 'node_modules'],
    },
    externals: {
      config: 'config'
    },
    module: {
      rules: [
        // rules for modules (configure loaders, parser options, etc.)
        {
          // The file-loader handles all assets unless explicitly excluded. It makes sure
          // those assets get served by WebpackDevServer.
          exclude: [/\.html$/, /\.(js|jsx)$/, /\.css$/, /\.less$/, /\.scss$/,
            /\.json$/, /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: require.resolve('file-loader'),
          options: {
            name: 'resources/media/[name].[hash:8].[ext]',
          },
        },
        {
          // url-loader works like file-loader except that it embeds assets smaller than specified
          // limit in bytes as data URLs to avoid requests.
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: require.resolve('url-loader'),
          options: {
            limit: 10000,
            name: 'resources/media/[name].[hash:8].[ext]',
          },
        },
        {
          // Process JS with Babel.
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          include: /app/,
          loader: require.resolve('babel-loader'),
          options: {
            // Cache results in ./node_modules/.cache/babel-loader/ directory for faster rebuilds
            cacheDirectory: true,
          },
        },
        {
          // Resolves styles, turns CSS into JS modules that inject style tags, compiles less or sass
          test: [/\.css$/, /\.less$/, /\.scss$/],
          use: [
            require.resolve('style-loader'),
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                url: true,
              },
            },
            require.resolve('sass-loader'),
          ],
        },
      ]
    }
  }
}
module.exports = getConfig();
