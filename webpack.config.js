const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const ANALYZE_BUILD = process.env.ANALYZE_BUILD === '1';

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'react-delta-views.js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '~': path.resolve(__dirname, './src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: path.resolve(__dirname, 'src'),
      },
      {
        oneOf: [
          {
            test: /\.(ts|tsx)$/,
            include: path.resolve(__dirname, 'src'),
            use: [
              {
                loader: 'ts-loader',
              },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: ANALYZE_BUILD ? 'static' : 'disabled',
    }),
  ],
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
    },
    // 'prop-types': {
    //   commonjs: 'prop-types',
    //   commonjs2: 'prop-types',
    //   amd: 'prop-types',
    // },
  },
  devtool: 'cheap-module-eval-source-map',
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
