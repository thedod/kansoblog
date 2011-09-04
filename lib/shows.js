/**
 * Show functions to be exported from the design doc.
 */

var templates = require('kanso/templates'),
    forms = require('kanso/forms'),
    config = require('./config'),
    types = require('./types');

exports.not_found = function (doc, req) {
    return {
        title: config.site_name+" - Not found",
        content: templates.render('404.html', req, {})
    };
};

exports.blogpost = function (doc, req) {
    doc.escaped = escape(doc.text);
    doc.site_name = config.site_name;
    var content = templates.render('blogpost.html', req, doc);
    return {title:config.site_name+' - '+doc.title, config: config, content:content}
};

exports.add_blogpost = function (doc, req) {
    var form = new forms.Form(types.blogpost, null, {
        exclude: ['created']
    });

    // render the markup for a blog post form
    var content = templates.render('blogpost_form.html', req, {
        form_title: 'Add new blogpost',
        button_label: 'Add',
        config: config,
        form: form.toHTML(req)
    });

    return {title: config.site_name + ' - Add new blogpost', config: config, content: content};
};

exports.edit_blogpost = function (doc, req) {
    var form = new forms.Form(types.blogpost, doc, {
        exclude: ['created']
    });

    // render the markup for a blog post form
    var content = templates.render('blogpost_form.html', req, {
        form_title: doc.title,
        button_label: 'Save',
        id:doc._id,
        config: config,
        form: form.toHTML(req)
    });

    return {title: config.site_name + ' - Edit blogpost - '+doc.title, config: config, content: content};
};
