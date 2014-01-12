var gulp = require("gulp");
var mocha = require("gulp-mocha");
var batch = require("gulp-batch");

gulp.task("test", function () {
  gulp.src("test/*.js")
    .pipe(mocha("--harmony"));
});

gulp.task("default", function () {
  gulp.watch(["app.js", "lib/**", "test/**"], batch(function (events, cb) {
    gulp.run("test", cb);
  }));
});

