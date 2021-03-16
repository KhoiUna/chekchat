const bcrypt = require("bcrypt");

module.exports = {
  async hashPassword(password, saltRounds = 10) {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      console.error("Error hashing password");
      return null;
    }
  },
  async comparePassword(password, hash) {
    try {
      return await bcrypt.compare(password, hash);
    } catch (err) {
      console.error("Error comparing password");
      return null;
    }
  },
};
