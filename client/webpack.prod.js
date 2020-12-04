const path = require("path");
module.exports = {
    mode: "production",
    entry:"./src/index.js",
    output:{
        filename: "main.[contentHash].js",
        path: path.resolve(__dirname, "dist")
    },
     plugins: [
        new HtmlWebpackPlugin({
            template:"./src/template.html",
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true
            }
        })
    ],
    module:{
        rules:[
            {
                test: /\.scss$/,
                use:["style-loader", "css-loader", "sass-loader"]
            }   
        ]
    }
}