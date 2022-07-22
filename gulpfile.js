const { src, dest, watch, parallel, series } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const csso = require('gulp-csso');
const del = require('del');
const minify = require('gulp-minify');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const order = require('gulp-order');

const paths = {
    html: {
        src: 'src/**/*.html',
        dest: 'output/'
    },
    css: {
        src: 'src/scss/**/*.scss',
        dest: 'output/assets/css'
    },
    js: {
        src: 'src/js/**/*.js',
        dest: 'output/assets/js'
    },
    fonts: {
        src: 'src/fonts/*',
        dest: 'output/assets/fonts'
    }
};

function clean () {
    return del([
        'output/css/*.css',
        'output/js/*.js'
    ])
}

function html () {
    return src(paths.html.src)
        .pipe(dest(paths.html.dest))
}

function css () {
    return src(paths.css.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(autoprefixer())
        .pipe(csso())
        .pipe(sourcemaps.write('.'))
        .pipe(dest(paths.css.dest))
}

function js () {
    return src(paths.js.src)
        .pipe(sourcemaps.init())
        .pipe(order([
            'subjects/*',
            'elements/*',
            'observers/*',
            'main.js'
        ]))
        .pipe(concat('index.js'))
        .pipe(babel())
        .pipe(minify())
        .pipe(sourcemaps.write())
        .pipe(dest(paths.js.dest))
}

function fonts () {
    return src(paths.fonts.src)
        .pipe(dest(paths.fonts.dest))
}

function watchFiles () {
    browserSync.init({
        server: {
            baseDir: './output',
            index: '/index.html'
        }
    });

    watch(paths.html.src, html);
    watch(paths.css.src, css);
    watch(paths.js.src, js);
    watch('src/').on('change', browserSync.reload);
}

const build = series(clean, fonts, parallel(html, css, js), watchFiles);

exports.css = css;
exports.js = js;
exports.watch = watchFiles;
exports.build = build;

exports.default = build;
