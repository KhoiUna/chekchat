require("dotenv").config();
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");

//Start express app
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { origin } = require("./config/config");
const io = require("socket.io")(server, {
  cors: {
    origin: [origin, "https://www.chekchat.xyz"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

//.env variables
const {
  PORT = 5000,
  NODE_ENV = "development",
  SESS_LIFETIME = 1000 * 3600 * 2,
  SESS_NAME = "sid",
  SESS_SECRET,
} = process.env;
const IN_PROD = NODE_ENV === "production";

//Define session store
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const store = new MongoDBStore(
  {
    uri: process.env.DB_URI,
    databaseName: "chekchat",
    collection: "sessions",
    expires: 1000 * 60 * 60 * 24 * 30, // 30 days in milliseconds
    connectionOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    },
  },
  (err) => {
    if (err) console.error(err);
  }
);
store.on("error", (err) => {
  console.error(err);
});

//Middlewares
app.get(compression());
app.use(helmet());
app.set("trust proxy", 1);
app.use(
  cors({
    origin: [origin, "https://www.chekchat.xyz"],
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: ["Content-Type", "Cookie"],
  })
);
app.use(
  session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
      maxAge: SESS_LIFETIME,
      sameSite: true,
      secure: IN_PROD,
    },
    store,
  })
);
app.use(express.json());

//Routes
const loginRouter = require("./routes/loginRouter");
app.use("/api/login", loginRouter);

const registerRouter = require("./routes/registerRouter");
app.use("/api/register", registerRouter);

const userRouter = require("./routes/userRouter");
app.use("/api/user", userRouter);

const friendRouter = require("./routes/friendRouter");
app.use("/api/friends", friendRouter);

const missionRouter = require("./routes/missionRouter");
app.use("/api/missions", missionRouter);

const todoRouter = require("./routes/todoRouter");
app.use("/api/todo", todoRouter);

const notificationRouter = require("./routes/notificationRouter");
app.use("/api/notifications", notificationRouter);

const logoutRouter = require("./routes/logoutRouter");
app.use("/api/logout", logoutRouter);

//Socket
const MissionsUtil = require("./utils/MissionsUtil");
const FriendRequestUtil = require("./utils/FriendRequestUtil");
const UsersUtil = require("./utils/UsersUtil");
const NotificationsUtil = require("./utils/NotificationsUtil");
const SocketHelper = require("./helpers/SocketHelper");

io.on("connection", (socket) => {
  console.log("------User connected------");

  //Subscribe users for events from server
  socket.on("subscribe", (userEmail) => {
    const user = SocketHelper.subscribeUsers(socket.id, userEmail);
    socket.join(user.userEmail);
  });

  socket.on("check missions", ({ missionId, completed }) => {
    //Update mission check/completed
    MissionsUtil.updateMissionComplete(missionId, completed);
  });

  socket.on("star missions", ({ missionId, starred }) => {
    //Update mission check/completed
    MissionsUtil.updateMissionStarred(missionId, starred);
  });

  socket.on("click notification", (notificationId) => {
    //Update notification clicked
    NotificationsUtil.updateClickedNotification(notificationId);
  });

  socket.on("friend requests", async ({ requestId, action }) => {
    //Update friend request and return friendEmail & userEmail
    const { userEmail, friendEmail } = await FriendRequestUtil.updateRequest(
      requestId,
      action
    );
    if (action === "accept") {
      UsersUtil.addFriend(userEmail, friendEmail);
      FriendRequestUtil.removeRequest(userEmail, friendEmail);
    }

    //Create notification
    NotificationsUtil.saveNotification(
      userEmail,
      friendEmail,
      "friend",
      action
    );

    //Increment notification count for user
    UsersUtil.updateNotificationCount(friendEmail, "increment");

    const actionData = { type: "notification count" };
    io.to(friendEmail).emit("update", actionData);
  });

  socket.on("mission requests", async ({ requestId, action }) => {
    //Update mission request
    const { senderEmail, receiverEmail } = await MissionsUtil.updateRequest(
      requestId,
      action
    );

    //Create notification
    NotificationsUtil.saveNotification(
      receiverEmail,
      senderEmail,
      "task",
      action
    );

    //Increment notification count for user
    UsersUtil.updateNotificationCount(senderEmail, "increment");

    const actionData = { type: "notification count" };
    io.to(senderEmail).emit("update", actionData);
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
