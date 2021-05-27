let users = [];

module.exports = {
  subscribeUsers(socketId, userEmail) {
    const user = { socketId, userEmail };
    users.push(user);

    return user;
  },
  getCurrentUser(socketId) {
    return users.find((user) => user.socketId === socketId);
  },
};
