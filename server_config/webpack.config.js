const path = require("path");
module.exports = {
    //The file to start interpretation from.
    entry: "./frontend/src/index.jsx",
    mode: "development",
    watchOptions: { poll: true }, //This is required in order for auto-reload to work in docker.
    module: {
        rules: [
            {
                //Convert all the ES6 and jsx syntax into regular javascript.
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/env"]
                }
            },
            {
                //Convert all style files to regular css and then insert it into bundle.
                test:/\.(s[ac]ss|css)$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    resolve: {
        //Extensions that can be used as modules
        //import "file.js" is an example of .js
        extensions: ["*", ".js", ".jsx"]
    },
    output: {
        path: path.resolve(__dirname, "dist/"),
        publicPath: "/dist/",
        filename: "bundle.js"
    }
};

