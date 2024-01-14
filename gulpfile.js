const{ src, dest, watch, parallel } = require ("gulp");
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const avif = require('gulp-avif');

function css(done){
  src('src/scss/**/*.scss')
    .pipe( plumber())
    .pipe( sass() )
    .pipe( dest("build/css") )

  done();
}

function imagenes(done) {
  const opciones = {
    optimizationLevel: 3
  }
  src('src/img/**/*.{png,jpg}')
    .pipe( cache( imagemin(opciones) ) )
    .pipe( dest('build/img') )
  done();
}

function versionWebp( done ) {
  const opciones = {
      quality: 50
  };
  src('src/img/**/*.{png,jpg}')
    .pipe( webp(opciones) )
    .pipe( dest('build/img') )
  done();
}

function versionAvif( done ) {
  const opciones = {
      quality: 50
  };
  src('src/img/**/*.{png,jpg}')
    .pipe( avif(opciones) )
    .pipe( dest('build/img') )
  done();
}
function javascipt(done) {
  src('src/Js/**/*.js')
  .pipe (dest('build/js'))
  done();
}

function dev(done){
  watch('src/scss/**/*.scss', css)
  watch('src/js/**/*.js', javascipt)

  done();
}

exports.css = css;
exports.js = javascipt;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascipt, dev);