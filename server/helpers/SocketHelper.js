const users = [];

module.exports = {
  subscribeUsers(socketId, userEmail) {
    const user = { socketId, userEmail };
    users.push(user);
    return user;
  },
  getCurrentUser(id) {
    return users.find((user) => user.id === id);
  },
};
