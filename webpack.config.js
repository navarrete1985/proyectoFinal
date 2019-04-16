
const {VueLoaderPlugin} = require('vue-loader');
const path = require('path');

module.exports = {
    entry: './src/app/index.js',
    output: {
        path: path.resolve(__dirname, './src/public/js'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                // options: {
                //     loaders: {
                //         'scss': [
                //             'vue-style-loader',
                //             'css-loader',
                //             'sass-loader'
                //         ],
                //         'sass': [
                //             'vue-style-loader',
                //             'css-loader',
                //             'sass-loader?indentedSyntax'
                //         ]
                //     }
                // }
            },
            {
                test: /\.scss$/,
                include: [
                    path.resolve(__dirname, './src/app'),
                ],
                use: ["vue-style-loader", "css-loader", 'sass-loader']
            },
            {
                test: /\.sass$/,
                include: [
                    path.resolve(__dirname, './src/app'),
                ],
                use: [
                    "vue-style-loader", 
                    "css-loader",
                    {
                        loader: 'sass-loader',
                        options: {
                          indentedSyntax: true
                        }
                    } 
                ]
            },
            {
                test: /\.css$/,
                include: [
                    path.resolve(__dirname, './src/app/styles'),
                ],
                use: ["vue-style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]?[hash]"
                }
            }
        ]
    },
    resolve: {
        alias: {
            vue$: "vue/dist/vue.esm.js"
        },
        extensions: ["*", ".js", ".vue", ".json"]
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true
    },
    performance: {
        hints: false
    },
    devtool: "#eval-source-map",
    plugins: [
        new VueLoaderPlugin()
    ]
};

if (process.env.NODE_ENV === "production") {

    module.exports.devtool = "#source-map";

    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: '"production"'
            }
        })
    ]),
    
    new webpack.LoaderOptionsPlugin({
        minimize: true
    })
}