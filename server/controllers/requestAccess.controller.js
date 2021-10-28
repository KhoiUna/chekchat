const createDiscordAlert = require("../helpers/createDiscordAlert");
const sendSurvey = require("../helpers/sendSurvey");
const ValidationHelper = require("../helpers/ValidationHelper");
const RequestAccessUtil = require("../utils/RequestAccessUtil");

module.exports = class RequestAccessController {
  static async requestAccess(req, res, next) {
    try {
      const { email } = req.body;

      //Check if user already submitted request
      if (await RequestAccessUtil.checkAccessRequest(email))
        return res
          .status(400)
          .send("You have already submitted an early access request!");

      //Validate email
      if (!(await ValidationHelper.validateEmail(email, true)))
        return res.status(400).send("Your email is invalid!");

      const insertedId = await RequestAccessUtil.saveAccessRequest(email);
      if (!insertedId) return res.status(400).send("Sorry, something is wrong");

      //Send survey mail
      if (!(await sendSurvey({ id: insertedId, email })))
        return res.status(400).send("Sorry, something is wrong");

      //Create Discord alert
      if (!(await createDiscordAlert(email)))
        return res.status(400).send("Sorry, something is wrong");

      res.send("ok");
    } catch (err) {
      console.error("Error in registering user");
      next(err);
    }
  }

  static async updateAccess(req, res, next) {
    try {
      if (!(await RequestAccessUtil.updateAccessRequest(req.query.id)))
        return res.status(400).send("Invalid ID");

      res.send("ok");
    } catch (err) {
      console.error("Error updating early access");
      next(err);
    }
  }
};
