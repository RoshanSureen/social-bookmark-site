var express = require("express");
var router = express.Router();
var controllers = require("../controllers");
var utils = require("../utils");

router.get("/:resource", (req, res, next) => {
  var resource = req.params.resource;
  var controller = controllers[resource];
  if (controller == null) {
    res.json({
      confirmation: "fail",
      message: `Resource ${resource} not supported`
    });
    return;
  } else {
    controller
      .find(req.query)
      .then(results => {
        res.json({
          confirmation: "success",
          results
        });
        return;
      })
      .catch(err => {
        res.json({
          confirmation: "fail",
          message: `${resource} not found`
        });
        return;
      });
  }
});
router.get("/:resource/:id", (req, res, next) => {
  var resource = req.params.resource;
  var id = req.params.id;
  var controller = controllers[resource];
  if (controller == null) {
    res.json({
      confirmation: "fail",
      message: `Resource ${resource} not supported`
    });
    return;
  } else {
    controller
      .findById(id, true)
      .then(result => {
        res.json({
          confirmation: "success",
          result
        });
        return;
      })
      .catch(err => {
        res.json({
          confirmation: "fail",
          message: `${resource} ${id} not found`
        });
        return;
      });
  }
});
router.post("/:resource", utils.Auth.ensureLoggedIn, (req, res, next) => {
  var resource = req.params.resource;
  var formData = req.body;
  console.log(formData);
  var controller = controllers[resource];
  if (controller == null) {
    res.json({
      confirmation: "fail",
      message: `Resource ${resource} not supported`
    });
    return;
  } else {
    controller
      .create(formData)
      .then(result => {
        res.json({
          confirmation: "success",
          result
        });
        return;
      })
      .catch(err => {
        res.json({
          confirmation: "fail",
          message: `${resource} not created`
        });
        return;
      });
  }
});

module.exports = router;
