var path = require("path");
var fs = require('fs');
var webpack = require("webpack");

var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var AggressiveMergingPlugin = webpack.optimize.AggressiveMergingPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');

var jsSrc = "./static/app/dev/js/",
    jsDistSrc = "./static/app/dist/js/",
    pageSrc = "./templates/app/dev/",
    distSrc = "./static/app/dist/js",
    entriesSrc = "./static/app/dev/js/controllers/",
    debugServer = 'http://localhost:8080',
    buildServer = "http://localhost:8088" ;

var htmlDest = "";
var isDebug = true;
function config(options) {
    isDebug = options.isDebug;
    htmlDest = options.htmlDest;
    jsSrc = options.jsSrc || jsSrc;
    jsDistSrc = options.jsDistSrc || jsDistSrc;
    distSrc = options.distSrc || distSrc;
    entriesSrc = options.entriesSrc || entriesSrc;
    debugServer = options.debugServer || debugServer;

    var entries = {
        common: ['quan-mvc'],
        lib: ['zepto', 'lrz']
    };
    entries = merge(entries, getEntries());
    var chunks = Object.keys(entries);

    var config = {
        entry: entries,

        output: {
            // 在debug模式下，__build目录是虚拟的，webpack的dev server存储在内存里
            path: distSrc,
            filename: isDebug?'[name].js':'[name].[chunkhash:8].min.js',
            chunkFilename: isDebug?'[id].chunk.js':'[id].chunk.[chunkhash:8].min.js',
            publicPath: isDebug?debugServer+distSrc + '/': buildServer + distSrc + '/'
        },
        devtool: 'source-map', //方便代码调试
        plugins: [
            new CommonsChunkPlugin({
                name: ['common', 'lib'],
                minChunks : 2
            }),
        ]
       
    }
    setPage(config);
    if(!isDebug){
        config.plugins.push(
            new UglifyJsPlugin({
                 compress: {
                    warnings: false
                 }
            })
        )
    }
    return config;
}

var setPage = function(config) {
    var folders = fs.readdirSync(pageSrc);

    folders.forEach(function(folderName) {
        var folderReg = /^[a-zA-Z0-9_]+$/;
        if (folderReg.test(folderName)) {
            configHTMl(pageSrc, folderName, config);
        }
    });
}

var configHTMl = function(folderSrc, folderName, config) {
    var pages = fs.readdirSync(folderSrc + folderName);

    pages.forEach(function(fileName) {

        var m = fileName.match(/(.+)\.html$/);
        // console.log(m);
        if (m) {
            upperFirstLetter = m[1][0].toUpperCase();
            m[1] = m[1].replace(m[1][0], upperFirstLetter);
            var entryName = folderName + m[1];
            // @see https://github.com/kangax/html-minifier
            var conf = {
                template: folderSrc + folderName + '/' + fileName,
                // @see https://github.com/kangax/html-minifier
                // minify: {
                //     collapseWhitespace: ,
                //     removeComments: true
                // },
                filename:  htmlDest + folderName + '/' + fileName
            };

            //m[1] => index or gooddetail
            if (entryName in config.entry) {
                conf.inject = 'body';
                //一下配置是把js和相关的html文件一一对应，如果不加此配置，就会把所有的js都注入到html中，显然多余
                conf.chunks = ['lib', 'common', entryName];
            }

            config.plugins.push(new HtmlWebpackPlugin(conf));
        }
    });
}

var getEntries = function() {

    var files = fs.readdirSync(entriesSrc);

    var regexp = /(.*)\.js$/;
    var map = {};
    var index = 0;
    files.forEach((file) => {
        var matchfile = file.match(regexp) || file.match(/^\.DS_Store/);

        if (!matchfile) {
            var nextFileUrl = entriesSrc + file;
            var entries = getControllersFileName(nextFileUrl, file);
            map = merge(map, entries);
        }

    });

    return map;
}


var getControllersFileName = function(url, fileFolderName) {
    var files = fs.readdirSync(url);
    var regexp = /(.*)\.js$/;
    var map = {};

    files.forEach((file) => {
        var matchfile = file.match(regexp);

        if (matchfile) {
            map[fileFolderName + matchfile[1]] = url + "/" + matchfile[0];
        }

    });

    return map;
}

var merge = function(obj1, obj2) {
    for (var el in obj2) {
        if (!obj1[el]) {
            obj1[el] = obj2[el]
        }
    }
    return obj1;
}

module.exports = config;