"use strict";

var gulp = require("gulp"),
    newer = require("gulp-newer"),
    imagemin = require("gulp-imagemin"),
    sass = require("gulp-sass"),
    sourcemaps = require("gulp-sourcemaps"),
    del = require('del'),
    autoprefixer = require("gulp-autoprefixer"),
    cleanCSS = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    concat = require("gulp-concat"),
   uglify = require("gulp-uglify"),
    npmdist = require('gulp-npm-dist'),
    browsersync = require("browser-sync"),
    fileinclude = require('gulp-file-include'),
    rtlcss = require('gulp-rtlcss');
const minify = require("gulp-minify");




var folder = {
    src: "src/", // source files
    dist: "dist/", // build files
    dist_assets: "dist/assets/" //build assets files
};

// command line args
var arg = (argList => {
    let arg = {}, a, opt, thisOpt, curOpt;
    for (a = 0; a < argList.length; a++) {

        thisOpt = argList[a].trim();
        opt = thisOpt.replace(/^\-+/, '');

        if (opt === thisOpt) {

            // argument value
            if (curOpt) arg[curOpt] = opt;
            curOpt = null;

        }
        else {

            // argument name
            curOpt = opt;
            arg[curOpt] = true;

        }

    }

    return arg;

})(process.argv);


/*
Copy third party libs
*/

function copyAssets() {
    var out = folder.dist_assets + "/libs/";
    return gulp
        .src(npmdist(), { base: './node_modules' })
        .pipe(rename(function (path) {
            path.dirname = path.dirname.replace(/\/dist/, '').replace(/\\dist/, '');
        }))
        .pipe(gulp.dest(out));
}

// cleaning the dist directory
function clean(done) {
    del.sync(folder.dist);
    done();
}

// image processing
function imageMin() {
    var out = folder.dist_assets + "images";
    return gulp
        .src(folder.src + "images/**/*")
        .pipe(newer(out))
        .pipe(imagemin())
        .pipe(gulp.dest(out));
}

// copy fonts from src folder to dist folder
function fonts() {
    var out = folder.dist_assets + "fonts/";

    return gulp.src([folder.src + "fonts/**/*"]).pipe(gulp.dest(out));
}

// copy dummy data in assets
function data() {
    var out = folder.dist_assets + "data/";

    return gulp.src([folder.src + "data/**/*"]).pipe(gulp.dest(out));
}

// copy html files from src folder to dist folder, also copy favicons
function html() {
    var out = folder.dist;

    return gulp
        .src([
            folder.src + "html/**", "!" + folder.src + "html/**/partials/**"
        ])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: false
        }))
        .pipe(gulp.dest(out));
}

// compile & minify sass
function css() {
    gulp
        .src([folder.src + "/scss/**/*.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass()) // scss to css
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['> 1%']
            })
        )
        .pipe(gulp.dest(folder.dist_assets + "css/"))
        .pipe(cleanCSS())
        .pipe(
            rename({
                // rename app.css to icons.min.css
                suffix: ".min"
            })
        )
        .pipe(sourcemaps.write("./")) // source maps for icons.min.css
        .pipe(gulp.dest(folder.dist_assets + "css/"));


        gulp.src(folder.src + "data/jstree.png").pipe(rename('jstree.png')).pipe(gulp.dest(folder.dist_assets + "css/config/images"));

        gulp.src(folder.dist_assets + "libs/jstree/themes/default/throbber.gif").pipe(rename('loading.gif')).pipe(gulp.dest(folder.dist_assets + "css/config/images"));
        
        return gulp
        .src([folder.src + "/scss/**/*.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass()) // scss to css
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['> 1%']
            })
        )
        .pipe(gulp.dest(folder.dist_assets + "css/"))
        .pipe(rtlcss())
        .pipe(
            rename({
                // rename app.css to icons.min.css
                suffix: "-rtl.min"
            })
        )
        .pipe(sourcemaps.write("./")) // source maps for icons.min.css
        .pipe(gulp.dest(folder.dist_assets + "css/"));

}

// js
function jsPages() {
    var out = folder.dist_assets + "js/";

    return gulp.src(folder.src + "js/pages/*.js")
        .pipe(uglify())
        .on("error", function (err) {
            console.log(err.toString());
        })
        .pipe(gulp.dest(out + "pages"));
}

function jsVendor() {
    var out = folder.dist_assets + "js/";

    // It's important to keep files at this order
    // so that `app.min.js` can be executed properly
    return gulp.src([
        folder.dist_assets + "libs/jquery/jquery.min.js",
        folder.dist_assets + "libs/bootstrap/js/bootstrap.bundle.min.js",
        folder.dist_assets + "libs/simplebar/simplebar.min.js",
        folder.dist_assets + "libs/node-waves/waves.min.js",
        folder.dist_assets + "libs/waypoints/lib/jquery.waypoints.min.js",
        folder.dist_assets + "libs/jquery.counterup/jquery.counterup.min.js",
        folder.dist_assets + "libs/feather-icons/feather.min.js"
    ])
        .pipe(sourcemaps.init())
        .pipe(concat("vendor.js"))
        .pipe(gulp.dest(out))
        .pipe(
            rename({
                // rename app.js to app.min.js
                suffix: ".min"
            })
        )
        .pipe(minify())
        .on("error", function (err) {
            console.log(err.toString());
        })
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(out));

}

function jsTheme() {
    var out = folder.dist_assets + "js/";

    return gulp
        .src([
            folder.src + "js/layout.js",
            folder.src + "js/app.js"
        ])
        .pipe(sourcemaps.init())
        .pipe(concat("app.js"))
        .pipe(gulp.dest(out))
        .pipe(
            rename({
                // rename app.js to app.min.js
                suffix: ".min"
            })
        )
        .pipe(uglify())
        .on("error", function (err) {
            console.log(err.toString());
        })
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(out));
}

// live browser loading
function browserSync(done) {
    var demo = arg.demo ? arg.demo : "default"; // default, creative

    browsersync.init({
        server: {
            baseDir: folder.dist + demo,
            routes: {
                "/assets": folder.dist + 'assets'
            }
        }
    });
    done();
}

function reloadBrowserSync(done) {
    browsersync.reload();
    done();
}

// watch all changes
function watchFiles() {
    gulp.watch(folder.src + "html/**", gulp.series(html, reloadBrowserSync));
    gulp.watch(folder.src + "assets/images/**/*", gulp.series(imageMin, reloadBrowserSync));
    gulp.watch(folder.src + "assets/fonts/**/*", gulp.series(fonts, reloadBrowserSync));
    gulp.watch(folder.src + "scss/**/*", gulp.series(css, reloadBrowserSync));
    gulp.watch(folder.src + "js/**/*", gulp.series(jsVendor, jsPages, jsTheme, reloadBrowserSync));
}

// watch all changes
gulp.task("watch", gulp.parallel(watchFiles, browserSync));

// default task
gulp.task(
    "default",
    gulp.series(
        copyAssets,
        html,
        imageMin,
        fonts,
        data,
        css,
        jsVendor, jsPages, jsTheme,
        'watch'
    ),
    function (done) { done(); }
);

// build
gulp.task(
    "build",
    gulp.series(clean,
        copyAssets,
        html,
        imageMin,
        fonts,
        data,
        css,
        jsVendor, jsPages, jsTheme)
);
