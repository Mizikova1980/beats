const {src, dest, task, series, watch, parallel} = require("gulp");
const rm = require("gulp-rm");
const sass = require('gulp-dart-sass');
const concat = require("gulp-concat");
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require("gulp-sass-glob");
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');
const {SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS} = require('./gulp.config');

const env = process.env.NODE_ENV;



sass.compiler = require('node-sass');

task( 'clean', () => {
      return src( `${DIST_PATH}/**/*`, { read: false })
      .pipe(rm())
});

task('copy:html', () => {
    return src(`${SRC_PATH}/*.html`)
    .pipe(dest(DIST_PATH))
    .pipe(reload({stream: true}))
   });

   task('copy:img', () => {
    return src(`${SRC_PATH}/img/*`)
    .pipe(dest(`${DIST_PATH}/img`))
    .pipe(reload({stream: true}))
   });

   task('copy:video', () => {
    return src(`${SRC_PATH}/video/*`)
    .pipe(dest(`${DIST_PATH}/video`))
    .pipe(reload({stream: true}))
   });
  
   task('sass', () => {
    return src(`${SRC_PATH}/style/main.scss`)
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(SRC_PATH));
  });
   
    task('styles', () => {
    return src([...STYLE_LIBS, `${SRC_PATH}/main.css`])
      .pipe(gulpif(env === 'dev', sourcemaps.init()))
      .pipe(concat('main.min.css'))
      //.pipe(sassGlob())
      //.pipe(sass().on('error', sass.logError))
      //.pipe(px2rem())
      .pipe(autoprefixer({
        cascade: false
      }))
      .pipe(gulpif(env === 'prod', gcmq()))
      .pipe(gulpif(env === 'prod', cleanCSS()))
      .pipe(gulpif(env === 'dev', sourcemaps.write()))
      .pipe(dest(DIST_PATH))
      .pipe(reload({stream: true}))
   });

   task('scripts', () => {
    return src([...JS_LIBS, `${SRC_PATH}/js/*.js`])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
      .pipe(concat('main.min.js', {newLine: ";"}))
      .pipe(gulpif(env === 'prod', babel({
        presets: ['@babel/env']
    })))
      .pipe(gulpif(env === 'prod',uglify()))
      .pipe(gulpif(env === 'dev', sourcemaps.write()))
      .pipe(dest(DIST_PATH))
      .pipe(reload({stream: true}))
   });


   task('icons', () => {
    return src(`${SRC_PATH}/img/icons/*.svg`)
    .pipe(svgo({
        plugins: [
            {
                removeAttrs: {
                    attrs: "(fill|stroke|style|width|height|data.*)"
                }
            }
        ]
    }))
    .pipe(svgSprite({
        mode: {
            symbol: "../sprite.svg"
        }
    }))
    .pipe(dest(`${DIST_PATH}/img/icons`))
   });



task('server', () => {
    browserSync.init({
        server: {
            baseDir: `./${DIST_PATH}`
        },
        open: false
    });
});

task('watch', () => {
    watch('./src/style/**/*.scss', series('sass'));
    watch('./src/**/*.css', series('styles'));
    watch('./src/*.html', series('copy:html'));
    watch('./src/js/*.js', series('scripts'));
    watch('./src/img/icons/*.svg', series('icons'));
});
   
  
   task('default', series('clean', 'sass', parallel('copy:html', 'copy:img', 'copy:video', 'styles', 'scripts', 'icons'), parallel('server', 'watch')));
   task('build', series('clean', 'sass', parallel('copy:html', 'copy:img', 'copy:video', 'styles', 'scripts', 'icons')));