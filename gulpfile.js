const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')  
const csso = require('gulp-csso')   
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin') 
const del = require('del')
const sync = require('browser-sync').create()
const autoprefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify-es').default
const imagemin = require('gulp-imagemin')
const recompress = require('imagemin-jpeg-recompress')
const pngquant = require('imagemin-pngquant')


function html() {
   return src('src/**.html')
    .pipe(include({
        prefix: '@@'
    }))
    .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true
    }))
    .pipe(dest('dist'))
}

function scss() {
    return src('src/assets/scss/**.scss')
    .pipe(sass())
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 8 versions'],
    }))
    .pipe(csso())
    .pipe(concat('index.css'))
    .pipe(dest('dist/assets/css'))
}

function scripts() {
    return src('src/assets/js/**/**.js')
    .pipe(babel())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(dest('dist/assets/js'))
}
function images() {
    return src('src/assets/img/**/*.+(png|jpg|jpeg|gif|svg|ico)')
    .pipe(
        imagemin(
            [
                recompress({
                    loops: 4, 
                    min: 80, 
                    max: 100, 
                    quality: "high",
                    use: [pngquant()],
                }),
                imagemin.gifsicle(), 
                imagemin.optipng(),
                imagemin.svgo(),
            ],
        ),
    )
    .pipe(dest('dist/assets/img'))
}

function fonts() {
    return src('src/assets/fonts/*.*')
    .pipe(dest('dist/assets/fonts/'))
}



function clear() {
    return del('dist')
}

function serve() {
    sync.init({
        server:'./dist'
    })
   
  watch('src/**/**.html', series(html)).on('change', sync.reload)
  watch('src/assets/scss/**/**.scss', series(scss)).on('change', sync.reload)
  watch('src/assets/js/**/**.js', series(scripts)).on('change', sync.reload)
  watch('src/assets/fonts/**.*', series(fonts)).on('change', sync.reload)
  watch('src/assets/img/**/**.*', series(images)).on('change', sync.reload)

}

exports.build = series(clear,images, scss,html, scripts, fonts)
exports.default = series(clear,images, scss, html, scripts, fonts, serve)
exports.clear = clear


    

