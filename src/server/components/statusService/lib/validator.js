'use strict';
var Joi = require('joi');
var log = require('debug')('status:validator');

// SCHEMA DEFINITION //


var systemSchema = Joi.object().keys({

});

var servicesSchema = Joi.object().keys({

});

var servicesListSchema = Joi.array().includes(servicesSchema);
var systemListSchema = Joi.array().includes(systemSchema);

var categorySchema = Joi.object().keys({
  code: Joi.string().valid(["CDN", "TRT", "RTE", "UPL"]).required(),
  name: Joi.string().required(),
  systems: systemListSchema,
  services: servicesListSchema
});

var inputSchema = Joi.array().includes(categorySchema);



var Validator = function(){
  var self = this;
  var options = {
    stripUnknown: true,
    presence: "optional"
  };

  self.validate = function(data, done){
    Joi.validate(data, inputSchema, options, function(err, value){
      if (err) {
 //       log('FAILED: ' + value + ' - ' + JSON.stringify(err, null, 2));
      } else {
        log('OK: ' + JSON.stringify(value));
      }
      done(err, value);
    });
  };

  return self;
};


module.exports = Validator;
