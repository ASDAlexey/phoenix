'use strict';
var path=require('path');
var webpack=require('webpack');
var BowerWebpackPlugin=require("bower-webpack-plugin");
var ngminPlugin=require("ngmin-webpack-plugin");
var BrowserSyncPlugin=require('browser-sync-webpack-plugin');
module.exports={
    context:__dirname+'\\app\\scripts',
    entry:'.\\index.js',
    output:{
        path:__dirname+'\\app\\scripts',
        filename:'bundle.js'
    },


    //entry:{
    //    bundle:"./index.js"
    //},
    //output:{
    //    path:__dirname+'/app/scripts',
    //    publicPath:"/app/scripts/",
    //    filename:"[name].js",
    //    libraryTarget:'var'
    //},


    devtool:'source-map',
    cache:true,
    debug:true,
    watch:true,
    proxy:{
        "*":"http://localhost:3000"
    },

    resolve:{
        alias:{
            'TweenLite':'gsap/src/uncompressed/TweenLite',
            moment:'moment'
        }
    },
    module:{
        loaders:[
            {test:/\.html$/,loader:'raw',exclude:/node_modules/},
            {test:/\.jade$/,loader:'raw!jade-html',exclude:/node_modules/},
            {test:/\.css$/,loader:'style!css',exclude:/node_modules/},
            {test:/\.styl$/,loader:'style!css!stylus',exclude:/node_modules/},
            {test:/\.coffee$/,loader:"coffee-loader"},
            {test:/.*\/app\/.*\.js$/,loader:"uglify"},
            {test:/\.(js|jsx)$/,exclude:/node_modules/,loader:'babel'}
        ],
        preLoaders:[
            {
                test:/\.coffee$/,
                loader:"source-map-loader"
            },
            {
                test:/\.ts$/,
                loader:"source-map-loader"
            }
        ]
    },
    plugins:[
        //new webpack.ProvidePlugin({
        //    $:"jquery",
        //    jQuery:"jquery",
        //    "window.jQuery":"jquery",
        //    "root.jQuery":"jquery"
        //}),
        //new webpack.NoErrorsPlugin(),
        //new BrowserSyncPlugin({
        //    host: 'localhost',
        //    port: 3000,
        //    server: { baseDir: ['app'] }
        //    //proxy: '0.0.0.0:3000'
        //}),
        //new webpack.HotModuleReplacementPlugin(),
        new ngminPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false
            },
            minimize:true
        })
    ],
    stats:{
        colors:true
    }
};
