'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/portal-status'
  },
  mock: true,
  APIAuthentication:true,
  seedDB: true
};
