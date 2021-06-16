export default function removeItemFromList(list, requestId) {
  return list.filter((i) => i._id !== requestId);
}
