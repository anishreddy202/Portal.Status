var assert = require("assert");

var User = function(args) {
  var user = {};

  if(args.id) { user.id = args.id; }

  user.userName = args.userName;
  user.email = args.email || null;
  user.firstName = args.firstName || null;
  user.lastName = args.lastName || null;
  user.password = args.password;

  return user;
};

module.exports = User;
