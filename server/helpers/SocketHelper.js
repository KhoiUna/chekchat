let users = [];

module.exports = {
  subscribeUsers(socketId, userEmail) {
    const user = { socketId, userEmail };

    if (users.length === 0) {
      users.push(user);
    }

    if (users.some((i) => i?.userEmail === userEmail)) {
      users = [...users].map((i) => {
        if (i.userEmail === userEmail) i.socketId = socketId;
        return i;
      });
    } else {
      users.push(user);
    }

    return user;
  },
  getCurrentUser(socketId) {
    return users.find((user) => user.socketId === socketId);
  },
};
