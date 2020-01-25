require('dotenv').config();

const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { EnvironmentPlugin } = require('webpack');
const packageData = require('./package.json');

const ENV = process.env.NODE_ENV || 'production';
const ANALYZE_BUILD = process.env.ANALYZE_BUILD === '1';

const isDev = ENV === 'development';

module.exports = {
  mode: ENV,
  entry: './src/index.jsx',
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '~': path.resolve(__dirname, './src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: path.resolve(__dirname, 'src'),
      },
      {
        oneOf: [
          {
            test: /\.(js|jsx)$/,
            include: path.resolve(__dirname, 'src'),
            use: [
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true,
                  cacheCompression: true,
                  compact: true,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV,
      APP_VERSION: packageData.version,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: ANALYZE_BUILD ? 'static' : 'disabled',
    }),
  ],
  devtool: isDev ? 'source-map' : false,
  stats: {
    assets: true,
    children: false,
    entrypoints: false,
    chunks: false,
    colors: true,
    performance: false,
    usedExports: false,
    modules: false,
  },
};
