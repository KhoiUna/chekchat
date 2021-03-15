const { MongoClient } = require("mongodb");

async function connectDb(client) {
  try {
    await client.connect();
  } catch (err) {
    console.error("Error connecting to db");
  }
}

const client = new MongoClient(process.env.DB_URI, {
  poolSize: 50,
  ssl: true,
  w: "majority",
  wtimeout: 5000,
  useUnifiedTopology: true,
});
connectDb(client).catch(console.dir);

module.exports = client;
