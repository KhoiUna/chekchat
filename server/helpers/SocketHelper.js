let users = [];

module.exports = {
  subscribeUsers(socketId, userId) {
    const user = { socketId, id: userId };
    users.push(user);

    return user;
  },
  getCurrentUser(socketId) {
    return users.find((user) => user.socketId === socketId);
  },
};
