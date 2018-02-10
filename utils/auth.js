module.exports = {
  ensureLoggedIn: function(req, res, next) {
    if (req.session == null) {
      res.redirect("/");
    } else if (req.session.token == null) {
      res.redirect("/");
    } else {
      return next();
    }
  }
};
