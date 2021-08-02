let users = [];
let rooms = [];

module.exports = {
  subscribeUsers(socketId, userId) {
    const user = { socketId, userId };
    users.push(user);

    return user;
  },
  subscribeUsersForChat(socketId, roomId) {
    const room = { socketId, roomId };
    rooms.push(room);
    return room;
  },
  getCurrentChatRoom(socketId) {
    return rooms.find((room) => room.socketId === socketId);
  },
};
