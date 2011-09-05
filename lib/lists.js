/**
 * List functions to be exported from the design doc.
 */
var templates = require('kanso/templates'),
    config = require('./config');

exports.homepage = function (head, req) {

    start({code: 200, headers: {'Content-Type': 'text/html'}});

    // fetch all the rows
    var row, rows = [];
    while (row = getRow()) {
        rows.push(row);
    }

    // generate the markup for a list of blog posts
    var content = templates.render('blogposts.html', req, {
        rows: rows
    });

    return {title: config.site_name, config: config, content: content};

};

exports.carousel = function (head, req) {

    start({code: 200, headers: {'Content-Type': 'text/html'}});

    // fetch all the rows
    var row, rows = [];
    while (row = getRow()) {
        rows.push(row);
    }

    // generate the markup for a list of blog posts
    return templates.render('carousel.html', req, {
        rows: rows,
        config: config
    });
};
