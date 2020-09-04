Gulp 4 
======

h3 For use:

.1 npm install (This command installs  any packages that it depends on.)
.2 gulp (default command for initialization)

h3 Packages:

```js
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
