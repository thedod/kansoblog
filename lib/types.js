/**
 * Kanso document types to export
 */

var Type = require('kanso/types').Type,
    fields = require('kanso/fields'),
    widgets = require('kanso/widgets'),
    permissions = require('kanso/permissions'),
    config = require('./config');

var permission_staff = permissions.any([
    permissions.hasRole('_admin'),
    permissions.hasRole(config.staff_role)
])

var permission_creator_or_staff = permissions.any([
    permissions.usernameMatchesField('creator'),
    permissions.hasRole('_admin'),
    permissions.hasRole(config.staff_role)
])

exports.blogpost = new Type('blogpost', {
    permissions: {
        add:    permission_staff,
        update: permission_staff,
        remove: permission_staff
    },
    fields: {
        created: fields.createdTime(),
        title: fields.string(),
        text: fields.string({
            widget: widgets.textarea({cols: 80, rows: 15})
        }),
    }
});
