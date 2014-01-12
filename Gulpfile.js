var gulp = require("gulp");
var batch = require("gulp-batch");
var exec = require("gulp-exec");

gulp.task("test", function () {
  gulp.src("test/*.js")
    .pipe(exec("npm test"));
});

gulp.task("default", function () {
  gulp.watch(["app.js", "lib/**", "test/**"], batch(function (events, cb) {
    gulp.run("test", cb);
  }));
});

