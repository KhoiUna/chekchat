const Joi = require("joi");
const passwordValidator = require("password-validator");

module.exports = class ValidationHelper {
  static validatePassword(password) {
    //Password schema
    const passwordSchema = new passwordValidator();
    passwordSchema
      .is()
      .min(10)
      .is()
      .max(30)
      .has()
      .uppercase()
      .has()
      .lowercase()
      .has()
      .digits(3)
      .has()
      .not()
      .spaces();

    const error = passwordSchema.validate(password, { list: true });
    return error;
  }

  static async validateEmail(email) {
    const schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
        })
        .required(),
    });
    const { error } = schema.validate({
      email,
    });
    if (error) return false;

    return true;
  }

  static async forRegistration(username, email, password, confirmPassword) {
    //username & email schema
    const schema = Joi.object({
      username: Joi.string().alphanum().min(3).max(30).required(),
    });

    const { error } = schema.validate({
      username,
    });
    if (error) return error.details[0].message;

    if (!(await this.validateEmail(email, true))) return "Email is invalid";

    const validation = this.validatePassword(password);
    if (validation.length !== 0) {
      let validationString = "";
      validation.map((i) => {
        switch (i) {
          case "min":
            validationString = "Password should have at least 10 characters";
            break;
          case "uppercase":
            validationString =
              "Password should have at least 1 uppercase letter";
            break;
          case "lowercase":
            validationString =
              "Password should have at least 1 lowercase letter";
            break;
          case "digits":
            validationString = "Password should have at least 3 digits";
            break;
          case "spaces":
            validationString = "Password should not contain whitespaces";
            break;
        }
      });
      return validationString;
    }

    if (password !== confirmPassword) {
      return "Confirm password does not match";
    }

    return true;
  }

  static async validateMission(
    userEmail,
    subject,
    selectedDate,
    receiverEmail,
    description
  ) {
    return (
      (await this.validateEmail(userEmail)) &&
      (await this.validateEmail(receiverEmail)) &&
      subject &&
      new Date(new Date(selectedDate).toLocaleDateString()) >=
        new Date(new Date().toLocaleDateString()) &&
      description
    );
  }
};
