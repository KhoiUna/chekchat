const Joi = require("joi");
const passwordValidator = require("password-validator");

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

//username & email schema
const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
});

module.exports = {
  validatePassword(password) {
    const error = passwordSchema.validate(password, { list: true });
    return error;
  },
  forRegistration(username, email, password, confirmPassword) {
    const { error } = schema.validate({
      username,
      email,
    });
    if (error) return error.details[0].message;

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
  },
};
