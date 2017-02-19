var gulp  = require('gulp');
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var browserify = require("browserify");
var babel = require("gulp-babel");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");

var moduleName = "tLi";

gulp.task("build", function() {
  var bundleStream = browserify('./src/index.js', {
    standalone: moduleName
  }).bundle();

  return bundleStream
    .pipe(source(moduleName + ".js"))
    .pipe(buffer())
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist'));
});


gulp.task("compress", function() {
  return gulp.src("./dist/" + moduleName + ".js")
    .pipe(uglify())
    .pipe(rename(moduleName + ".min.js"))
    .pipe(gulp.dest('./dist'));
});
