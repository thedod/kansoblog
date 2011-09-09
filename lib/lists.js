/**
 * List functions to be exported from the design doc.
 */
var templates = require('kanso/templates'),
    config = require('./config');

exports.homepage = function (head, req) {

    start({code: 200, headers: {'Content-Type': 'text/html'}});

    var title = config.site_name;
    // fetch all the rows
    var row, rows = [];
    while (row = getRow()) {
        rows.push(row);
    }

    // generate the markup for a list of blog posts
    var content = templates.render('blogposts.html', req, {
        rows: rows
    });

    if (req.client) {
        document.title = title;
        $('#breadcrumbs').html('');
        $('#content').html(content);
        $('#actions').html(templates.render('blogposts_actions.html',req,{}));
    } else {
        return {title: title, config: config, content: content, breadcrumbs:''};
    };
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
