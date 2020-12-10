const path=require("path");
const HtmlWebpackPlugin=require('html-webpack-plugin');
const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const {CleanWebpackPlugin}=require("clean-webpack-plugin");
module.exports={
    mode:"production",
    entry:{
        index:'./src/index.js',
        // product:'./src/product.js',
        // tpl2:'./src/tpl2.js'
    },
    output:{
        path:path.resolve(__dirname,"../dist/"),
        filename:'[name].js'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    // {loader:'style-loader'},
                    {loader:MiniCssExtractPlugin.loader},
                    {loader:'css-loader'}
                ]
            },
            {
                test:/\.less$/,
                use:[
                    // {loader:'style-loader'},
                    {loader:MiniCssExtractPlugin.loader},
                    {loader:'css-loader'},
                    {loader:'less-loader'}
                ]
            },
            {
                test:/\.(jpg|png|gif|webp|jpeg)$/,
                use:[
                        {
                        loader:'url-loader',
                        options:{
                            limit:102400    // 单位：byte 图片小于100k的时候转化base64
                        }
                    }
                ]
            },
            {
                test:/\.js$/, // 匹配 js 文件
                exclude:/(node_modules|bower_components)/, // babel转化的时候排除  node_modules 和 brower_components 文件夹
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['env'] // 预设env  es6 转化  es5
                    }
                }
            },
            {
                test:/\.s[ac]ss$/i,
                use:[
                    {loader:MiniCssExtractPlugin.loader},
                    {loader:'css-loader'},
                    {loader:'sass-loader'}
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'画三角形',
            template:'./src/index.html',
            inject:'body',
            minify:{
                removeComments:true,
                removeAttributeQuotes:true,
                collapseWhitespace:true
            },
            chunks:['index'],
            filename:'index.html' //输出模板名称
        }),
        // new HtmlWebpackPlugin({
        //     title:'网页标题aaaaa',
        //     template:'./src/tpl2.html',
        //     inject:'body',
        //     minify:{
        //         removeComments:true,
        //         removeAttributeQuotes:true,
        //         collapseWhitespace:true
        //     },
        //     chunks:['tpl2'],
        //     filename:'tpl2.html' //输出模板名称
        // }),
        new MiniCssExtractPlugin({
            filename:'[name].[hash].css'
        }),
        new CleanWebpackPlugin()
    ],
    devServer:{
        contentBase:path.join(__dirname,"../dist"),
        compress:true,
        port:8080,
        open:true
    },
}