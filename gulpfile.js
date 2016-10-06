var gulp = require("gulp"),
	gutil = require('gulp-util'),
	sass = require("gulp-sass"),
	webpack = require("webpack"),
	usemin = require("gulp-usemin"),
	clean = require("gulp-clean"),
	copy = require("gulp-copy"),
	uglify = require("gulp-uglify"),
	minifyCss = require("gulp-minify-css"),
	rev = require("gulp-rev"),
	webpackConfig = require("./webpack.config");

var templatesTempDev = "templates/app/temp/";

var webpackDevConfig = webpackConfig({
		isDebug : true,
		htmlDest : '../../../../' + templatesTempDev
	}),
	webpackBuldConfig = webpackConfig({
		isDebug : false,
		htmlDest : '../../../../' + templatesTempDev
	}),
	webpackDevCompiler = webpack(webpackDevConfig),
	webpackBuildCompiler = webpack(webpackBuldConfig);

gulp.task("webpack",function(callback){
	webpackDevCompiler.watch({ // watch options:
	    aggregateTimeout: 300, // wait so long for more changes
	    poll: true // use polling instead of native watchers
	    // pass a number to set the polling interval
	},function(err, stats) {
	    if(err) throw new gutil.PluginError("webpack:build-js", err);
	    gutil.log("[webpack:build-js]", stats.toString({
	        colors: true
	    }));
	    callback();
	})
});

gulp.task("build-webpack",function(callback){
	webpackBuildCompiler.run(function(err, stats) {
	    if(err) throw new gutil.PluginError("webpack:build-js", err);
	    gutil.log("[webpack:build-js]", stats.toString({
	        colors: true
	    }));
	    callback();
	})
})


gulp.task("sass",function(){
	console.log("a");
	return gulp.src('./static/app/dev/sass/**.scss')
	    .pipe(sass().on('error', sass.logError))
	    .pipe(gulp.dest('./static/app/dev/css/'));
});

gulp.task('usemin', ['build-webpack'],function() {

  return gulp.src('./'+templatesTempDev+'/**/**.html')
    .pipe(usemin({
     	css : [rev,minifyCss]
    }))
    .pipe(gulp.dest('./templates/app/build/'))
});


gulp.task('copy:images', function (done) {
    gulp.src(['./static/app/dev/images/**/*'])
    .pipe(gulp.dest('./static/app/dist/images/'))
    .on('end', done);
});




gulp.task("clean",function(done){
	gulp.src(["./templates/app/build/","./static/app/dist/"])
	.pipe(clean())
})

gulp.task("clean:after",["usemin"],function(done){
	gulp.src(["./templates/app/temp/"])
	.pipe(clean())
})

gulp.task('sass:watch', function () {
  gulp.watch('./static/app/dev/sass/**.scss', ['sass']);
});

gulp.task("watch",["sass:watch","webpack"]);

gulp.task("build",["clean","build-webpack","usemin","clean:after","copy:images"]);

gulp.task("default",["build"]);
