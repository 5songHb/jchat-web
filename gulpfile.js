var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');
require('./task/gulp.js');

// gulp.task('dev', gulpSequence('clean','git.start','webpack','replace','git.end','upload'));
gulp.task('dev', gulpSequence('clean','webpack','replace', 'upload'));
gulp.task('prod', gulpSequence('clean','webpack','replace', 'upload'));
gulp.task('git.start',gulpSequence('createDist','cleanDist','init','checkout','remote','pull'));
gulp.task('git.end',gulpSequence('add','commit','push'));

// gulp.task('dev', gulpSequence('clean','webpack','replace','init','add','commit','checkout','remote','push','upload'));