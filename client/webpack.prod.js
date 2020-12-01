const path = require("path");
module.exports = {
    mode: "production",
    entry:"./src/index.js",
    output:{
        filename: "main.[contentHash].js",
        path: path.resolve(__dirname, "dist")
    }
    module:{
        rules:[
            {
                test: /\.scss$/,
                use:["style-loader", "css-loader", "sass-loader"]
            }   
        ]
    }
}