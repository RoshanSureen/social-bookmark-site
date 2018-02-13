var express = require("express");
var router = express.Router();
var controllers = require("../controllers");
var bcrypt = require("bcryptjs");
var utils = require("../utils");

router.get("/:action", (req, res, next) => {
  var action = req.params.action;
  if (action == "logout") {
    req.session.reset();
    res.json({
      confirmation: "success"
    });
    return;
  } else if (action == "currentuser") {
    if (req.session == null) {
      res.json({
        confirmation: "fail",
        message: "User not logged in"
      });
      return;
    } else if (req.session.token == null) {
      res.json({
        confirmation: "fail",
        message: "User not logged in"
      });
      return;
    } else {
      // verify session token
      var token = req.session.token;
      utils.JWT.verify(token, process.env.TOKEN_SECRET)
        .then(decode => {
          return controllers.profile.findById(decode.id);
        })
        .then(profile => {
          res.json({
            confirmation: "success",
            profile
          });
          return;
        })
        .catch(err => {
          res.json({
            confirmation: "fail",
            message: "Invalid user token"
          });
          return;
        });
    }
  } else {
    res.json({
      confirmation: "fail",
      message: `${action} not supported`
    });
    return;
  }
});
router.post("/:action", (req, res, next) => {
  var action = req.params.action;
  var formData = req.body;
  if (action == "register") {
    controllers.profile
      .find({ email: formData.email })
      .then(profiles => {
        if (profiles.length != 0) {
          res.json({
            confirmation: "fail",
            message: `User with email ${
              formData.email
            } already exists! Please Login`
          });
          return;
        } else {
          controllers.profile
            .create(formData)
            .then(profile => {
              // create a signed JWT token
              var token = utils.JWT.sign(
                { id: profile.id },
                process.env.TOKEN_SECRET
              );
              // attach the token to the session
              req.session.token = token;
              res.json({
                confirmation: "success",
                profile,
                token
              });
              return;
            })
            .catch(err => {
              res.json({
                confirmation: "fail",
                message: "profile not created"
              });
              return;
            });
        }
      })
      .catch(err => {
        res.json({
          confirmation: "fail",
          message: err
        });
        return;
      });
  } else if (action == "login") {
    controllers.profile
      .find({ email: formData.email }, true)
      .then(profiles => {
        if (profiles.length == 0) {
          res.json({
            confirmation: "fail",
            message: `No profile found with email ${formData.email}`
          });
          return;
        } else {
          var profile = profiles[0];
          var hashPassword = profile.password;
          var formPassword = formData.password;
          var checkPassword = bcrypt.compareSync(formPassword, hashPassword);
          if (checkPassword == true) {
            // create a signed JWT token
            var token = utils.JWT.sign(
              { id: profile._id },
              process.env.TOKEN_SECRET
            );
            // attach the JWT token to the session
            req.session.token = token;
            res.json({
              confirmation: "success",
              profile: profile.summary(),
              token
            });
            return;
          } else {
            res.json({
              confirmation: "fail",
              message: "Passwords do not match!!"
            });
            return;
          }
        }
      })
      .catch(err => {
        res.json({
          confirmation: "fail",
          message: "No user is currenlty logged in"
        });
        return;
      });
  } else {
    res.json({
      confirmation: "fail",
      message: `${action} not supported`
    });
    return;
  }
});

module.exports = router;
