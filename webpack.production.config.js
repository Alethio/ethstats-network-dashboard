'use strict';

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

function getConfig() {
  const plugins = [
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      }
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
    new ExtractTextPlugin({
      filename: 'resources/css/[name].[[md5:contenthash:hex:20].css',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ];
  return {
    mode: 'production',
    devtool: 'source-map',
    entry: [
      path.join(__dirname, 'app/index.js')
    ],
    plugins: plugins,
    output: {
      path: path.join(__dirname, '/dist/'),
      filename: '[name]-[hash].js',
      publicPath: '/'
    },
    optimization: {
      minimizer: [
        // we specify a custom UglifyJsPlugin here to get source maps in production
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          uglifyOptions: {
            compress: false,
            ecma: 6,
            mangle: {
              safari10: true
            }
          },
          sourceMap: true
        })
      ]
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
          exclude: [/\.html$/, /\.(js|jsx)$/, /\.css$/, /\.less$/, /\.scss$/, /\.json$/, /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
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
        },
        {
          // Resolves styles, turns CSS into JS modules that inject style tags, compiles less or sass
          test: [/\.css$/, /\.less$/, /\.scss$/],
          loader: ExtractTextPlugin.extract(
            {
              fallback: require.resolve('style-loader'),
              use: [
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    url: true,
                    importLoaders: 2,
                    minimize: true,
                    sourceMap: true,
                  },
                },
                {
                  loader: require.resolve('postcss-loader'),
                  options: {
                    ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                    plugins: () => [
                      require('postcss-flexbugs-fixes'),
                      autoprefixer({
                        browsers: [
                          '>1%',
                          'last 4 versions',
                          'Firefox ESR',
                          'not ie < 9', // React doesn't support IE8 anyway
                        ],
                        flexbox: 'no-2009',
                      }),
                    ],
                  },
                },
                // require.resolve('less-loader'),
                require.resolve('sass-loader'),
              ],
            }
          ),
        },
      ]
    }
  };
}
module.exports = getConfig();
