import CleanWebpackPlugin from 'clean-webpack-plugin';
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
const config: webpack.Configuration = {
  context: path.join(__dirname, 'src'),
  entry: './bin/server.ts',
  devtool: 'source-map',
  node: {
    __dirname: true
  },
  externals: [nodeExternals()],
  mode: process.env.NODE_ENV as 'development' | 'production' | 'none',
  module: {
    rules: [
      // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader'
          }
        ]
      },
      { test: /\.tsx?$/, loader: ['ts-loader', 'shebang-loader'] }
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.bundle.js',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  plugins: [new CleanWebpackPlugin(['dist'])],
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: ['*', '.webpack.js', '.test.ts', '.ts', '.tsx', '.js']
  },
  target: 'node',
  optimization: {
    minimizer: [
      new TerserPlugin({
        include: /\.ts($|\?)/i,
        exclude: /\.controller\.ts/i,
        parallel: true,
        sourceMap: true
      })
    ]
  }
};

export default config;
