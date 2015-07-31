'use strict';
var path = require('path');
var webpack=require('webpack');
var BowerWebpackPlugin=require("bower-webpack-plugin");
var ngminPlugin=require("ngmin-webpack-plugin");
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
module.exports={
    context:__dirname+'\\app\\scripts',
    //entry:'.\\index.coffee',
    //output:{
    //    path:__dirname+'\\app',
    //    filename:'bundle.js'
    //},


    entry:{
        bundle:".\\index.js"
        //layout: "./js6/layout.js",
        //dev: "./js6/controllers/auto/dev.js",
        //devs: "./js6/controllers/auto/devs.js",
        //sensors: "./js6/controllers/auto/sensors.js",
        //cams: "./js6/controllers/auto/cams.js",
        //events: "./js6/controllers/auto/events.js"
    },
    output:{
        path:__dirname+'\\app\\scripts',
        publicPath:"\\app\\scripts\\",
        filename:"[name].js",
        libraryTarget:'var'
    },


    devtool:'source-map',
    cache:true,
    debug:true,
    proxy:{
        "*":"http://localhost:3000"
    },

    resolve:{
        alias:{
            'TweenLite':'gsap/src/uncompressed/TweenLite'
        }
    },
    module:{
        loaders:[
            //{test:/\.js$/,loader:'babel',exclude:/node_modules/},
            {test:/\.html$/,loader:'raw',exclude:/node_modules/},
            {test:/\.jade$/,loader:'raw!jade-html',exclude:/node_modules/},
            {test:/\.css$/,loader:'style!css',exclude:/node_modules/},
            {test:/\.styl$/,loader:'style!css!stylus',exclude:/node_modules/},
            {test:/\.coffee$/,loader:"coffee-loader"},
            {test:/.*\/app\/.*\.js$/,loader:"uglify"},
            {test:/.*\/app\/.*\.ts$/,loader:"awesome-typescript-loader"},
            //{test:/.*\/app\/.*\.js$/,loader:"babel-loader"},
            {test: path.join(__dirname, 'app/scripts'), loader: 'babel-loader'},
            //{test: path.join(__dirname, 'es6'), loader: 'babel-loader'}
            //{
            //    test:/[\/\\]node_modules[\/\\]some-legacy-script[\/\\]index\.js$/,
            //    loader:"legacy"
            //}
            //{test:/[\\\/]vendors[\\\/]modernizr[\\\/]modernizr\.js$/,loader:"imports?this=>window!exports?window.Modernizr"}
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
        new webpack.NoErrorsPlugin(),
        //new BrowserSyncPlugin({
        //    host: 'localhost',
        //    port: 3000,
        //    server: { baseDir: ['app'] }
        //}),
        new webpack.HotModuleReplacementPlugin(),
        //new ngminPlugin(),
        //new webpack.optimize.DedupePlugin(),
        //new webpack.optimize.UglifyJsPlugin({
        //    compress:{
        //        warnings:false
        //    },
        //    minimize:true
        //})
    ],
    stats: {
        colors: true
    }
};
