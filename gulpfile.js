const gulp = require('gulp');
const minify = require('gulp-minify');

gulp.task('compress', function() {
    gulp.src('dist/*.js').pipe(minify({
            ext:{
                src:'.js',
                min:'.min.js'
            }
        }
    )).pipe(gulp.dest('dist'))
});
