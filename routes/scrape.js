var express = require("express");
var router = express.Router();
var cheerio = require("cheerio");

router.get("/", (req, res, next) => {
  var url = req.query.url;
  if (url == null) {
    res.json({
      confirmation: "fail",
      message: "please enter a valid url"
    });
    return;
  } else {
  }
});

module.exports = router;
