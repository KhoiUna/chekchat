const axios = require("axios");

module.exports = async (email) => {
  try {
    const res = await axios.post(process.env.DISCORD_WEBHOOK_URL, {
      content: `@everyone **${email}** signed up on *${new Date().toLocaleString()}*`,
    });
    return true;
  } catch (err) {
    console.error("Error creating discord alert");
    return;
  }
};
