module.exports = class LogoutMiddleware {
  static destroySession(req, res, next) {
    req.session.destroy((err) => {
      console.error("Cannot destroy session");
    });
    next();
  }

  static clearCookies(req, res, next) {
    res.clearCookie("loggedIn", { path: "/" });
    res.clearCookie("sid", { path: "/" });
    next();
  }
};
