const connectDb = require("./connectDb");
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.DB_URI, {
  poolSize: 50,
  ssl: true,
  useUnifiedTopology: true,
});
connectDb(client).catch(console);

module.exports = client;
