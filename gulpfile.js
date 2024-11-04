/* eslint max-len:0, no-console:0, func-names: 0, no-mixed-operators:0 */
import gulp from 'gulp'
import changed from 'gulp-changed'
import size from 'gulp-size'
import imagemin from 'gulp-imagemin'
import imageminOptipng from 'imagemin-optipng'
import imageminMozjpeg from 'imagemin-mozjpeg'
import sassImage from 'gulp-sass-image'
import merge from 'merge-stream'
import spritesmith from 'gulp.spritesmith'
import buffer from 'vinyl-buffer'

// gulp.task('sprite', () => {
//   const imgSrc = [
//     'src/assets/img/**/*.+(jpg|png|gif)',
//     '!src/assets/img/_*'
//   ]
//   const otherSrc = imgSrc.map(imgPath => (imgPath.indexOf('!') === 0 ? imgPath.substr(1) : `!${imgPath}`))
//   otherSrc.push('src/asset/img/**/*.+(svg)')
//   const imgDest = 'src/assets/images'

//   const taskOtherSrc = gulp.src(otherSrc)
//     .pipe(changed(imgDest))
//     .pipe(size({ showFiles: true }))
//     .pipe(gulp.dest(imgDest))

//   const taskImgSrc = gulp.src(imgSrc)
//     .pipe(changed(imgDest))
//     .pipe(size({ showFiles: true }))
//     .pipe(imagemin([
//       imageminMozjpeg({ quality: 60 }),
//       imageminOptipng({ optimizationLevel: 3 })
//     ]))
//     .pipe(gulp.dest(imgDest))

//   return merge(taskOtherSrc, taskImgSrc)
// })

// gulp.task('watch', () => {
//   gulp.watch('src/assets/img/**', gulp.series('m'))
// })

gulp.task('sass-sprite', function () {
  return gulp.src('src/assets/sprite/*.+(jpeg|jpg|png|gif)')
    .pipe(sassImage({
      images_path: 'src/',
      template: './src/sass/gulp-helper/sass-sprite.mustache',
      targetFile: 'sass-sprite.sass'
    }))
    .pipe(gulp.dest('src/sass/'))
})

gulp.task('sass-image', function () {
  return gulp.src('src/assets/images/*.+(jpeg|jpg|png|gif)')
    .pipe(sassImage({
      images_path: 'src/',
      template: './src/sass/gulp-helper/sass-image.mustache',
      targetFile: 'sass-image.sass'
    }))
    .pipe(gulp.dest('src/sass/'))
})

gulp.task('sass-svg', function () {
  return gulp.src('src/assets/sprite/*.+(svg)')
    .pipe(sassImage({
      images_path: 'src/',
      template: './src/sass/gulp-helper/sass-svg.mustache',
      targetFile: 'sass-svg.sass'
    }))
    .pipe(gulp.dest('src/sass/'))
})

gulp.task('default', gulp.series('sass-svg', 'sass-image', 'sass-sprite'))
