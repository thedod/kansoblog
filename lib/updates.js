/**
 * Update functions to be exported from the design doc.
 */

var templates = require('kanso/templates'),
    forms = require('kanso/forms'),
    utils = require('kanso/utils'),
    flashmessages = require('kanso/flashmessages'),
    config = require('./config'),
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
        flashmessages.addMessage(req, {
            type: 'error',
            message: 'Please correct the errors below'
        });
        // the form is not valid, so render it again with error messages
        var content = templates.render('blogpost_form.html', req, {
            form_title: 'Add new blogpost',
            config: config,
            form: form.toHTML(req)
        });
        // return null as the first argument so the document isn't saved
        return [null, {content: content, title: config.site_name+' - Add new blogpost', button_label:'Add'}];
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
        flashmessages.addMessage(req, {
            type: 'error',
            message: 'Please correct the errors below'
        });
        // the form is not valid, so render it again with error messages
        var content = templates.render('blogpost_form.html', req, {
            form_title: doc.title,
            id:doc._id,
            config: config,
            form: form.toHTML(req)
        });
        // return null as the first argument so the document isn't saved
        return [null, {content: content, title: config.site_name+' - Edit blogpost - '+doc.title, button_label:'save'}];
    }
};

exports.delete_blogpost = function (doc, req) {
    flashmessages.addMessage(req, {
        type: 'success',
        message: 'Deleted '+doc._id
    });
    doc._deleted = true;
    return [doc, utils.redirect(req, '/')];
};
