/**
 * Rewrite settings to be exported from the design doc
 */

var config = require('./config');

module.exports = [
    {from: '/static/*', to: 'static/*'},
    {from: '/favicon.ico', to: 'static/favicon.ico'},
    {from: '/', to: '_list/homepage/blogposts_by_created', method: 'GET', query: {descending:'true'}},
    {from: '/carousel', to: '_list/carousel/escaped_by_created', method: 'GET', query: {
        descending:'true',limit:config.carousel_query_limit||'10'}},
    {from: '/add', to: '_update/add_blogpost', method: 'POST'},
    {from: '/add', to: '_show/add_blogpost'},
    {from: '/edit/:id', to: '_update/edit_blogpost/:id', method: 'POST'},
    {from: '/edit/:id', to: '_show/edit_blogpost/:id'},
    {from: '/delete/:id', to: '_update/delete_blogpost/:id', method: 'POST'},
    {from: '/:id', to: '_show/blogpost/:id'},
    {from: '*', to: '_show/not_found'}
];
