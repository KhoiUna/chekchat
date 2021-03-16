const client = require("../db/client");
const PasswordHelper = require("../helpers/PasswordHelper");

module.exports = {
  async saveUser(username, email, password) {
    try {
      const collection = client.db("chekchat").collection("users");

      const response = await collection.insertOne({
        username,
        email,
        password: await PasswordHelper.hashPassword(password),
      });
      return response;
    } catch (err) {
      console.error("Error saving user");
      return null;
    }
  },
  async checkUser(email) {
    try {
      const collection = client.db("chekchat").collection("users");

      const user = await collection.findOne({ email });
      if (user) return false;

      return true;
    } catch (err) {
      console.error("Error checking user");
      return null;
    }
  },
  async loginUser(email, password) {
    try {
      const collection = client.db("chekchat").collection("users");

      const user = await collection.findOne({ email });

      if (!(await PasswordHelper.comparePassword(password, user.password)))
        return false;

      return true;
    } catch (err) {
      console.error("Error logging in user");
    }
  },
};
