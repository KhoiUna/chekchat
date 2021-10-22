const ValidationHelper = require("../helpers/ValidationHelper");
const RequestAccessUtil = require("../utils/RequestAccessUtil");

module.exports = class RequestAccessController {
  static async requestAccess(req, res, next) {
    try {
      const { email } = req.body;

      //Validate email
      if (!(await ValidationHelper.validateEmail(email)))
        return res.status(400).send("Your email is invalid!");

      if (!(await RequestAccessUtil.saveAccessRequest(email)))
        return res.status(400).send("Sorry, something is wrong");

      res.send("ok");
    } catch (err) {
      console.error("Error in registering user");
      next(err);
    }
  }
};
