/**
 * Kanso document types to export
 */

var Type = require('kanso/types').Type,
    fields = require('kanso/fields'),
    widgets = require('kanso/widgets'),
    permissions = require('kanso/permissions');

var permission_staff = permissions.any([
    permissions.hasRole('_admin'),
    permissions.hasRole('mafia') /* or whatever you call your crew */
])

var permission_creator_or_staff = permissions.any([
    permissions.usernameMatchesField('creator'),
    permissions.hasRole('_admin'),
    permissions.hasRole('mafia')
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
            widget: widgets.textarea({cols: 40, rows: 10})
        }),
    }
});
