/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/definition.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: '*.d.ts', context: './src' }],
    }),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'definition.js',
    libraryTarget: 'commonjs',
  },
};
