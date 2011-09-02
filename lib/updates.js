/**
 * Update functions to be exported from the design doc.
 */

var templates = require('kanso/templates'),
    forms = require('kanso/forms'),
    utils = require('kanso/utils'),
    types = require('./types');


exports.add_blogpost = function (doc, req) {
    var form = new forms.Form(types.blogpost, null, {
        exclude: ['created']
    });

    // parse the request data and check validation and permission functions
    form.validate(req);

    if (form.isValid()) {
        // the form is valid, save the document and redirect to the new page
        return [form.values, utils.redirect(req, '/' + form.values._id)];
    }
    else {
        // the form is not valid, so render it again with error messages
        var content = templates.render('blogpost_form.html', req, {
            form_title: 'Add new blogpost',
            form: form.toHTML(req)
        });
        // return null as the first argument so the document isn't saved
        return [null, {content: content, title: 'Add new blogpost'}];
    }
};

exports.edit_blogpost = function (doc, req) {
    var form = new forms.Form(types.blogpost, doc, {
        exclude: ['created']
    });

    // parse the request data and check validation and permission functions
    form.validate(req);

    if (form.isValid()) {
        // the form is valid, save the document and redirect to the new page
        return [form.values, utils.redirect(req, '/' + form.values._id)];
    }
    else {
        // the form is not valid, so render it again with error messages
        var content = templates.render('blogpost_form.html', req, {
            form_title: 'Add new blogpost',
            form: form.toHTML(req)
        });
        // return null as the first argument so the document isn't saved
        return [null, {content: content, title: 'Add new blogpost'}];
    }
};
