const compression = require("compression");
const { RSA_NO_PADDING } = require("constants");
const cors = require("cors");
const express = require("express");
const app = express();
const helmet = require("helmet");
const { origin } = require("./config/config");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: origin,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

//env variables
const { PORT = 5000 } = process.env;

//Middlewares
app.get(compression());
app.use(helmet());
app.set("trust proxy", 1);
app.use(
  cors({
    origin: origin,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: ["Content-Type", "Cookie"],
  })
);
app.use(express.json());

//Routes
const loginRouter = require("./routes/loginRouter");
app.use("/api/login", loginRouter);

const registerRouter = require("./routes/registerRouter");
app.use("/api/register", registerRouter);

//Error handling
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send(err.message);
});

//Listen
app.listen(PORT, () => {
  console.log(`On http://localhost:${PORT}`);
});
