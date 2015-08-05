gulp = require('gulp')
plumber = require('gulp-plumber')
coffee = require('gulp-coffee')
sourcemaps = require('gulp-sourcemaps')
uglify = require('gulp-uglify')
imagemin = require('gulp-imagemin')
pngquant = require('imagemin-pngquant')
spritesmith = require('gulp.spritesmith')
prefix = require('gulp-autoprefixer')
please = require('gulp-pleeease')
jade = require('gulp-jade')
util = require("util")
data = require('gulp-data')
stylus = require('gulp-stylus')
scandir = require('scandir')
connect = require('gulp-connect')
gutil = require('gulp-util')
htmlmin = require('gulp-htmlmin')
purify = require('gulp-purifycss')
minifyCss = require('gulp-minify-css')
webpack = require('gulp-webpack-build')
path = require('path')
browserSync = require('browser-sync').create()
watch = require('gulp-watch')
stripCssComments = require('gulp-strip-css-comments')
uglify = require('gulp-uglify')
connect = require('gulp-connect')
reload = browserSync.reload

src = './'
dest = './'
webpackOptions =
  debug : true
  devtool : '#source-map'
  watchDelay : 200
webpackConfig =
  useMemoryFs : true
  progress : true
CONFIG_FILENAME = webpack.config.CONFIG_FILENAME
gulp.task 'webpack',[],->
  gulp.src(path.join(src,'**',CONFIG_FILENAME),
    base : path.resolve(src)).pipe(webpack.init(webpackConfig)).pipe(webpack.props(webpackOptions)).pipe(webpack.run()).pipe(webpack.format(
      version : false
      timings : true)).pipe(webpack.failAfter(
      errors : true
      warnings : true)).pipe gulp.dest(dest)
gulp.task 'webpack-watch',->
  gulp.watch(path.join(src,'app/scripts/**/**/*.*')).on 'change',(event) ->
    if event.type == 'changed'
      gulp.src(event.path,
        base : path.resolve(src)).pipe(webpack.closest(CONFIG_FILENAME)).pipe(webpack.init(webpackConfig)).pipe(webpack.props(webpackOptions)).pipe webpack.watch((err,stats) ->
        gulp.src(@path,base : @base).pipe(webpack.proxy(err,stats)).pipe(webpack.format(
          verbose : true
          version : false))
        .pipe gulp.dest(dest)
      )


gulp.task 'purify-css',->
  gulp.src('./app/styles/application.css').pipe(purify([
    './app/bundle.js'
    './app/*.html'
  ])).pipe(minifyCss()).pipe gulp.dest('./app/styles/')

gulp.task 'minifyHTML',->
  gulp.src('./app/*.html').pipe(htmlmin(collapseWhitespace : true)).pipe gulp.dest('./app/')
gulp.task 'imagemin',->
  gulp.src('./app/images/**/*').pipe(imagemin(
    progressive : true
    svgoPlugins : [{removeViewBox : false}]
    use : [pngquant()])).pipe gulp.dest('./app/images')
#gulp.task 'watchConsole',->
#  exec = require('child_process').exec
#  watch = require('gulp-watch')
#  watch './app/images/**/*.{jpg,jpeg,png,gif}',->
#    exec 'chmod 755 -R ./app/images'
gulp.task 'stylus',->
  gulp.src('./app/styles/application.styl')
  .pipe(plumber(errorHandler : (error,file) ->
      console.log error.message
      @emit 'end'
    ))
  .pipe(stylus(
      'include css' : true
      sourcemap :
        inline : true
        sourceRoot : '.'
        basePath : './app/styles'
    ))
  .pipe(please(
      'minifier' : true
      "autoprefixer" : {
        'browsers' : [
          'last 6 versions'
          'Android 4'
          'ie 9'
          'ie 10'
          'ie 11'
        ]
      },
      'filters' : true
      'oldIE' : true
      'rem' : true
      'pseudoElements' : true
      'opacity' : true
      'import' : true
      'mqpacker' : true
      'next' : true,
      preserveHacks : true,
      removeAllComments : true
      sourcemaps : true
    ))
  .pipe gulp.dest('./app/styles')
  .pipe(connect.reload())
gulp.task 'sprite',->
  spriteData = gulp.src('./app/images/sprite/*.*').pipe(spritesmith(
    imgName : 'sprite.png'
    cssName : 'utilities/_sprite.styl'
    imgPath:'../images/sprite.png'
    padding : 4
  ))
  spriteData.img.pipe gulp.dest('./app/images/')
  spriteData.css.pipe gulp.dest('./app/styles/')
gulp.task 'jade',->
  data = {}
  data.images = {}
  data.why_we = require './app/json/why-we.json'
  data.catalog = require './app/json/catalog.json'
  data.navigation_list = require './app/json/navigation-list.json'
  data.contacts = require './app/json/contacts.json'
  data.fuel_tankers = require './app/json/fuel-tankers.json'
  #  data.images.bgslider = scandir('./app/images/main-slider','names')
  gulp.src('./app/jade/pages/*.jade')
  .pipe(plumber(errorHandler : (error,file) ->
      console.log error.message
      @emit 'end'
    ))
  .pipe(jade(
      pretty : true
      locals : data
    ))
  .pipe gulp.dest('./app/')
  .pipe(connect.reload())
gulp.task 'stripCss', ->
  gulp.src('./app/styles/application.css')
  .pipe(stripCssComments())
  .pipe gulp.dest('./app/styles/')
gulp.task 'jsmin', ->
  gulp.src('./app/scripts/vendors/loadCSS.js')
  .pipe(uglify())
  .pipe gulp.dest('./app/scripts/vendors/')
gulp.task 'browser-sync',->
  browserSync.init(
    server :
      baseDir : "./app"
    open : false
  )
gulp.task 'connect',->
  connect.server
    root : 'app'
    livereload : true
    port : 3000
gulp.task 'watchSprite',->
  watch './app/images/sprite/*.*',->
    gulp.start('stylus')
  watch './app/json/**/*.json',->
    gulp.start('jade')
  watch './app/styles/**/*.styl',->
    gulp.start('stylus')
  watch './app/jade/**/*.jade',->
    gulp.start('jade')
gulp.task 'watch',->
#  gulp.watch('./app/*.html').on('change',browserSync.reload)
#  gulp.watch('./app/styles/application.css').on('change',browserSync.reload)
gulp.task 'default',[
  'sprite'
  'jade'
#  'watch'
  'watchSprite'
  'connect'
#  'browser-sync'
]