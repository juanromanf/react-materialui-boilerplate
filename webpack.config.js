require('dotenv').config()
var path = require('path');
const Dotenv = require('dotenv-webpack')
const Webpack = require('webpack');

module.exports = env => {

    const isProduction = env && env.production !== undefined

    const plugins = [
        new Dotenv(),
        new Webpack.HotModuleReplacementPlugin()
    ]

    return {
        entry: path.join(__dirname, 'src', 'app.js'),
        mode: isProduction ? 'production' : 'development',
        output: {
            path: path.resolve(__dirname, 'public'),
            filename: 'index.bundle.js'
        },
        module: {
            rules: [{
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    'css-loader', //translates css into commonJS
                    'sass-loader' // compile Sass to CSS using node sass by default
                ]
            }, {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                loaders: ["file-loader"]
            }]
        },

        devtool: isProduction ? 'none' : 'cheap-module-eval-source-map',

        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true, // this prevents the default browser full page refresh on form submission and link change
            port: 8000,
            hot: true, //enable hot module replacement feature
        },
        plugins: plugins,
        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                containers: path.resolve(__dirname, 'src/containers'),
                config: path.resolve(__dirname, 'src/config'),
                routers: path.resolve(__dirname, 'src/routers'),
                components: path.resolve(__dirname, 'src/components')
            }
        }
    }
}