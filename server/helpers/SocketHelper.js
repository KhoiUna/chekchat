let users = [];

module.exports = {
  subscribeUsers(socketId, userId, roomId = "") {
    const existingUser = users.find((user) => user.userId === userId);
    if (existingUser) return existingUser;

    const user = { socketId, userId, roomId };
    users.push(user);
    return user;
  },
  removeUser(socketId) {
    const index = users.findIndex((user) => user.socketId === socketId);

    if (index !== -1) return users.splice(index, 1)[0];
  },
  subscribeUsersForChat(socketId, roomId) {
    const index = users.findIndex((user) => user.socketId === socketId);

    users[index].roomId = roomId.toString();
    return users[index];
  },
  unsubscribeUsersForChat(socketId) {
    const index = users.findIndex((user) => user.socketId === socketId);
    const roomId = users[index].roomId;

    users[index].roomId = "";

    return { roomId };
  },
  getCurrentChatRoom(socketId) {
    return users.find((user) => user.socketId === socketId);
  },
};
