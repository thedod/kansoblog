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
  if (req.client) {
    document.title = config.site_name;
    var cfg = require('./sanitize/sanitize_cfg_relaxed').Config;
    // Add rel and target to all links
    cfg.add_attributes={a:{rel:'nofollow', target:'_blank'}};
    var Sanitize = require('./sanitize/sanitize').Sanitize;
    var stz = new Sanitize(cfg);
    var row,rows = [];
    while (row = getRow()) {
      // We need to defuse script tags before sanitizing, because $('<script/>') *would* execute
      var raw_node = $('<span>'+unescape(row.value).replace(/<script/gi,'&lt;script')+'</span>').get(0)
      var clean_node = stz.clean_node(raw_node);
      rows.push($(clean_node));
    };
    // Randomize order
    rows = rows.sort(function() {return (Math.round(Math.random())>0.5?1:-1);});
    $("#carousel-container").html('<ul id="carousel" class="jcarousel-skin-'+config.carousel_skin+'"/>');
    var ul=$('#carousel');
    for (i in rows){
        ul.append($('<li/>').append(rows[i]));
    };
    ul.jcarousel({
      scroll: 1, visible: 1, wrap:'circular', rtl: config.rtl?true:false
    });
  } else {
    return templates.render('carousel.html',req,{config:config});
  };
};

