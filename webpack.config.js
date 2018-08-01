const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./app/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "index_bundle.js"
    },
    mode: "development",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader",{
                    loader: 'postcss-loader',
                    options: {
                        config: {
                            path: path.resolve(__dirname, './postcss.config.js')
                        }
                    },
                }]
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader",{
                    loader: 'postcss-loader',
                    options: {
                        config: {
                            path: path.resolve(__dirname, './postcss.config.js')
                        }
                    },
                }, "less-loader"]
            },
            {
                test: /\.(png|jpg|jpeg|ico|gif)$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff)$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./app/index.html"
        })
    ]
};
