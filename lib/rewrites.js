/**
 * Rewrite settings to be exported from the design doc
 */

module.exports = [
    {from: '/static/*', to: 'static/*'},
    {from: '/favicon.ico', to: 'static/favicon.ico'},
    {from: '/', to: '_list/homepage/blogposts_by_created', method: 'GET', query: {descending:'true'}},
    {from: '/add', to: '_update/add_blogpost', method: 'POST'},
    {from: '/add', to: '_show/add_blogpost'},
    {from: '/edit/:id', to: '_update/edit_blogpost/:id', method: 'POST'},
    {from: '/edit/:id', to: '_show/edit_blogpost/:id'},
    {from: '/:id', to: '_show/blogpost/:id'},
    {from: '*', to: '_show/not_found'}
];
