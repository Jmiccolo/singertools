const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const common = require("./webpack.common");
const merge = require("webpack-merge");

module.exports = merge(common, {
    mode: "development",
    output:{
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:"./src/template.html",
            inject:false
        })
    ],
    module:{
        rules:[
            {
                test: /\.scss$/,
                use:["style-loader", "css-loader", "sass-loader"]
            }   
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "/client/dist"),
        compress: true,
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://localhost:8081',
                secure: false
            }
        }
    }
});