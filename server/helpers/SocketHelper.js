let users = [];
let rooms = [];

module.exports = {
  subscribeUsers(socketId, userId) {
    const user = { socketId, userId };
    users.push(user);

    return user;
  },
  subscribeUsersForChat(socketId, userId, roomId) {
    const room = { socketId, userId, roomId };
    rooms.push(room);
    return room;
  },
  getCurrentChatRoom(socketId) {
    return rooms.find((room) => room.socketId === socketId);
  },
};
