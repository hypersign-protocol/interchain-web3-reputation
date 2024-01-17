const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        port: 8080,
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
            title: 'NFT Minter Dapp',
            filename: 'index.html',
            template: 'public/template.html'
        }),
    ],
    resolve: {
        fallback: {
            "crypto": false,
            "path": false
        }
    }
}