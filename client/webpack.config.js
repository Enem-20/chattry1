const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./src/index.js", // входная точка - исходный файл
    output:{
        path: path.resolve(__dirname, "./dist"),     // путь к каталогу выходных файлов - папка public
        publicPath: "./",
        filename: `bundle.js`       // название создаваемого файла
    },
    // devServer: {
    //     historyApiFallback: true,
    //     static: {
    //         directory: path.join(__dirname, "/"),
    //     },
    //     port: 8081,
    //     open: true
    // },
    module:{
        rules:[   //загрузчик для jsx
            {
                test: /\.jsx?$/, // определяем тип файлов
                exclude: /(node_modules)/,  // исключаем из обработки папку node_modules
                loader: "babel-loader",   // определяем загрузчик
                options:{
                    presets:[ "@babel/preset-react"]    // используемые плагины
                }
            }
        ]
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"],
    },
    plugins: [
        new HtmlWebpackPlugin({template: path.resolve(__dirname, './src/index.html')})
    ]
}