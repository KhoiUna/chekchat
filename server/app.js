require("dotenv").config();
const compression = require("compression");
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

const friendRouter = require("./routes/friendRouter");
app.use("/api/friends", friendRouter);

const missionRouter = require("./routes/missionRouter");
app.use("/api/missions", missionRouter);

const todoRouter = require("./routes/todoRouter");
app.use("/api/todo", todoRouter);

const notificationRouter = require("./routes/notificationRouter");
app.use("/api/notifications", notificationRouter);

//Socket
const Missions = require("./utils/Missions");
const FriendRequest = require("./utils/FriendRequest");
const Users = require("./utils/Users");

io.on("connection", (socket) => {
  console.log("------User connected------");

  socket.on("check missions", ({ missionId, completed }) => {
    //Update mission check/completed
    Missions.updateMissionComplete(missionId, completed);
  });

  socket.on("friend requests", async ({ requestId, action }) => {
    //Update friend request and return friendEmail & userEmail
    const { userEmail, friendEmail } = await FriendRequest.updateRequest(
      requestId,
      action
    );
    if (action === "accept") Users.addFriend(userEmail, friendEmail);
  });

  socket.on("mission requests", ({ requestId, action }) => {
    //Update mission request
    Missions.updateRequest(requestId, action);
  });

  //Listen when users disconnect
  socket.on("disconnect", () => {
    console.log("------User disconnected------");
  });
});

//Error handling
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send(err.message);
});

//Listen
server.listen(PORT, () => {
  console.log(`On http://localhost:${PORT}`);
});
