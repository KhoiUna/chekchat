module.exports = (friendRequestList, requestId) => {
  const index = friendRequestList.findIndex((item) => item._id === requestId);
  if (index > -1) {
    friendRequestList.splice(index, 1);
  }
  return friendRequestList;
};
