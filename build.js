var fs = require('fs');
var CleanCSS = require('clean-css');

var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var highlighter = require('highlighter');
var layouts = require('metalsmith-layouts');
var inplace = require('metalsmith-in-place');
var permalinks = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
metalsmith(__dirname)
    .metadata({
        authorName: 'Khen Daniel',
        domainUrl: "http://khendaniel.com",
        description: "This is my site",
        logo: fs.readFileSync('src/assets/images/kd-logo.html.svg'),
        css: new CleanCSS().minify(fs.readFileSync('src/assets/style.css')).styles
    })
    .source('src')
    .destination('build')
    .use(markdown({
        gfm: true,
        tables: true,
        highlight: highlighter()
    }))
    .use(layouts({
        pattern: ['*.html', '**/*.html'],
        default: 'layout.html.hbs'
    }))
    .use(inplace({
        pattern: '**/*.hbs',
    }))
    .use(permalinks({
        relative: false
    }))
    .use(collections({
        latestPosts: {
            sortBy: 'date',
            pattern: 'blog/*/*/*.html',
            reverse: true,
            limit: 5
        },
        posts: {
            sortBy: 'date',
            pattern: 'blog/*/*/*.html',
            reverse: true
        }
    }))
    .build(function (err) {
        if (err) {
            throw err;
        }
    });