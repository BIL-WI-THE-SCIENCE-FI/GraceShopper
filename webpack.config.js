// module.exports = {
//   entry: ['./client/index.js'],
//   output: {
//     path: __dirname,
//     publicPath: '/',
//     filename: './public/bundle.js'
//   },
//   module: {
//     loaders: [
//       {
//         exclude: /node_modules/,
//         loader: 'babel-loader',
//         query: {
//           presets: ['react', 'es2015', 'stage-1', '@babel/preset-react']
//         }
//       },
//       { test: /\.css$/, loader: 'style-loader!css-loader' }
//     ]
//   },
//   resolve: {
//     extensions: ['', '.js', '.jsx', '.css']
//   },
//   devServer: {
//     historyApiFallback: true,
//     contentBase: './'
//   }
// }
//========================================
// module.exports = {
//   entry: ['./client/index.js'],
//   output: {
//     path: __dirname,
//     filename: './public/bundle.js'
//   },
//   devtool: 'source-map',
//   module: {
//     rules: [
//       {
//         test: /\.jsx?$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader',
//         options: {
//           presets: ['@babel/preset-react']
//         }
//       }
//     ]
//   }
// }

module.exports = {
  entry: ['./client/index.js'],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  // mode: 'development',
  context: __dirname,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
