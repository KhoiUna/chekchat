module.exports = async (client) => {
  try {
    await client.connect();
  } catch (err) {
    console.error("Error connecting to db");
  }
};
