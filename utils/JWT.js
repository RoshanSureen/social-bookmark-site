var jwt = require("jsonwebtoken");
var Promise = require("bluebird");

module.exports = {
  sign: function(obj, secret) {
    return jwt.sign(obj, secret);
  },
  verify: function(token, secret) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decode) => {
        if (err) {
          reject(err);
          return;
        } else {
          resolve(decode);
          return;
        }
      });
    });
  }
};
