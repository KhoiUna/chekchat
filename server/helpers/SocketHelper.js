let users = [];

module.exports = {
  subscribeUsers(socketId, userId) {
    const user = { socketId, userId };
    users.push(user);

    return user;
  },
  getCurrentUser(socketId) {
    return users.find((user) => user.socketId === socketId);
  },
};
