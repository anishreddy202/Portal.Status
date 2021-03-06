/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var pkg = require('../package.json');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/v1/status', require('./api/status'));
  app.use('/api/v1/news', require('./api/news'));
  app.use('/api/v1/users', require('./api/user'));
  app.use('/auth', require('./components/auth'));

  // Return API Version
  app.route('/api').get(function(req, res) {
    res.json({"name": pkg.name, "version": "v1", "rev": pkg.version });
  });

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
