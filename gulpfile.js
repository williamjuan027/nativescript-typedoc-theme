var gulp = require('gulp');
var td = require('gulp-typedoc');
var modulesConfig = require('./_modules/tsconfig.json');
var debug = require('gulp-debug');

gulp.task('default', function() {
var moduleFilesGlob = modulesConfig.filesGlob;
var excludes = moduleFilesGlob.filter(function(item) { return /^!/.test(item); });
var typeDocSrc = [
    '**/*.d.ts',
    "!apps/**",
    "!node-tests/**",
    "!org.nativescript.widgets.d.ts",
    "!android17.d.ts",
    "!**/*.android.d.ts",
    "!ios.d.ts",
    "!**/*.ios.d.ts"
].concat(excludes);

typeDocSrc = typeDocSrc.map(function(item) {
    return item.replace(/(!?)(.*?)/, '$1' + './_modules/' + '$2');
});

console.dir(typeDocSrc);


    return gulp
        .src(typeDocSrc)
        .pipe(debug({title: 'SOURCES'}))
        .pipe(td({
            module: 'commonjs',
            target: 'es5',
            out: "dist/",
            theme: "./ns-theme",
            name: 'NativeScript',
            includeDeclarations: true,
            mode: "file"
        }));
})

