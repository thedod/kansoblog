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

    return {title: require('./config').site_name, site_name: config.site_name, content: content};

};
