module.exports = (list, requestId) => {
  const index = list.findIndex((item) => item._id === requestId);
  if (index > -1) {
    list.splice(index, 1);
  }
  return list;
};
