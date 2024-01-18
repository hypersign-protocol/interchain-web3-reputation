const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const fs = require('fs');

// Check if the .env file exists before proceeding
const envPath = path.resolve(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.error('Error: The .env file is missing.');
  process.exit(1);
}

module.exports = {
    mode: 'development',
    entry: {
        bundle: path.resolve(__dirname, 'src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js',
        clean: true,
        assetModuleFilename: '[name][ext]'
    },
    // Debugging
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 8083,
        hot: true,
        compress: true,
        historyApiFallback: true,
        watchFiles: ['src/*', 'public/*'],
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader']
            },
            // For SVG and other images
            {
                test: /\.(png|svg|jpg|jpeg)$/i,
                type: 'asset/resource',
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Aidrop Dapp',
            filename: 'index.html',
            template: 'public/template.html'
        }),
        new Dotenv(),
    ],
    resolve: {
        fallback: {
            "crypto": false,
            "path": false
        }
    }
}