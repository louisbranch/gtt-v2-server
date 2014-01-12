var gulp = require("gulp");
var exec = require("gulp-exec");

gulp.task("test", function () {
  gulp.src("").pipe(exec("npm test"));
});

gulp.task("default", function () {
  gulp.watch(["app.js", "lib/**", "test/**"], function() {
    gulp.run("test");
  });
});

