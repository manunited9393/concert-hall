const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');


gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);

});

gulp.task('styles', function() {

    return gulp.src("src/sass/*.scss")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({
            suffix: '.min',
        }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());

});

gulp.task('watch', function() {
    gulp.watch('src/sass/**/*.scss', {delay: 700}, gulp.parallel('styles'));
    gulp.watch('src/*html').on('change', gulp.parallel('html-min'));
    gulp.watch('src/js/**/*js').on('change', gulp.parallel('scripts'));
    gulp.watch('src/fonts/**/*').on('all', gulp.parallel('fonts'));
    gulp.watch('src/images/**/*').on('all', gulp.parallel('img-min'));
    
});


gulp.task("html-min", function() {
    return gulp.src("src/*html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist"));
});

gulp.task("img-min", function() {
    return gulp.src("src/images/**/*")
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest("dist/images"));
});

gulp.task('fonts', function() {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"));
});

gulp.task('favIcons', function() {
    return gulp.src("src/fav-icons/**/*")
        .pipe(gulp.dest('dist/fav-icons'));
});

gulp.task("scripts", function() {
    return gulp.src("src/js/**/*")
        .pipe(gulp.dest('dist/js'));
});


gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html-min', 'img-min', 'fonts', 'favIcons', 'scripts'));

