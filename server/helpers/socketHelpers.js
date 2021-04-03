const users = [];

const joinUsers = (id, userId, room) => {
  const user = { id, userId, room };
  users.push(user);
  return user;
};

const getCurrentUser = (id) => {
  return users.find((user) => user.id === id);
};

module.exports = { joinUsers, getCurrentUser };
