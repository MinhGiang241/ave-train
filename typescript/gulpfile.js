const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));

function buildStyles() {
  return src("src/**/*.scss", { allowEmpty: true })
    .pipe(sass())
    .pipe(dest("./public/css"));
}

function watchTask() {
  watch(["src/**/*.scss"], buildStyles);
}

exports.default = series(buildStyles, watchTask);
