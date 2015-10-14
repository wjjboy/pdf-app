/**
 * login filter
 */
exports.authorize = function (req, res, next) {
  if (!req.session.user) {
    res.redirect('/index');
  } else {
    next();
  }
}
