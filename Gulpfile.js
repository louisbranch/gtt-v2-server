var gulp = require("gulp");
var exec = require("gulp-exec");
var jshint = require("gulp-jshint");

gulp.task("test", function () {
  gulp.src("")
    .pipe(exec("npm test"));
});

gulp.task("lint", function () {
  gulp.src(["app.js", "lib/*.js"])
    .pipe(jshint());
});

gulp.task("default", function () {
  gulp.watch(["app.js", "lib/**", "test/**"], function() {
    gulp.run("test");
  });
});

