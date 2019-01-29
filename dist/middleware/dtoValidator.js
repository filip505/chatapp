'use strict';

module.exports = function (schema) {
  var tv1 = require('tv4');
  return function (req, res, next) {
    if (!tv1.validate(req.body, schema)) {
      console.log('invalid request');
      res.status(404).send(tv1.error);
    } else {
      next();
    }
  };
};
//# sourceMappingURL=dtoValidator.js.map