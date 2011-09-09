/**
 * Show functions to be exported from the design doc.
 */

var templates = require('kanso/templates'),
    forms = require('kanso/forms'),
    utils = require('kanso/utils'),
    config = require('./config'),
    types = require('./types');

exports.not_found = function (doc, req) {
    start({code: 200, headers: {'Content-Type': 'text/html'}});
    return {
        title: config.site_name+" - Not found",
        content: templates.render('404.html', req, {}),
        breadcrumbs: 'Not found'
    };
};

exports.blogpost = function (doc, req) {
  var title = config.site_name+' - '+doc.title;
  var breadcrumbs = utils.escapeHTML(doc.title);
  start({code: 200, headers: {'Content-Type': 'text/html'}});
  if (req.client) {
    document.title = title;
    $('#breadcrumbs').html(breadcrumbs);
    var cfg = require('./sanitize/sanitize_cfg_relaxed').Config;
    // Add rel and target to all links
    cfg.add_attributes={a:{rel:'nofollow', target:'_blank'}};
    var Sanitize = require('./sanitize/sanitize').Sanitize;
    var stz = new Sanitize(cfg);
    // We need to defuse script tags before sanitizing, because $('<script/>') *would* execute
    $('#content').html(stz.clean_node(
        $('<span>'+doc.text.replace(/<script/gi,'&lt;script')+'</span>').get(0)
    ));
    $('#actions').html(templates.render('blogpost_actions.html',req,doc));
  } else {
    doc.escaped = escape(doc.text);
    var content = templates.render('blogpost.html', req, doc);
    return {title:title, config: config, content:content, breadcrumbs:breadcrumbs}
  };
};

exports.add_blogpost = function (doc, req) {
    var title = config.site_name + ' - Add new blogpost';
    var breadcrumbs = 'Add new blogpost';
    start({code: 200, headers: {'Content-Type': 'text/html'}});
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
    if (req.client) {
        document.title = title;
        $('#content').html(content);
        $('#breadcrumbs').html(breadcrumbs);
        $('#actions').html(''); 
	$('#id_title').focus();
	$('#id_text').wysiwyg({
                controls:window.wysiwyg_controls,
                css: {direction: config.rtl ? 'rtl' : 'ltr'},
                initialContent:''
        });
    } else {
        return {title: title, config: config, content: content, breadcrumbs:breadcrumbs};
    };
};

exports.edit_blogpost = function (doc, req) {
    var title = config.site_name + ' - Edit blogpost - '+doc.title;
    var breadcrumbs = '<a href="'+utils.getBaseURL(req)+'/'+doc._id+'">'+utils.escapeHTML(doc.title)+'</a> Edit';
    start({code: 200, headers: {'Content-Type': 'text/html'}});
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
    if (req.client) {
        document.title = title;
        $('#breadcrumbs').html(breadcrumbs);
        $('#content').html(content);
        $('#actions').html(''); 
	$('#id_title').focus();
	$('#id_text').wysiwyg({
                controls:window.wysiwyg_controls,
                css: {direction: config.rtl ? 'rtl' : 'ltr'},
                initialContent:''
        });
    } else {
        return {title: title, config: config, content: content, breadcrumbs:breadcrumbs};
    };
};
