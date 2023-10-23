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
    origin,
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
    origin,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: ["Content-Type", "Cookie"],
  })
);

const sessionMiddleware = session({
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
});
app.use(sessionMiddleware);
app.use(express.json());

//Initialize passport local
const passport = require("passport");
const localPassportSetup = require("./config/local-passport-setup");

app.use(passport.initialize());
app.use(passport.session());

// Configure Passport authenticated session persistence
passport.serializeUser((user, done) => {
  const { id, username, email, avatarURL } = user;
  done(null, { id, username, email, avatarURL });
});
passport.deserializeUser((userObj, done) => {
  return done(null, userObj);
});

//Routes
//userRouter for main app
const userRouter = require("./routes/userRouter");
app.use("/api/user", userRouter);

//Socket
const { ObjectID } = require("mongodb");
const MissionsUtil = require("./utils/MissionsUtil");
const FriendRequestUtil = require("./utils/FriendRequestUtil");
const UsersUtil = require("./utils/UsersUtil");
const NotificationsUtil = require("./utils/NotificationsUtil");
const SocketHelper = require("./helpers/SocketHelper");
const ChatUtil = require("./utils/ChatUtil");

io.use((socket, next) => {
  sessionMiddleware(socket.request, socket.request.res || {}, next);
});

io.on("connection", (socket) => {
  console.log("------User connected------");
  const userSession = socket.request.session.passport?.user;

  if (userSession) {
    //Subscribe users for events from server
    socket.on("subscribe", () => {
      const user = SocketHelper.subscribeUsers(
        socket.id,
        userSession.id.toString()
      );
      socket.join(user.userId);
    });

    //Subscribe users for chat rooms
    socket.on("chat subscribe", ({ roomId }) => {
      const room = SocketHelper.subscribeUsersForChat(socket.id, roomId);
      socket.join(room.roomId);
    });

    socket.on("chat unsubscribe", () => {
      const currentRoom = SocketHelper.unsubscribeUsersForChat(socket.id);
      socket.leave(currentRoom.roomId);
    });

    socket.on("chat message", ({ sent_datetime, message }) => {
      const currentRoom = SocketHelper.getCurrentChatRoom(socket.id);

      // Save message to db
      const messageForSaving = {
        from_user: userSession.id,
        roomId: ObjectID(currentRoom.roomId),
        sent_datetime: new Date(sent_datetime),
        message,
      };
      ChatUtil.saveMessage(messageForSaving);
      ChatUtil.updateChatRoom({
        roomId: ObjectID(currentRoom.roomId),
        lastMessage: messageForSaving.message,
        notified: true,
        last_updated: messageForSaving.sent_datetime,
      });

      const actionData = {
        type: "chat message",
        payload: {
          from_user: [
            {
              username: userSession.username,
              avatarURL: userSession.avatarURL,
            },
          ],
          message,
          sent_datetime,
        },
      };
      io.in(currentRoom.roomId).emit("update", actionData);
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

    socket.on("friend requests", async ({ action, requestId }) => {
      //Update friend request and return friendEmail & userEmail
      const { userId, friendId } = await FriendRequestUtil.updateRequest(
        requestId,
        action
      );
      if (action === "accept") {
        UsersUtil.addFriend({ userId, friendId });
        FriendRequestUtil.removeRequest({ userId, friendId });
      }

      //Create notification
      NotificationsUtil.saveNotification(userId, friendId, "friend", action);

      //Increment notification count for user
      UsersUtil.updateNotificationCount(friendId, "increment");

      const actionData = { type: "notification count" };
      socket.to(friendId.toString()).emit("update", actionData);
    });

    socket.on("mission requests", async ({ requestId, action }) => {
      //Update mission request
      const { senderId, receiverId } = await MissionsUtil.updateRequest(
        requestId,
        action
      );

      //Create notification
      NotificationsUtil.saveNotification(receiverId, senderId, "task", action);

      if (action === "accept") {
        ChatUtil.createChatRoom({ requestId, senderId, receiverId });
      }

      //Increment notification count for user
      UsersUtil.updateNotificationCount(senderId, "increment");

      const actionData = { type: "notification count" };
      socket.to(senderId.toString()).emit("update", actionData);
    });
  }

  //Listen when users disconnect
  socket.on("disconnect", () => {
    console.log("------User disconnected------");
    SocketHelper.removeUser(socket.id);
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
