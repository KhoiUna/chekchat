export default function (list, requestId) {
  return list.filter((i) => i._id !== requestId);
}
