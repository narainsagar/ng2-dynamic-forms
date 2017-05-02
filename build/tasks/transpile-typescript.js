let gulp = require("gulp"),
    ts = require("gulp-typescript"),
    sourceMaps = require("gulp-sourcemaps");

module.exports = function (src, dest, configPath) {

    return function () {

        let tsProject = ts.createProject(configPath);

        return gulp.src(src)
                   .pipe(sourceMaps.init())
                   .pipe(tsProject(ts.reporter.defaultReporter()))
                   .pipe(sourceMaps.write("."))
                   .pipe(gulp.dest(dest));
    };
};