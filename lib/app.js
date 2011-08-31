/**
 * Values exported from this module will automatically be used to generate
 * the design doc pushed to CouchDB.
 */
module.exports = {
    types: require('./types'),
    shows: require('./shows'),
    lists: require('./lists'),
    views: require('./views'),
    updates: require('./updates'),
    filters: require('./filters'),
    rewrites: require('./rewrites'),
    validate_doc_update: require('./validate'),
    events: require('./events')
};


var session = require('kanso/session'),
    templates = require('kanso/templates'),
    events = require('kanso/events');

exports.bindSessionControls = function () {
    $('#session .logout a').click(function (ev) {
        ev.preventDefault();
        session.logout();
        return false;
    });
    $('#session .login a').click(function (ev) {
        ev.preventDefault();
        var div = $('<div><h2>Login</h2></div>');
        div.append('<form id="login_form" action="/_session" method="POST">' +
            '<div class="general_errors"></div>' +
            '<div class="username field">' +
                '<label for="id_name">Username</label>' +
                '<input id="id_name" name="name" type="text" />' +
                '<div class="errors"></div>' +
            '</div>' +
            '<div class="password field">' +
                '<label for="id_password">Password</label>' +
                '<input id="id_password" name="password" type="password" />' +
                '<div class="errors"></div>' +
            '</div>' +
            '<div class="actions">' +
                '<input type="submit" id="id_login" value="Login" />' +
                '<input type="button" id="id_cancel" value="Cancel" />' +
            '</div>' +
        '</form>');
        $('#id_cancel', div).click(function () {
            $.modal.close();
        });
        $('form', div).submit(function (ev) {
            ev.preventDefault();
            var username = $('input[name="name"]', div).val();
            var password = $('input[name="password"]', div).val();
            console.log($('.username .errors', div));
            $('.username .errors', div).text(
                username ? '': 'Please enter a username'
            );
            $('.password .errors', div).text(
                password ? '': 'Please enter a password'
            );
            if (username && password) {
                session.login(username, password, function (err) {
                    $('.general_errors', div).text(err ? err.toString(): '');
                    if (!err) {
                        $(div).fadeOut('slow', function () {
                            $.modal.close();
                        });
                    }
                });
            }
            return false;
        });
        div.modal({autoResize: true, overlayClose: true});
        return false;
    });
    $('#session .signup a').click(function (ev) {
        ev.preventDefault();
        var div = $('<div><h2>Create account</h2></div>');
        div.append('<form id="signup_form" action="/_session" method="POST">' +
            '<div class="general_errors"></div>' +
            '<div class="username field">' +
                '<label for="id_name">Username</label>' +
                '<input id="id_name" name="name" type="text" />' +
                '<div class="errors"></div>' +
            '</div>' +
            '<div class="password field">' +
                '<label for="id_password">Password</label>' +
                '<input id="id_password" name="password" type="password" />' +
                '<div class="errors"></div>' +
            '</div>' +
            '<div class="actions">' +
                '<input type="submit" id="id_create" value="Create" />' +
                '<input type="button" id="id_cancel" value="Cancel" />' +
            '</div>' +
        '</form>');
        $('#id_cancel', div).click(function () {
            $.modal.close();
        });
        $('form', div).submit(function (ev) {
            ev.preventDefault();
            var username = $('input[name="name"]', div).val();
            var password = $('input[name="password"]', div).val();
            console.log($('.username .errors', div));
            $('.username .errors', div).text(
                username ? '': 'Please enter a username'
            );
            $('.password .errors', div).text(
                password ? '': 'Please enter a password'
            );
            if (username && password) {
                session.signup(username, password, function (err) {
                    $('.general_errors', div).text(err ? err.toString(): '');
                    if (!err) {
                        session.login(username, password, function (err) {
                            $('.general_errors', div).text(err ? err.toString(): '');
                            $(div).fadeOut('slow', function () {
                                $.modal.close();
                            });
                        });
                    }
                });
            }
            return false;
        });
        div.modal({autoResize: true, overlayClose: true});
        return false;
    });
};

events.on('init', function () {
    exports.bindSessionControls();
});

events.on('sessionChange', function (userCtx, req) {
    $('#session').replaceWith(templates.render('session.html', req, userCtx));
    exports.bindSessionControls();
});
