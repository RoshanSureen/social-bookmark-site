var Profile = require("../models/Profile");
var Promise = require("bluebird");
var bcrypt = require("bcryptjs");

module.exports = {
  find: function(params, isRaw) {
    return new Promise((resolve, reject) => {
      if (isRaw == null) {
        isRaw = false;
      }
      Profile.find(params, (err, profiles) => {
        if (err) {
          reject(err);
          return;
        } else {
          if (isRaw == true) {
            resolve(profiles);
            return;
          }
          var summaries = [];
          profiles.forEach(profile => summaries.push(profile.summary()));
          resolve(summaries);
          return;
        }
      });
    });
  },
  findById: function(id) {
    return new Promise((resolve, reject) => {
      Profile.findById(id, (err, profile) => {
        if (err) {
          reject(err);
          return;
        } else {
          resolve(profile.summary());
          return;
        }
      });
    });
  },
  create: function(params) {
    return new Promise((resolve, reject) => {
      var password = params.password;
      params["password"] = bcrypt.hashSync(password, 10);
      Profile.create(params, (err, profile) => {
        if (err) {
          reject(err);
          return;
        } else {
          resolve(profile.summary());
          return;
        }
      });
    });
  }
};
