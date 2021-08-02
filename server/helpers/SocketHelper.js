let users = [];
let rooms = [];

module.exports = {
  subscribeUsers(socketId, userId) {
    const user = { socketId, id: userId };
    users.push(user);

    return user;
  },
  subscribeUsersForChat(socketId, userId, roomId) {
    const room = { socketId, id: userId, roomId };
    rooms.push(room);
    return room;
  },
  getCurrentChatRoom(socketId) {
    return rooms.find((room) => room.socketId === socketId);
  },
};
